import React, { Component } from "react";
import VsArticle from './vsArticle';
import TrustArticle from './trustArticle';
import { Link } from "react-router-dom";
import Search from '../Search_B';

class MainArticle extends Component {
    render() {
        var windowWidthSize = window.innerWidth;
        return (
        <div className='mainArticleA' style={{width:'90vw', float:'right'}}>
            <div className='mainArticlesC' style={{width:'46vw', display:'inline-block'}}>
                <div style={{position:'relative', display:'table', paddingTop:'15px', width:'46vw', display:'inline-block'}}>
                    <span style={{float:'left', display:'inline-block'}}>
                        커뮤니티 /
                        랭킹보기 /
                        기사작성
                    </span> 
                    <span style={{float:'right', display:'inline-block'}}>
                        <Link to="/login">로그인</Link> &nbsp;/ &nbsp;
                        <Link to="/signup">회원가입 </Link>
                    </span>
                </div>
                <br/><br/>
                <VsArticle/>
                <TrustArticle/>
            </div>
            <div style={{float:'right', textAlign:'center', padding:'10px', display:'inline-block'}}>
                <Search></Search>
            </div>
        </div>
        )
    }
}

export default MainArticle;