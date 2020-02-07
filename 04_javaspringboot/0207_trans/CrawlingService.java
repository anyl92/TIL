package com.wgn.server.model.service;

import java.util.List;

import com.wgn.server.model.dto.CrawlingRaw;

import org.springframework.stereotype.Service;

@Service
public interface CrawlingService {
    public List<CrawlingRaw> LinkUpdate();
    public List<CrawlingRaw> OgDataCreate();
}