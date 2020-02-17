import React, { Component } from 'react';
import './articleCard.css';
import Article from './article'

class ArticleCard extends Component {
    render() {
        var barStyle = {
            width: this.props.widthVal + "%",
            background: this.props.color
        };
        let barTextStyle = {
            position : 'absolute',
            bottom : '5%'
        };

        let barAreaStyle={
            height:'100%', 
            width:'calc( 100% - 165px )', 
            position:"relative"
        };
            
        let _sizeClass = 'articleC';
        let _authorImgDClass = 'articleAuthorImgC'
        let _hatImgDClass = 'hatImageC'
        let _barClass = ''
        // let _barText = 'articleFont'

        if(this.props.detail){
            _sizeClass += ' trustArticleC'
        }

        if(this.props.type === 'vs'){
            _barClass += ' barA'
            _sizeClass += ' vsArticleC'
            if(this.props.direction === 'right'){
                _barClass += ' barRightC'
                // _barText += ' barTextRC'
                barTextStyle.left = Number(this.props.widthVal)+Number(8) + '%'
                barAreaStyle.marginRight = '160px' 
            }else{
                _barClass +=' barleftC'
                // _barText += ' barTextLC'
                barTextStyle.right = Number(this.props.widthVal)+Number(8) + '%'
                barAreaStyle.marginLeft = '160px'
    
            }
        }else{
            _barClass += ' barB barLeftC'
        }

        
        if(this.props.direction === 'left'){
            _authorImgDClass += ' authorImgLC'
            _hatImgDClass += ' hatImageLC'
        }else{
            _authorImgDClass += ' authorImgRC'
            _hatImgDClass += ' hatImageRC'
        }

        console.log(this.props.widthVal)


        return (
            <article className={_sizeClass}>
                <Article
                title={ this.props.title }
                authorComp={ this.props.authorComp }
                author={ this.props.author }
                bgimg={ this.props.bgimg }
                href={ this.props.href }
                articleimg={ this.props.articleimg }
                authorimg={ this.props.authorimg }
                type = { this.props.type }
                ></Article>
                <div className='boxC'>
                    <img className={_authorImgDClass} src={this.props.authorimg} alt=""/>
                </div>
                <img className={_hatImgDClass} src='/img/hatRight.png' alt=""/>
                <div className="barArea" style={barAreaStyle}>
                    <div style={barStyle} className={_barClass}></div>
                    <div style={barTextStyle} className='articleFont'>{this.props.widthVal + "%"}</div>
                    {/* <div  >{this.props.widthVal + "%"}</div>                     */}
                </div>

          </article>
        )
    }
}

export default ArticleCard;