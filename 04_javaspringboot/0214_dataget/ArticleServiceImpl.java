package com.wgn.server.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.wgn.server.model.dto.Article;
import com.wgn.server.model.dto.ArticleException;
import com.wgn.server.model.dto.Member;
import com.wgn.server.model.dto.Opinion;
import com.wgn.server.model.dto.OpinionCnt;
import com.wgn.server.model.repository.ArticleRepository;
import com.wgn.server.model.repository.OpinionCntRepository;
import com.wgn.server.model.repository.OpinionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    ArticleRepository articleRepo;

    @Autowired
    OpinionCntRepository opinionCntRepo;

    @Autowired
    OpinionRepository opinionRepo;

    @Override
    public void insert(Article article) {
        try {
            OpinionCnt opinionCnt = new OpinionCnt();
            opinionCnt.setOc_id(article.getId());
            opinionCntRepo.save(opinionCnt);
            article.setOpinionCnt(opinionCnt);
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
    public Article search(String id) {
        try {
            return articleRepo.findById(id).orElse(new Article());
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
        try {
            List<OpinionCnt> l = opinionCntRepo.findTop(PageRequest.of(0,12));
            List<Article> result = new ArrayList<>();

            for(int i=0, size=l.size(); i<size; i++){
                result.add(articleRepo.findByOpinionCnt(l.get(i)));
            }

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("전체 검색 중 오류가 발생했습니다.");
        }
    }

    @Override
    public List<Article> searchAllByCategory(String category) {
        try {
            return (List<Article>) articleRepo.findBySid(category);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("카테고리별 기사 검색 중 오류가 발생했습니다.");
        }
    }

    @Override
    public Optional<Article> searchById(String articleId) {
        try {
            return articleRepo.findById(articleId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ArticleException("카테고리별 기사 검색 중 오류가 발생했습니다.");
        }
    }

    
}