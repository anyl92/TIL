package com.wgn.server;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.wgn.server.model.dto.CrawlingRaw;
import com.wgn.server.model.service.CrawlingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import io.swagger.annotations.*;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class NewsRestController {

    @Autowired
    CrawlingService crawlingService;

    @ApiOperation("전체 뉴스 조회하는 기능")
    @GetMapping("/news")
    public String getAllNews() {
        return "news data";
    }

    @ApiOperation("뉴스 크롤링")
    @GetMapping("/crawling")
    public List<CrawlingRaw> getCrawlingData() {
        return crawlingService.LinkUpdate();
    }
}