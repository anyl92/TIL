package com.wgn.server.model.dto;
import java.io.Serializable;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
@Entity
@Table(name = "article")
public class Article implements Serializable{
    
    // private static final long serialVersionUID = -3009157732242241606L; 
    @Id
    @Column(name="a_id")
	private String id;

	@ManyToOne
	@JoinColumn(name = "j_id")
	private Journalist journalist;
	
    @Column(name = "a_title")
    private String title;
    
    @Column(name = "a_summary")
    private String summary;
    
    @Column(name = "a_img")
    private String img;
    
    @Column(name = "a_hit")
    private int hit;
    
    @Column(name = "a_link")
    private String link;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "a_date")
    private Date date;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "a_mdate")
	private Date mdate;
	
	@Column(name = "a_content")
	private String content;

	// @ManyToOne
	// @JoinColumn(name = "c_id")
	@Column(name = "c_id")
	private int crawling;

	@Column(name = "sid")
	private String sid;

	@Column(name = "oid")
	private String oid;

	@Column(name = "aid")
	private String aid;

	@OneToOne
	@JoinColumn(name = "oc_id")
	private OpinionCnt opinionCnt;

	public Article(){

	}

	public Article(String id, Journalist journalist, String title, String summary, String img, int hit,
			String link, Date date, Date mdate, String content, int crawling, String sid, String oid, String aid, OpinionCnt opinionCnt) {
		super();
		this.id = id;
		this.journalist = journalist;
		this.title = title;
		this.summary = summary;
		this.img = img;
		this.hit = hit;
		this.link = link;
		this.date = date;
		this.mdate = mdate;
		this.content = content;
		this.crawling = crawling;
		this.sid = sid;
		this.oid = oid;
		this.aid = aid;
		this.opinionCnt = opinionCnt;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public int getHit() {
		return hit;
	}

	public void setHit(int hit) {
		this.hit = hit;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getMdate() {
		return mdate;
	}

	public void setMdate(Date mdate) {
		this.mdate = mdate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content){
		this.content = content;
	}

	public int getCrawlig() {
		return crawling;
	}

	public void setCrawling(int crawling){
		this.crawling = crawling;
	}

	public Journalist getJournalist() {
		return journalist;
	}

	public void setJournalist(Journalist journalist) {
		this.journalist = journalist;
	}

	public int getCrawling() {
		return crawling;
	}

	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public String getOid() {
		return oid;
	}

	public void setOid(String oid) {
		this.oid = oid;
	}

	public String getAid() {
		return aid;
	}

	public void setAid(String aid) {
		this.aid = aid;
	}

	public OpinionCnt getOpinionCnt() {
		return opinionCnt;
	}

	public void setOpinionCnt(OpinionCnt opinionCnt) {
		this.opinionCnt = opinionCnt;
	}

	@Override
	public String toString() {
		return "Article [aid=" + aid + ", content=" + content + ", crawling=" + crawling + ", date=" + date + ", hit="
				+ hit + ", id=" + id + ", img=" + img + ", journalist=" + journalist + ", link=" + link + ", mdate="
				+ mdate + ", oid=" + oid + ", opinionCnt=" + opinionCnt + ", sid=" + sid + ", summary=" + summary
				+ ", title=" + title + "]";
	}

	
}
