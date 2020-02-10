package com.wgn.server;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.wgn.server.model.dto.Article;
import com.wgn.server.model.service.ArticleService;
import com.wgn.server.model.service.CrawlingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import io.swagger.annotations.*;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class NewsRestController {

    @Autowired
    ArticleService articleService;

    @Autowired
    CrawlingService crawlingService;

    @ApiOperation("전체 뉴스 조회하는 기능")
    @GetMapping("/news")
    public String getAllNews() {
        return "news data";
    }

    @ApiOperation("뉴스 크롤링")
    @GetMapping("/crawling")
    public List<Article> updateCrawlingData() {
        List<Article> list = crawlingService.getArticlesFromUrls();
        for (Article article : list) {
            articleService.insert(article);
        }
        return list;
    }

    @ApiOperation("뉴스 넣기")
    @PostMapping("/crawling")
    public Article postCrawling(String url) {
        Article article = crawlingService.getInfoFromUrl(url);
        System.out.println(article);
        articleService.insert(article);

        return article;
    }
}