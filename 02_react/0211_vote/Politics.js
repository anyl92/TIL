import React, {Component} from "react";
import { Link } from "react-router-dom";
import $ from "jquery/dist/jquery";

import './Politics.css';

import ArticleEval from './ArticleEval';
import {Radar, RadarChart, PolarGrid, Legend, 
    PolarAngleAxis, PolarRadiusAxis} from 'recharts';

class Politics extends Component {

    constructor(props) {
        super(props);
        this.news_1 = React.createRef();
        // this.news_1 = null;
        // this.setNews_1 = element => {
        //     this.news_1 = element;
        // };
        // this.settingRef = this.settingRef.bind(this);
        this.state = {
            news_1_Height : 0
        };
        const setref = function() {
            console.log('ㅎ', this.value)
        }
        setref.value = this.news_1;
        setref.func = function() {
            console.log('ddㅎ', this.value.current)
        }
        setref.func()
    }

    componentDidMount(){
        var windowHeightSize = (window.innerHeight - this.news_1.current.height)/2;
        console.log(this.news_1.current.getBoundingClientRect())
        console.log(this.news_1);
        console.log(this.news_1.current.height)
        console.log(this.news_1.current.width)
        console.log(windowHeightSize)
    }

    onScroll = event => {

        // console.log('articleScrollSection', this.articleScrollSection.current.style.overflow);

        // this.articleScrollSection.current.style.overflow = "scroll";

        const wheelEvent = event.nativeEvent;
        var elm = ".articleImageA";
        $(elm).each(function (index) {
            // 개별적으로 Wheel 이벤트 적용
            $(this).on("mousewheel DOMMouseScroll", function (e) {
                e.preventDefault();
                var delta = 0;
                if (!event) event = window.event;
                // console.log("event.wheelDelta값", wheelEvent.wheelDelta);
                // console.log("event.datail값", event);
                if (wheelEvent.wheelDelta) {
                    delta = wheelEvent.wheelDelta / 120;
                    if (window.opera) delta = -delta;
                } 
                else if (wheelEvent.detail)
                    delta = -event.detail / 3;
                // var moveTop = $(".articleLeftA").scrollTop();
                var moveTop = $(window).scrollTop();
                var elmSelecter = $(elm).eq(index);

                console.log("delta값", delta);
                console.log('index값', index);
                console.log('img height값', $(elmSelecter)[0].height);
                console.log("old moveTop값", moveTop);
                console.log("elmSelecter값", $(elmSelecter.offset().top));
                // console.log("elmSelecter.prev값", $(elmSelecter).prev());
                // console.log("elmSelecter.next값", $(elmSelecter).next());
                // 마우스휠을 위에서 아래로
                if (delta < 0) {
                    console.log("아래로가자");
                    // if (elmSelecter[0].nextSibling !== null) {
                    if ($(elmSelecter).next() !== undefined) {
                        console.log("갈 곳이 있어");
                        try{  
                            // moveTop = $(elmSelecter).next().offset().top;
                            // moveTop = $(elmSelecter).offset().top + 1.5*$(elmSelecter)[0].height - 0.5*window.innerHeight;
                            moveTop = $(elmSelecter).offset().top + $(elmSelecter)[0].height - (window.innerHeight - $(elmSelecter)[0].height)/2;
                        }catch(e){}
                    }
                } else {
                // 마우스휠을 아래에서 위로
                    console.log("위로가자");
                    if ($(elmSelecter).prev() !== undefined) {
                        console.log("갈 곳이 있어");
                        try{
                            moveTop = $(elmSelecter).prev().offset().top - (window.innerHeight - $(elmSelecter)[0].height)/2;
                        }catch(e){}
                    }
                }

                console.log('new moveTop', moveTop);
                 
                // console.log('articleLeftA', $(".articleLeftA")[0].style.overflowY);
                // $(".articleLeftA")[0].style.overflow = "scroll";               
                // console.log('articleLeftA', $(".articleLeftA")[0].style.overflowY);
                
                // 화면 이동 0.4초(400)
                // console.log("articleStop", $(".articleLeftA").stop())
                $("html, body").stop().animate({
                    scrollTop: moveTop + 'px'
                }, {
                    duration: 400, complete: function () {
                    }
                });

                // $(".articleLeftA")[0].style.overflow = "hidden";
                // console.log('articleLeftA', $(".articleLeftA")[0].style.overflowY);

            });
        });
    };

