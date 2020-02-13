package com.wgn.server.model.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.wgn.server.model.dto.Article;
import com.wgn.server.model.dto.Opinion;
import com.wgn.server.model.dto.OpinionCnt;
import com.wgn.server.model.service.ArticleServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
/**
 * ArticleRestControllerf
 */
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class ArticleRestController {

    @Autowired
    ArticleServiceImpl articleService;

    @ApiOperation("카테고리별 기사를 조회하는 기능")
    @GetMapping("/ArticleByCategory")
    public List<Article> findByCategory(String category) {
        List<Article> articles = articleService.searchAllByCategory(category);
        return articles;
    }

    @ApiOperation("신뢰도 비교")
    @GetMapping("/CompTrust")
    public List<Optional<Article>> findByCompTrust(String id1, String id2) {
        List<Optional<Article>> articles = new ArrayList<Optional<Article>>();
        articles.add(articleService.search(id1));
        articles.add(articleService.search(id2));
        return articles;
    }

    @ApiOperation("신뢰도 기사들 가져오기")
    @GetMapping("/TrustArticles")
    public List<Article> findByTrustArticles() {
        List<Article> articles = articleService.searchTrustAll();
        return articles;
    }

    @ApiOperation("기사의 Opinion을 DB에 삽입하는 기능")
    @PostMapping("/InsertOpinionDB")
    public boolean insertOpinion(Opinion opinion) {
        boolean result = articleService.insertOpinion(opinion);
        return result;
    }

    @ApiOperation("기사의 Opinionnt을 DB에 갱신하는 기능")
    @PutMapping("/UpdateOpinionCntDB")
    public boolean updateOpinion(OpinionCnt opinionCnt) {
        boolean result = articleService.updateOpinionCnt(opinionCnt);
        return result;
    }

    
}