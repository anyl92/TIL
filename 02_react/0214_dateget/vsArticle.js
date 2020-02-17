import React, { Component } from 'react';
import ArticleCard from './articleCard'
import './vsArticle.css'
const axios = require("axios");

class VsArticle extends Component {
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

    componentWillMount(){
    //---------------------backend start
    var copyThis = this;
    axios
    .get("http://localhost:7888/CompTrust?id1=1050200003269472&id2=1053660000474767")
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

    render(){
        var vsContents = this.state.vsContents;
        // console.log(vsContents[0].journalist.img, '저널리스트');
        return (
            <section className='vsArticleSectionC'>
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
        )
    }
}

export default VsArticle;