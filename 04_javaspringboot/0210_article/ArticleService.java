package com.wgn.server.model.service;

import java.util.List;
import java.util.Optional;

import com.wgn.server.model.dto.Article;

public interface ArticleService {

    public void insert(Article article);
    public void delete(String id);
    public Optional<Article> search(String id);
    public List<Article> searchAll();

    // 신뢰도 있는 기사들 반환
    // 나중에 스크롤 처리 해야됨
    public List<Article> searchTrustAll();

    //category 별 기사들 반환
    public List<Article> searchAllByCategory(String category);
    
    //VS 기사 반환

}