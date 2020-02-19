import React, { Component } from "react";
import VsArticle from './vsArticle';
import TrustArticle from './trustArticle';
import MainSearch from './MainSearch';
import Navigator from './Navigator';
import QueueArim from 'rc-queue-anim';


class MainArticle extends Component {
    render() {
        let textStyle = {         
            margin: 'auto', 
            marginTop: '60px',
            marginBottom: '23px',
            width: '70%',
            paddingBottom: '30px',
            borderBottom: 'solid gray',
            color: 'darkslategray'

        }
        return (
        <div style={{ width :'calc(100% - 100px)', height:'100%', overflow:'auto', position:'absolute', left: '100px', top:'0px'}}>
            <QueueArim>
            <Navigator/>
            <div className="mainPageC" key="1">
                <VsArticle/>
                <h1 style={textStyle}>신뢰도 높은 기사 큐레이션 입니다.</h1>
                <TrustArticle key="2"/>       
            </div>
            </QueueArim>
        </div>
        )
    }
}

export default MainArticle;