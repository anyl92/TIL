package com.wgn.server.model.service;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.wgn.server.model.dto.ArticleException;
import com.wgn.server.model.dto.CrawlingRaw;
import com.wgn.server.model.repository.CrawlingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CrawlingServiceImpl implements CrawlingService{
    @Autowired
    CrawlingRepository crawlingRepo;

    @Override
    public List<CrawlingRaw> LinkUpdate() {
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
    public List<CrawlingRaw> OgDataCreate() {
        try {
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("OgDataCreate 오류 발생");
        }
    }

}