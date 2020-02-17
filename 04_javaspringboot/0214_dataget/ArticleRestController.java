package com.wgn.server.model.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.wgn.server.model.dto.Article;
import com.wgn.server.model.dto.Member;
import com.wgn.server.model.dto.Opinion;
import com.wgn.server.model.dto.OpinionCnt;
import com.wgn.server.model.service.ArticleServiceImpl;
import com.wgn.server.model.service.MemberServiceImpl;
import com.wgn.server.model.service.OpinionServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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

    @Autowired
    OpinionServiceImpl opinionService;

    @Autowired
    MemberServiceImpl memberService;

    @ApiOperation("카테고리별 기사를 조회하는 기능")
    @GetMapping("/ArticleByCategory")
    public List<Article> findByCategory(String category) {
        List<Article> articles = articleService.searchAllByCategory(category);
        return articles;
    }

    @ApiOperation("Opinion DB에 회원의 의견이 있는지 조회하는 기능")
    @GetMapping("/findOpinionById")
    public String findOpinionById(String articleId) {
        System.out.println("findOpinion");

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }
        System.out.println("prinipal " + principal);
        System.out.println("authe " + email);
        Member member = memberService.findByEmail(email);
        System.out.println("member"+ member);
        System.out.println("articleId "+ articleId);
        Optional<Article> article = articleService.searchById(articleId);
        // System.out.println("article "+ article);
        String result = opinionService.findOpinionByMember(member, article);
        System.out.println(result);
        return result;
    }
    

    @ApiOperation("기사의 Opinion을 DB에 삽입하는 기능")
    @PostMapping("/InsertOpinionDB")
    public boolean insertOpinion(@RequestBody Opinion opinion) {
        System.out.println("InsertOpinion");
        System.out.println("opinion "+opinion);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails)principal).getUsername();
        } else {
            email = principal.toString();
        }
        System.out.println("prinipal " + principal);
        System.out.println("authe " + email);
        Member member = memberService.findByEmail(email);
        opinion.setMember(member);
        boolean result = opinionService.insertOpinion(opinion);
        return result;
    }

    @ApiOperation("기사의 Opinionnt을 DB에 갱신하는 기능")
    @PutMapping("/UpdateOpinionCntDB")
    public boolean updateOpinion(@RequestBody OpinionCnt opinionCnt) {
       
        System.out.println(opinionCnt);

        boolean result = opinionService.updateOpinionCnt(opinionCnt);

        return result;
    }

    @ApiOperation("Opinion DB에 회원의 의견을 삭제하는 기능")
    @DeleteMapping("/DeleteOpinion")
    public void deleteOpinion(String articleId) {
        System.out.println("DeleteOpinion");

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }
        System.out.println("prinipal " + principal);
        System.out.println("authe " + email);
        Member member = memberService.findByEmail(email);

        System.out.println("member"+ member);
        System.out.println("articleId "+ articleId);
        Optional<Article> article = articleService.searchById(articleId);
        // System.out.println("article "+ article);
        Opinion opinion = opinionService.findByMemberAndArticle(member, article);
        System.out.println("삭제할 의견 "+ opinion);
        opinionService.delete(opinion);
        // System.out.println(result);
        // return result;
    }

    @ApiOperation("신뢰도 비교")
    @GetMapping("/CompTrust")
    public List<Article> findByCompTrust(String id1, String id2) {
        List<Article> articles = new ArrayList<Article>();
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

}