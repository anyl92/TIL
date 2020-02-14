import React, { Component } from "react";
import ArticleCard from './articleCard'
const axios = require("axios");

class TrustArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vsContents: [{
        id:"",
        title:"",
        summary:"",
        journalist:{
          press:{name:""},
          name:"",
          title:"",
        },
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
      makeLink: '',
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
    var vsContents = this.state.vsContents;
    return (
      <section className="trustArticleSectionC">
        {vsContents.map((value, index) => {
          return <ArticleCard 
            title={this.state.vsContents[index].title}
            authorComp={this.state.vsContents[index].journalist != null ? this.state.vsContents[index].journalist['press'].name : "ㅇㅇ뉴스"}
            author={this.state.vsContents[index].journalist != null ? this.state.vsContents[index].journalist.name : "ㅇㅇㅇ"}
            bgimg="/img/article_bg_red.png"
            href={this.state.vsContents[index].link}
            articleimg={this.state.vsContents[index].img}
            authorimg="https://image.edaily.co.kr/news/column/atoz.jpg"
            direction="right"
            detail="true"
          ></ArticleCard>
        })}
      </section>
    );
  }
}

export default TrustArticle;