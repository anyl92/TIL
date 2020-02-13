package com.wgn.server.model.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "opinion")
public class Opinion implements Serializable{
    
	// private static final long serialVersionUID = -3009157732242241606L; 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="op_id")
    private Integer id;
    
    @ManyToOne
	@JoinColumn(name = "m_id")
	private Member member;

    @ManyToOne
    @JoinColumn(name = "a_id")
    private Article article;

    @Column(name = "op_type")
    private String type;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "op_date", updatable = false, insertable = false)
	private Date opdate;

    protected Opinion(){}

    public Opinion(Integer id, Member member, Article article, String type) {
        this.id = id;
        this.member = member;
        this.article = article;
        this.type = type;
    }
    public Opinion(Member member, Article article, String type) {
        this.id = id;
        this.member = member;
        this.article = article;
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public Date getOpdate() {
        return opdate;
    }

    public void setOpdate(Date opdate) {
        this.opdate = opdate;
    }
    
    @Override
    public String toString() {
        return "Opinion [article=" + article + ", id=" + id + ", member=" + member + ", type=" + type + "]";
    }

}