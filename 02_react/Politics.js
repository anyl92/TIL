import React, {Component} from "react";
import { Link } from "react-router-dom";
import $ from "jquery/dist/jquery";
import '../Search_B.css';
import './Politics.css';

class Politics extends Component {
    onScroll(event) {
        $(document).on("ready", function() {
            $(".articleImageA").each(function () {
                
                // 개별적으로 Wheel 이벤트 적용
                $(this).on("mousewheel DOMMouseScroll", function(event) {
    
                    var delta = 0;
                    var moveTop = null;
                    var boxMax = $(".articleImageA").length - 1;
    
                    var winEvent = "";
    
                      
                    if(!winEvent) {
                        winEvent = window.event;
                    }
    
                    if(winEvent.wheelDelta) {
    
                        delta = winEvent.wheelDelta / 120;
                        if(window.opera) {
                            delta = -delta;
                        }
                    }
    
                   
                    else if(winEvent.detail) {
                        delta = -winEvent.detail / 3;
                    }
                    
                    // 마우스휠을 위에서 아래로 이동
                    if(delta < 0) {
    
                        // 마지막 BOX 보다 순서값이 작은 경우에 실행
                        if($(this).index() < boxMax) {
                            
                            console.log("▼");
                            if($(this).next() != undefined) {
                                moveTop = $(this).next().offset().top;
                            }
                        }
    
                        // 마지막 BOX보다 더 아래로 내려가려고 하는경우 알림창 출력
                        else {
                            alert("마지막 페이지 입니다.");
                            return false;
                        }
                    }
    
                    // 마우스휠을 아래에서 위로 이동
                    else {
    
                        // 첫번째 BOX 보다 순서값이 큰 경우에 실행
                        if($(this).index() > 0) {
    
                            console.log("▲");
                            if($(this).prev() != undefined) {
                                moveTop = $(this).prev().offset().top;
                            }
                        }
    
                        // 첫번째 BOX 더 위로 올라가려고 하는 경우 알림창 출력
                        else {
                            alert("첫번째 페이지 입니다.");
                            return false;
                        }
                    }
    
                    // 화면 이동 0.8초(800)
                    $("html,body").stop().animate({
                        scrollTop : moveTop + "px"
                    }
                    , {
                        duration: 400, complete : function () { }
                    });
                });
            });
        });
    }

    render(){
        var windowWidthSize = window.innerWidth;
        var noscrollWidthSize = windowWidthSize - 100;
        var calWidthSize = noscrollWidthSize / windowWidthSize * 100

        return (
        <div className="articleDivA" style={{position:'relative', display:'inline-block', overflow:'scroll', width: calWidthSize + '%', float:'right'}}>
            <div style={{textAlign: 'center', position: 'relative', display: 'inline-block', overflow: 'scroll', float: 'left', width: '100%'}}>
                <div className="articleLeftA" onWheel={this.onScroll} onScroll={this.onScroll} style={{backgroundColor:'purple', display:'inline-block', width:'45%', float:'left'}}>
                    <img className="articleImageA" src="/img/article1.jpg"></img>
                    <img className="articleImageA" src="/img/article2.jpg"></img>
                    <img className="articleImageA" src="/img/article3.jpg"></img>
                    <img className="articleImageA" src="/img/article1.jpg"></img>
                    <img className="articleImageA" src="/img/article2.jpg"></img>
                    <img className="articleImageA" src="/img/article3.jpg"></img>
                    <img className="articleImageA" src="/img/article1.jpg"></img>
                    <img className="articleImageA" src="/img/article2.jpg"></img>
                    <img className="articleImageA" src="/img/article3.jpg"></img>
                    <img className="articleImageA" src="/img/article1.jpg"></img>
                    <img className="articleImageA" src="/img/article2.jpg"></img>
                    <img className="articleImageA" src="/img/article3.jpg"></img>
                </div>
                <div className="articleRightA" style={{display:'inline-block', width: '46vw', float: 'left'}}>
                    <div className="articleNavA" style={{position:'relative', display:'table', paddingTop:'15px', display:'inline-block', width:'46vw'}}>
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
                    <br></br><br></br>
                    <div className="articleTitle" style={{fontWeight:"bold", fontSize:'1.3em', textAlign:'left', paddingLeft:'10px'}}>
                        [단독]청와대 70명 총선 앞으로..MD의 참모들은 왜 전멸했나
                    </div>
                    <div className="articleJournalist" style={{textAlign:'left', padding:'20px 0px 0px 10px'}}>
                        <img src="/img/펭수.jpg" width="70px" height="70px" style={{borderRadius:'50%'}}></img>
                        <span style={{textAlign:'left', paddingLeft:'10px', position:'absolute'}}>EBS일보 기자 | 펭수</span>
                    </div>
                    <br></br>
                    <div className="articleDetail" style={{width:'100%'}}>
                        <div className="articleEvals">
                            <div className="articleEval">
                                <img src="/img/emoji/1_Advertising.png" alt="광고" width="35px"></img>
                                <div style={{paddingLeft:'10px', display: "inline-block", width:"150px"}}>광고</div>
                                <span>123</span>
                            </div>

                            <div className="articleEval">
                                <img src="/img/emoji/2_No sincerity.png" alt="광고" width="35px"></img>
                                <div style={{paddingLeft:'10px', display: "inline-block", width:"150px"}}>내용무, 성의없음</div>
                                <span>123</span>
                            </div>
                            <div className="articleEval">
                                <img src="/img/emoji/3_Lier.png" alt="광고" width="35px"></img>
                                <div style={{paddingLeft:'10px', display: "inline-block", width:"150px"}}>오보, 가짜기사</div>
                                <span>123</span>
                            </div>
                            <div className="articleEval">
                                <img src="/img/emoji/4_Gibberish.png" alt="광고" width="35px"></img>
                                <div style={{paddingLeft:'10px', display: "inline-block", width:"150px"}}>헛소리, 선동</div>
                                <span>123</span>
                            </div>
                            <div className="articleEval">
                                <img src="/img/emoji/5_Distortion.png" alt="광고" width="35px"></img>
                                <div style={{paddingLeft:'10px', display: "inline-block", width:"150px"}}>사실/통계 왜곡</div>
                                <span>123</span>
                            </div>
                            <div className="articleEval">
                                <img src="/img/emoji/6_malice.png" alt="광고" width="35px"></img>
                                <div style={{paddingLeft:'10px', display: "inline-block", width:"150px"}}>악의적 헤드라인</div>
                                <span>123</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Politics;