package com.wgn.server.model.service;

import java.util.List;
import java.util.Optional;

import com.wgn.server.model.dto.Article;
import com.wgn.server.model.dto.ArticleException;
import com.wgn.server.model.repository.ArticleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    ArticleRepository articleRepo;

    @Override
    public void insert(Article article) {
        try {
            articleRepo.save(article);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("저장 중 오류가 발생했습니다.");
        }
    }

    @Override
    public void delete(String id) {
        try {
            articleRepo.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("삭제 중 오류가 발생했습니다.");
        }
    }

    @Override
    public Optional<Article> search(String id) {
        try {
            return articleRepo.findById(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("검색 중 오류가 발생했습니다.");
        }
    }

    @Override
    public List<Article> searchAll() {
        try {
            return (List<Article>) articleRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("전체 검색 중 오류가 발생했습니다.");
        }
    }

    @Override
    public List<Article> searchTrustAll() {
        
        return null;
    }

    @Override
    public List<Article> searchAllByCategory(String category) {
        
        return null;
    }

    
}