import React, { Component } from 'react';
import './article.css';

class Article extends Component {
    render() {

        let articleTitle = 'articleFont'
        let authorBox = ''
        let vsarticleAuthor = 'articleFont'

        if(this.props.type === 'vs'){
            articleTitle += ' vsarticleTitleC'
            authorBox += ' vsauthorBoxC'
            vsarticleAuthor += ' vsarticleAuthorC'
        }else{
            articleTitle += ' articleTitleC'
            authorBox += ' authorBoxC'
            vsarticleAuthor += ' articleAuthorC'
        }
        

        return (
            <div >
                <a target='_blank' href={this.props.href} rel="noopener noreferrer">
                    <div className={articleTitle}> { this.props.title } </div>
                </a>
                <div className={authorBox}>
                    <div className={vsarticleAuthor}> { this.props.authorComp } | {this.props.author }</div>
                </div>
                <img src={this.props.bgimg} id='articleBackgroundImgC' alt=""/>
                <a target='_blank' href={this.props.href} rel="noopener noreferrer">
                <img id='articleImgC' src={this.props.articleimg} alt=""/>
                </a>
          </div>
        )
    }
}

export default Article;