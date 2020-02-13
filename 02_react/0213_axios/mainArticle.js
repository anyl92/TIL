import React, { Component } from "react";
import VsArticle from './vsArticle';
import TrustArticle from './trustArticle';
import MainSearch from './MainSearch';
import Navigator from './Navigator';

class MainArticle extends Component {

  render() {
    return (
    <div style={{ width :'calc( 100% - 100px )', height:'100%', overflow:'auto', position:'absolute', left: '100px', top:'0px'}}>
      <Navigator/>
      <div className="mainPageC">
        <div className="mainArticleC" style={{width: '100%', height:'100%', textAlign:'center', zIndex:80}}>
            <VsArticle/>
            <TrustArticle/>
          <br/><br/>
        </div>
          <MainSearch/>                
      </div>
    </div>
    )
  }
}

export default MainArticle;