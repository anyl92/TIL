package com.wgn.server.model.dto;

import java.util.List;

public class CrawlingRaw {
    private String Id;
    private List<String> Url;

    public CrawlingRaw() {
    }

    public CrawlingRaw(String id, List<String> url) {
        Id = id;
        Url = url;
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public List<String> getUrl() {
        return Url;
    }

    public void setUrl(List<String> url) {
        Url = url;
    }

    @Override
    public String toString() {
        return "CrawlingRaw [Id=" + Id + ", Url=" + Url + "]";
    }
}

