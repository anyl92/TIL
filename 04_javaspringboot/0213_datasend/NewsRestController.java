package com.wgn.server;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.wgn.server.model.dto.Article;
import com.wgn.server.model.dto.CrawlingRaw;
import com.wgn.server.model.service.ArticleService;
import com.wgn.server.model.service.CrawlingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import io.swagger.annotations.*;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class NewsRestController {

    @Autowired
    ArticleService articleService;

    @Autowired
    CrawlingService crawlingService;


    @GetMapping("/search/url")
    public Optional<Article> searchArticleFromUrl(@RequestParam String id){
        
        return articleService.search(id);
    }
    @GetMapping("/search")
    public Optional<Article> searchArticle(String a_id){
        
        return articleService.search(a_id);
    }
    @ApiOperation("전체 뉴스 조회하는 기능")
    @GetMapping("/news")
    public List<Article> getAllNews() {
        
        return articleService.searchAll();
    }

    @ApiOperation("뉴스 크롤링")
    @GetMapping("/crawling")
    public List<Article> updateCrawlingData() {
        List<Article> list = crawlingService.getArticlesFromUrls();

        for(Article article : list){
            articleService.insert(article);
        }
        
        return list;
    }

    @ApiOperation("뉴스 넣기")
    @PostMapping("/crawling")
    public Article postCrawling(@RequestBody String url){
        JsonParser parser = new JsonParser();
        JsonObject obj = (JsonObject) parser.parse(url);

        Article article = crawlingService.getInfoFromUrl(obj.get("url").getAsString(), "");
        System.out.println(article);
        articleService.insert(article);

        return article;
    }
}