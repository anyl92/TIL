import React, { Component } from 'react';
import ArticleCard from './articleCard'
import './vsArticle.css'
const axios = require("axios");

class VsArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
        vsContents : [{
          id:"",
          title:"",
          summary:"",
          img:"",
          hit:"",
          link:"",
          date:"",
          mdate:"",
          content:"",
          crawling:"",
          sid:"",
          oid:"",
          aid:"",
          jid:""
        },
        {
          id:"",
          title:"",
          summary:"",
          img:"",
          hit:"",
          link:"",
          date:"",
          mdate:"",
          content:"",
          crawling:"",
          sid:"",
          oid:"",
          aid:"",
          jid:""
        }],
        makeLink1: '',
        makeLink2: '',
    }
  }
  
  componentDidMount(){
    //---------------------backend start
    var copyThis = this;
    axios
    .get("http://localhost:7888/CompTrust?id1=1050200003269472&id2=1053660000474767")
    .then(function(response){
        copyThis.setState({
            vsContents : response.data,
            makeLink1: 'https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=' + response.data[0].sid + '&oid=' + response.data[0].oid + '&aid=' + response.data[0].aid,
            makeLink2: 'https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=' + response.data[1].sid + '&oid=' + response.data[1].oid + '&aid=' + response.data[1].aid
        });
    })
    .catch(function(error){
        console.log("error", error);
    });
    //---------------------backend end
  }

  render(){
    console.log(this.state.vsContents ,' 링크 나와라얍');
    return (
      <section className='vsArticleSectionC' style={{}}>
        <ArticleCard
          title={this.state.vsContents[0].title}
          author='동아일보 | 장연제'
          bgimg='/img/article_bg_blue.png'
          href={this.state.makeLink1}
          articleimg={this.state.vsContents[0].img}
          authorimg='https://image.edaily.co.kr/news/column/atoz.jpg'
          type='vs'
          direction='left'
          widthVal="22"
          color='#6259EA'
          >
        </ArticleCard>
        
        <div className="vsTextC">
          VS
        </div>
        
        <ArticleCard 
          title={this.state.vsContents[1].title}
          author='조선비즈 | 박원익'
          bgimg='/img/article_bg_pink.png'
          href={this.state.makeLink2}
          articleimg={this.state.vsContents[1].img}
          authorimg='https://image.edaily.co.kr/news/column/atoz.jpg'
          type='vs'
          direction='right'
          withVal="78"
          color='#F69D99'
          >
        </ArticleCard>
      </section>
    )
  }
}

export default VsArticle;