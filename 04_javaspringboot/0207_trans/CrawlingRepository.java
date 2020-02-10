package com.wgn.server.model.repository;

import java.util.List;

import com.wgn.server.model.dto.Crawling;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrawlingRepository extends CrudRepository<Crawling, Integer>{
    
}