    render(){
        var windowWidthSize = window.innerWidth;
        var noscrollWidthSize = windowWidthSize - 100;
        var calWidthSize = noscrollWidthSize / windowWidthSize * 100
        var rightSize = 50
        const data = [
            { subject: '유익한 정보', A: 120, B: 110, fullMark: 150 },
            { subject: '정확한 정보', A: 98, B: 130, fullMark: 150 },
            { subject: '흥미로운 기사', A: 86, B: 130, fullMark: 150 },
            { subject: '정의로운 기사', A: 99, B: 100, fullMark: 150 },
            { subject: '독창적인 기사', A: 85, B: 90, fullMark: 150 },
            { subject: '논리정연한 기사', A: 65, B: 85, fullMark: 150 },
            ];

        console.log('news_1', this.news_1);
        console.log('news_1', this.news_1.current);

        return (
        // <div className="articleTmp" style={{display: 'inline-block'}}>
            <div className="articleDivA" style={{position:'relative', display:'inline-block', /*overflow:'hidden',*/ width: "calc(100% - 100px)", left : "100px"}}>
                {/* <div style={{textAlign: 'center', position: 'relative', display: 'inline-block', overflow: 'hidden', float: 'left', width: '100%'}}> */}
                    <div className="articleLeftA" onWheel={this.onScroll} /*onScroll={this.onScroll}*/
                    style={{backgroundColor:'white', display:'inline-block', width:'45%', minWidth:"400px"}}>
                        <img alt="난 0번" className="articleImageA" src="/img/logo.png" style={{height:"windowHeightSize", minHeight:"50px"}}></img>
                        <img alt="난 1번" className="articleImageA" src="/img/article1.jpg" ref={this.news_1}></img>
                        <img alt="난 2번" className="articleImageA" src="/img/article2.jpg"></img>
                        <img alt="난 3번" className="articleImageA" src="/img/article3.jpg"></img>
                        <img alt="난 4번" className="articleImageA" src="/img/article4.jpg"></img>
                        <img alt="난 5번" className="articleImageA" src="/img/article5.jpg"></img>
                        <img alt="난 6번" className="articleImageA" src="/img/article1.jpg"></img>
                        <img alt="난 7번" className="articleImageA" src="/img/article2.jpg"></img>
                        <img alt="난 8번" className="articleImageA" src="/img/article3.jpg"></img>
                        <img alt="난 9번" className="articleImageA" src="/img/article4.jpg"></img>
                        <img alt="난 10번" className="articleImageA" src="/img/article5.jpg"></img>
                        <img alt="난 11번" className="articleImageA" src="/img/article1.jpg"></img>
                        <img alt="난 12번" className="articleImageA" src="/img/article2.jpg"></img>
                        <img alt="난 13번" className="articleImageA" src="/img/logo.png" style={{height:"windowHeightSize", minHeight:"50px"}}></img>
                    </div>
                    <div className="articleRightA">
                        <div className="articleNavA">
                    {/* <div className="articleRightA" style={{display:'inline-block', width: '50vw'}}>
                        <div className="articleNavA" style={{position:'relative', display:'table', padding:'15px 0px', display:'inline-block'}}> */}
                            <span style={{float:'left', display:'inline-block', width:'40%'}}>
                                커뮤니티 /
                                랭킹보기 /
                                기사작성
                            </span> 
                            <span style={{width:'25%'}}>
                                <input style={{width:'20%'}}></input>
                                <button>검색</button>
                            </span>
                            <span style={{float:'right', display:'inline-block', width:'25%'}}>
                                <Link to="/login">로그인</Link> &nbsp;/ &nbsp;
                                <Link to="/signup">회원가입 </Link>
                            </span>
                        </div>
                        <div className="articleTitleA">
                            [단독]청와대 70명 총선 앞으로..MD의 참모들은 왜 전멸했나
                        </div>
                        <div className="articleJournalistA">
                            <img src="/img/펭수.jpg" width="70px" height="70px" style={{borderRadius:'50%'}}></img>
                            <div className="journalistNameA">EBS일보 기자 | 펭수 : <div style={{display: 'inline-block'}}>입만 열면 거짓말</div></div>
                            <div class='journalistInfoA'>
                                <img class='img-16' src='img/follow.png'></img>
                                <span> 200K </span>
                                <span class='reliability'>기자 신뢰도 </span>
                                <span class='reliability'>50% </span>
                                <img class='img-20' src='img/alert_green.png'></img>
                            </div>
                            {/* <div className="journalistInfoA">200k</div> */}
                        </div>
                        <ArticleEval></ArticleEval>
                        <div className="articleChartA">
                            <RadarChart cx={300} cy={220} outerRadius={150} width={600} height={440} data={data} textAlign='center'>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <Radar name=" 내 성향" dataKey="A" stroke="#6d74da" fill="#6d74da" fillOpacity={0.5}/>
                                <Radar name=" 기사 성향" dataKey="B" stroke="#ff7e5a" fill="#ff7e5a" fillOpacity={0.5}/>
                                <Legend />
                            </RadarChart>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        );
    }
}

export default Politics;