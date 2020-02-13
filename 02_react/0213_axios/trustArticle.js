import React, { Component } from "react";
import ArticleCard from './articleCard'
const axios = require("axios");

class TrustArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vsContents: [{}]
    }
  }

  componentDidMount(){
    //---------------------backend start
    var copyThis = this;
    axios
    .get("http://localhost:7888/TrustArticles")
    .then(function(response){
        copyThis.setState({
            vsContents : response.data,
        });
    })
    .catch(function(error){
        console.log("error", error);
    });
    //---------------------backend end
  }

  render() {
    console.log(this.state.vsContents, '나와나와나와랏');
    return (
      <section className="trustArticleSectionC">
        <ArticleCard
          title="[단독] 청와대 70명 총선 앞으로.. MD의 참모들은 왜 전멸했나"
          author="이데일리 | 네이버"
          bgimg="/img/article_bg_red.png"
          href="https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&oid=018&aid=0004554892&sid1=001"
          articleimg="https://imgnews.pstatic.net/image/018/2020/01/14/0004554892_001_20200114160201940.jpg"
          authorimg="https://image.edaily.co.kr/news/column/atoz.jpg"
          direction="right"
          detail="true"
        ></ArticleCard>
        <ArticleCard
          title="[단독] 청와대 70명 총선 앞으로.. MD의 참모들은 왜 전멸했나"
          author="이데일리 | 네이버"
          bgimg="/img/article_bg_red.png"
          href="https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&oid=018&aid=0004554892&sid1=001"
          articleimg="https://imgnews.pstatic.net/image/018/2020/01/14/0004554892_001_20200114160201940.jpg"
          authorimg="https://image.edaily.co.kr/news/column/atoz.jpg"
          direction="right"
          detail="true"
        ></ArticleCard>
        <ArticleCard
          title="[단독] 청와대 70명 총선 앞으로.. MD의 참모들은 왜 전멸했나"
          author="이데일리 | 네이버"
          bgimg="/img/article_bg_red.png"
          href="https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&oid=018&aid=0004554892&sid1=001"
          articleimg="https://imgnews.pstatic.net/image/018/2020/01/14/0004554892_001_20200114160201940.jpg"
          authorimg="https://image.edaily.co.kr/news/column/atoz.jpg"
          direction="right"
          detail="true"
        ></ArticleCard>
        <ArticleCard
          title="[단독] 청와대 70명 총선 앞으로.. MD의 참모들은 왜 전멸했나"
          author="이데일리 | 네이버"
          bgimg="/img/article_bg_red.png"
          href="https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&oid=018&aid=0004554892&sid1=001"
          articleimg="https://imgnews.pstatic.net/image/018/2020/01/14/0004554892_001_20200114160201940.jpg"
          authorimg="https://image.edaily.co.kr/news/column/atoz.jpg"
          direction="right"
          detail="true"
        ></ArticleCard>
        <ArticleCard
          title="[단독] 청와대 70명 총선 앞으로.. MD의 참모들은 왜 전멸했나"
          author="이데일리 | 네이버"
          bgimg="/img/article_bg_red.png"
          href="https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&oid=018&aid=0004554892&sid1=001"
          articleimg="https://imgnews.pstatic.net/image/018/2020/01/14/0004554892_001_20200114160201940.jpg"
          authorimg="https://image.edaily.co.kr/news/column/atoz.jpg"
          direction="right"
          detail="true"
        ></ArticleCard>
        <ArticleCard
          title="[단독] 청와대 70명 총선 앞으로.. MD의 참모들은 왜 전멸했나"
          author="이데일리 | 네이버"
          bgimg="/img/article_bg_red.png"
          href="https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&oid=018&aid=0004554892&sid1=001"
          articleimg="https://imgnews.pstatic.net/image/018/2020/01/14/0004554892_001_20200114160201940.jpg"
          authorimg="https://image.edaily.co.kr/news/column/atoz.jpg"
          direction="right"
          detail="true"
        ></ArticleCard>
      </section>
    );
  }
}

export default TrustArticle;