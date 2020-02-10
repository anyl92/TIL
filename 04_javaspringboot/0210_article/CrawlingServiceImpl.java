package com.wgn.server.model.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.wgn.server.model.dto.Article;
import com.wgn.server.model.dto.ArticleException;
import com.wgn.server.model.dto.CrawlingRaw;
import com.wgn.server.model.repository.CrawlingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

@Service
public class CrawlingServiceImpl implements CrawlingService{
    
    @Autowired
    ArticleService articleService;

    @Autowired
    CrawlingRepository crawlingRepo;

    @Override
    public List<CrawlingRaw> getUrlData() {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // 서버로 요청할 Header 설정
            // HttpHeaders headers = new HttpN Headers();
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
    public Article getInfoFromUrl(String url) {
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

                if (target.equals("og:title")) {
                    article.setTitle(e.attr("content"));  // a_title
                } else if (target.equals("og:image")) {
                    article.setImg(e.attr("content"));  // a_img
                } else if (target.equals("og:description")) {
                    article.setSummary(e.attr("content"));  // a_summary
                }
			} 

			Elements list = doc.select("#main_content > div.article_header > div.article_info > div > a");
            article.setLink(list.attr("href"));  // a_link

            Elements content = doc.select("#articleBodyContents");
            article.setContent(Jsoup.parse(content.html()).body().text());  // a_content

            Elements date = doc.select("#main_content > div.article_header > div.article_info > div > span:nth-child(1)");
            String beforeDate = Jsoup.parse(date.html()).body().text();
            SimpleDateFormat simple = new SimpleDateFormat("yyyy-MM-dd");
            article.setDate(simple.parse(beforeDate.substring(0, 4) + "-" + beforeDate.substring(5, 7) + "-" + beforeDate.substring(8, 10)));  // a_date
            
            // #main_content > div.article_header > div.article_info > div > span:nth-child(2)
            
            Elements mdate = doc.select("#main_content > div.article_header > div.article_info > div > span:nth-child(2)");
            if (!mdate.isEmpty()) {
                String afterDate = Jsoup.parse(mdate.html()).body().text();
                article.setMdate(simple.parse(afterDate.substring(0, 4) + "-" + afterDate.substring(5, 7) + "-" + afterDate.substring(8, 10)));  // a_mdate
            }

            String[] urllist = url.split("&");
            ArrayList<String> pattern = new ArrayList<String>();
            
            pattern.add("sid");
            pattern.add("oid");
            pattern.add("aid");
            
            String sid = "";
            String oid = "";
            String aid = "";
            for(String temp : urllist){
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

            article.setSid(sid);
            article.setOid(oid);
            article.setAid(aid);
            
            article.setId(sid+oid+aid);
            // System.out.println(article.getLink());
            return article;

		} catch (Exception e){
            e.printStackTrace();
            throw new ArticleException("article 만들다가 오류났어요!");
		}
    }

    @Override
    public List<Article> getArticlesFromUrls() {
        try {
            List<Article> articles = new ArrayList<Article>();  // 리턴해야 하는 기사 리스트

            List<CrawlingRaw> urlList = getUrlData();  // AWS lambda에서 크롤링 데이터를 가져오는 코드
            for (CrawlingRaw category: urlList) {
                for (String url: category.getUrl()) {
                    System.out.println(getInfoFromUrl(url));
                    Article article = getInfoFromUrl(url);
                    articles.add(article);
                }
            }
            return articles;

        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("getArticlesFromUrls 오류 발생");
        }
    }
}