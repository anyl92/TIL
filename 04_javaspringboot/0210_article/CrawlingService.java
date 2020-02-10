package com.wgn.server.model.service;

import java.util.List;

import com.wgn.server.model.dto.Article;
import com.wgn.server.model.dto.CrawlingRaw;

import org.springframework.stereotype.Service;

@Service
public interface CrawlingService {
    public List<CrawlingRaw> getUrlData();
    public Article getInfoFromUrl(String url);
    public List<Article> getArticlesFromUrls();
}