package com.wgn.server.model.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.twitter.penguin.korean.TwitterKoreanProcessorJava;
import com.twitter.penguin.korean.tokenizer.KoreanTokenizer;
import com.wgn.server.model.dto.Article;
import com.wgn.server.model.dto.ArticleException;
import com.wgn.server.model.dto.CrawlingRaw;
import com.wgn.server.model.repository.CrawlingRepository;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import scala.collection.Seq;

@Service
public class CrawlingServiceImpl implements CrawlingService{
    @Autowired
    CrawlingRepository crawlingRepo;

    @Autowired
    ArticleService articleService;

    @Override
    public List<CrawlingRaw> getUrlData() {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // 서버로 요청할 Header 설정
            // HttpHeaders headers = new HttpHeaders();
            // headers.add()

            ResponseEntity<String> jsonresult = restTemplate.getForEntity("https://cb9xk9avl5.execute-api.ap-northeast-2.amazonaws.com/2020-01-28/news", String.class);
            
            Gson gson = new Gson();
            JsonParser parser = new JsonParser();
            JsonObject obj = (JsonObject) parser.parse(jsonresult.getBody());
            JsonArray arr = (JsonArray) obj.get("body");  // body 내용 가져오기

            List<CrawlingRaw> result = new ArrayList<CrawlingRaw>();

            for (int i=0; i<arr.size(); i++) {
                CrawlingRaw row = new CrawlingRaw();

                JsonObject bodyobj = (JsonObject) arr.get(i);
                String bodyid = bodyobj.get("Id").getAsString();
                row.setId(bodyid);

                JsonArray bodyurl = (JsonArray) bodyobj.get("Url");
                List<String> urlList = new ArrayList<String>();
                for (int j=0; j<bodyurl.size(); j++) {
                    String crawlUrl = bodyurl.get(j).getAsString();
                    urlList.add(crawlUrl);
                }
                row.setUrl(urlList);
                result.add(row);
            }
            return result;

        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("LinkUpdate 오류 발생");
        }
    }

    
    @Override
    public Article getInfoFromUrl(String url, String category){
        Document doc;
		Article article = new Article();
		
		try {
			doc = Jsoup
					.connect(url)
					.userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36")  
			        .referrer("http://www.google.com")  
					.get();
            Elements ogElements = doc.select("meta[property^=og], meta[name^=og]");
            
			for (Element e : ogElements) {
                String target = e.attr("property");

                if(target.equals("og:title")){
                    article.setTitle(e.attr("content")); // a_title
                }else if(target.equals("og:image")){
                    article.setImg(e.attr("content")); // a_img
                }else if(target.equals("og:description")){
                    article.setSummary(e.attr("content")); // a_summary
                }
            }
            
            Elements list = doc.select("#main_content > div.article_header > div.article_info > div > a");
            article.setLink(list.attr("href")); // a_link

            // 아티클 내용 가져오면서 저장도 하고 분석도 할꺼얌
            Elements content = doc.select("#articleBodyContents");
            String articleContent = Jsoup.parse(content.html()).body().text();
            article.setContent(articleContent); // a_content 
            
            // 형태소 분석
            CharSequence normalized = articleContent;
            normalized = TwitterKoreanProcessorJava.normalize(articleContent);
            Seq<KoreanTokenizer.KoreanToken> tokens = TwitterKoreanProcessorJava.tokenize(normalized);
            tokens = TwitterKoreanProcessorJava.stem(tokens);
            List<String> javaParsed = TwitterKoreanProcessorJava.tokensToJavaStringList(tokens);
            // System.out.println(javaParsed);

            // 워클 자료 만들기
            Set<String> wordSet = new HashSet<String>();
            Map<String, Integer> wordCnt = new HashMap<String, Integer>();
            for (String s:javaParsed){
                if (s.equals("으로") || s.equals("에서") || s.equals("이다") || s.equals("있다") || s.equals("되다") || s.equals("하다") || s.equals("기자")){
                    continue;
                }
                if (s.length()>1) {
                    if (wordSet.contains(s)) {
                        wordCnt.put(s, 1+wordCnt.get(s));
                    } else if (wordSet.isEmpty()) {
                        wordCnt.put(s, 1);
                    } else {
                        wordCnt.put(s, 1);
                    }
                    wordSet.add(s);
                }
            }
            System.out.println("=============wordSet");
            System.out.println(wordSet);
            
            List<Map<String, Object>> wordList = new ArrayList<Map<String, Object>>();
            for (String temp:wordSet) {
                if (wordCnt.get(temp)<3) continue;
                else {
                    Map<String, Object> map = new LinkedHashMap<String, Object>();
                    map.put("text", temp);
                    map.put("size", wordCnt.get(temp));
                    wordList.add(map);
                }
            }
            System.out.println("============wordList");
            System.out.println(wordList.toString());


            // ======================================= a_date 시작 ===========================================
            
            String query = "";
            if(category.equals("entertainments")){
                query = "#content > div.end_ct > div > div.article_info > span:nth-child(1) > em";
            }else if(category.equals("sports")){
                query = "#content > div > div.content > div > div.news_headline > div > span:nth-child(1)";
            }else{ // 나머지 카테고리
                query = "#main_content > div.article_header > div.article_info > div.sponsor > span.t11";
            }
            Elements date = doc.select(query);
            String beforeDate = Jsoup.parse(date.html()).body().text();
            SimpleDateFormat simple = new SimpleDateFormat("yyyy-MM-dd");
            article.setDate(simple.parse(beforeDate.substring(0, 4)+"-"+beforeDate.substring(5, 7)+"-"+beforeDate.substring(8, 10))); // a_date;
            // ======================================= a_date 끝 =============================================
            Elements mdate = doc.select("#main_content > div.article_header > div.article_info > div.sponsor > span.t11");
            if(!mdate.isEmpty()){
                // System.out.println("=======================================================");
                // System.out.println("=======================================================");
                // System.out.println("돌아감");
                String afterDate = Jsoup.parse(mdate.html()).body().text();
                article.setMdate(simple.parse(afterDate.substring(0, 4)+"-"+afterDate.substring(5, 7)+"-"+afterDate.substring(8, 10))); // a_mdate;
            }

            String[] urlList = url.substring(url.indexOf("?")+1).split("&");
            ArrayList<String> pattern = new ArrayList<String>();
            
            pattern.add("sid");
            pattern.add("oid");
            pattern.add("aid");
            
            String sid = "";
            String oid = "";
            String aid = "";
    
            for(String temp : urlList){
                switch(temp.substring(0, 3)){
                    case "sid":
                        sid = temp.substring(temp.indexOf("=", 0)+1);
                        break;
                    case "oid":
                        oid = temp.substring(temp.indexOf("=", 0)+1);
                        break;
                    case "aid":
                        aid = temp.substring(temp.indexOf("=", 0)+1);
                        break;
                }
            }

            if(category.equals("entertainments")){
                sid = "106";
            }else if(category.equals("sports")){
                article.setSid("107");
                sid = "107";
            }

            article.setSid(sid);
            article.setOid(oid);
            article.setAid(aid);
            article.setId(sid+oid+aid);

            return article;
            
		} catch (Exception e){
            e.printStackTrace();
            throw new ArticleException("article 만들다가 오류났어요!");
        }
    }
    
    @Override
    public List<Article> getArticlesFromUrls() {
        try {
            
            List<Article> articles = new ArrayList<Article>(); // 리턴해야 하는 기사 리스트.

            List<CrawlingRaw> urlList = getUrlData(); // AWS lambda에서 크롤링 데이터를 가져오는 코드.
            for(CrawlingRaw category : urlList){
                for(String url : category.getUrl()){ // 안에 들어있는 URL을 하나씩 꺼내오는 코드.
                    Article article = getInfoFromUrl(url, category.getId());
                    articles.add(article);
                }
            }

            return articles;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("getArticlesFromUrls에서 오류 발생");
        }
    }

}