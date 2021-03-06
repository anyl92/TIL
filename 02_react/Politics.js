import React, {Component} from "react";
import { Link } from "react-router-dom";
import $ from "jquery/dist/jquery";
import '../Search_B.css';
import './Politics.css';

class Politics extends Component {
    onScroll(event) {
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
                var moveTop = $(window).scrollTop();
                var elmSelecter = $(elm).eq(index);
                console.log("delta값", delta);

                // 마우스휠을 위에서 아래로
                if (delta < 0) {
                    console.log("아래로가자");
                    // if (elmSelecter[0].nextSibling !== null) {
                    if ($(elmSelecter).next() !== undefined) {
                        console.log("갈 곳이 있어");
                        try{
                            moveTop = $(elmSelecter).next().offset().top;
                        }catch(e){}
                    }
                        // 마우스휠을 아래에서 위로
                } else {
                    console.log("위로가자");
                    // console.log($(elmSelecter).prev())
                    if ($(elmSelecter).prev() !== undefined) {
                        // console.log("갈곳이 있어");
                        try{
                            moveTop = $(elmSelecter).prev().offset().top;
                        }catch(e){}
                    }
                }
                 
                // 화면 이동 0.8초(800)
                $("html, body").stop().animate({
                    scrollTop: moveTop + 'px'
                }, {
                    duration: 400, complete: function () {
                    }
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
                <div className="articleRightA" style={{display:'inline-block', width: '50vw'}}>
                    <div className="articleNavA" style={{position:'relative', display:'table', padding:'15px 0px', display:'inline-block'}}>
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
                        <div className="journalistNameA">EBS일보 기자 | 펭수</div>
                        <div className="journalistInfoA">200k</div>
                    </div>
                    <div className="articleDetailA">
                        <div className="articleLikeA">
                            <img src="/img/좋다.png" width="50vw"></img>
                            <div>31</div>
                        </div>
                        <div className="articleEvalsA">
                            <div className="articleLeftA">
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/bad1_Advertising.png" alt="광고" width="30px"></img>
                                        <div className="evalNameA">광고</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/bad2_No sincerity.png" alt="무성의" width="30px"></img>
                                        <div className="evalNameA">내용무, 성의없음</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/bad3_Lier.png" alt="오보" width="30px"></img>
                                        <div className="evalNameA">오보, 가짜 기사</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                            </div>
                            <div className="articleRightA">
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/bad4_Gibberish.png" alt="헛소리" width="30px"></img>
                                        <div className="evalNameA">헛소리, 선동</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/bad5_Distortion.png" alt="사실왜곡" width="30px"></img>
                                        <div className="evalNameA">사실 / 통계 왜곡</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/bad6_malice.png" alt="악의헤드" width="30px"></img>
                                        <div className="evalNameA">악의적 헤드라인</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr width="90%" color="#d0cece"></hr>
                        <div className="articleLikeA">
                            <img src="/img/싫다.png" width="50vw"></img>
                            <div>123</div>
                        </div>
                        <div className="articleEvalsA">
                            <div className="articleLeftA">
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/good1_Helpful.png" alt="광고" width="30px"></img>
                                        <div className="evalNameA">유익한 정보</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/good2_Exact.png" alt="무성의" width="30px"></img>
                                        <div className="evalNameA">정확한 정보</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/good3_Exciting.png" alt="오보" width="30px"></img>
                                        <div className="evalNameA">흥미로운 기사</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                            </div>
                            <div className="articleRightA">
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/good4_Justice.png" alt="헛소리" width="30px"></img>
                                        <div className="evalNameA">정의로운 기사</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/good5_Unique.png" alt="사실왜곡" width="30px"></img>
                                        <div className="evalNameA">독창적인 기사</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
                                <div className="articleEvalA">
                                    <div className="evalA">
                                        <img src="/img/emoji/good6_Smart.png" alt="악의헤드" width="30px"></img>
                                        <div className="evalNameA">논리정연한 기사</div>
                                        <div className="evalNumberA">123</div>
                                    </div>
                                </div>
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