package com.wgn.server.model.repository;

import com.wgn.server.model.dto.Article;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends CrudRepository<Article, String>{
    
}