import React, { Component } from "react";
import ArticleCard from './articleCard'
import './article.css'
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
          img:"",
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
    console.log(vsContents[0].journalist.img, '저널리스트');
    return (
      <section className="trustArticleSectionC" style={{maxWidth:'1070px', margin: 'auto', display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
        {vsContents.map((value, index) => {
          return <ArticleCard 
            title={this.state.vsContents[index].title}
            authorComp={this.state.vsContents[index].journalist != null ? this.state.vsContents[index].journalist['press'].name : "ㅇㅇ뉴스"}
            author={this.state.vsContents[index].journalist != null ? this.state.vsContents[index].journalist.name : "ㅇㅇㅇ"}
            bgimg="/img/article_bg_red.png"
            href={this.state.vsContents[index].link}
            articleimg={this.state.vsContents[index].img != null ? this.state.vsContents[index].img : null}
            authorimg={this.state.vsContents[index].journalist != null ? this.state.vsContents[index].journalist.img : null}
            direction="right"
            detail="true"
          ></ArticleCard>
        })}
      </section>
    );
  }
}

export default TrustArticle;