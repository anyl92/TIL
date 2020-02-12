import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis} from 'recharts';

// const popup = () => {
//   console.log('파법')
//   return "none"
// }

class ArticleRight extends Component {
  constructor(props) {
    super(props);

      this.state = {
        userChecked: false,
        colorVal: "black",
        likeList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        totalLike: 0,
        totalDislike: 0,
      };
      // this.colorChange = this.colorChange.bind(this);
      this.evalUp = this.evalUp.bind(this);
    }

    // colorChange() {
    //   this.setState({
    //   })
    // }

    likeCnt(flag) {
      if (flag === 1) {
        this.setState((state) => {
          return {
            totalLike: state.totalLike + 1,
            userChecked: true,
            colorVal: "red",
          };
        });
      } else {
        this.setState((state) => {
          return {
            totalLike: state.totalLike - 1,
            userChecked: false,
            colorVal: "black",
          };
        });
      };
    }

    dislikeCnt(flag) {
      if (flag === 1) {
        this.setState((state) => {
          return {
            totalDislike: state.totalDislike + 1,
            userChecked: true,
            colorVal: "red",
          };
        });
      } else {
        this.setState((state) => {
          return {
            totalDislike: state.totalDislike - 1,
            userChecked: false,
            colorVal: "black",
          };
        });
      };
    }

    evalUp(key) {
      if (this.state.userChecked === false) {  // 평가 처음 flag1
        var newLikeList = [...this.state.likeList];
        newLikeList[key] = newLikeList[key] + 1;
        if (key < 6) {
          this.likeCnt(1);
        } else {
          this.dislikeCnt(1);
        }
      } else {  // 평가 했었어 flag0
        var newLikeList = [...this.state.likeList];
        newLikeList[key] = newLikeList[key] - 1;
        if (key < 6) {
          this.likeCnt(0);
        } else {
          this.dislikeCnt(0);
        }
      }
      console.log(this.state.userChecked, '체크됐니 안됐니 여긴 온클릭 안')
      this.setState({
        likeList: newLikeList,
      });
    }

    render() {
      const data = [
        { subject: '유익한 정보', A: 120, B: 110, fullMark: 150 },
        { subject: '정확한 정보', A: 98, B: 130, fullMark: 150 },
        { subject: '흥미로운 기사', A: 86, B: 130, fullMark: 150 },
        { subject: '정의로운 기사', A: 99, B: 100, fullMark: 150 },
        { subject: '독창적인 기사', A: 85, B: 90, fullMark: 150 },
        { subject: '논리정연한 기사', A: 65, B: 85, fullMark: 150 },
        ];
      console.log(this.state.likeList, 'LikeList')
      console.log(this.state.userChecked, '체크됐니 안됐니')
      var checkColor = {
        color: this.state.colorVal,
      };

      return (
        <div className="articleRightA">
          <div className="articleNavA">
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
            </div>
            <div className="articleDetailA">
              <div id="confirmPopup" style={{display:'none'}}>투표하시겠어요?<button>Ok</button></div>
            <div className="articleLikeA">
              <img src="/img/좋다.png" width="50vw"></img>
              <div>{this.state.totalLike}</div>
            </div>
            <div className="articleEvalsA">
              <div className="articleLeftA">
                <div className="articleEvalA" onClick={() => this.evalUp(0)}>
                  <img src="/img/emoji/good1_Helpful.png" alt="광고" width="30px"></img>
                  <div className="evalNameA" style={checkColor}>유익한 정보</div>
                  <div className="evalNumberA">{this.state.likeList[0]}</div>
                </div>
                <div className="articleEvalA" onClick={() => this.evalUp(1)}>
                  <img src="/img/emoji/good2_Exact.png" alt="무성의" width="30px"></img>
                  <div className="evalNameA">정확한 정보</div>
                  <div className="evalNumberA">{this.state.likeList[1]}</div>
                </div>
                <div className="articleEvalA" onClick={() => this.evalUp(2)}>
                  <img src="/img/emoji/good3_Exciting.png" alt="오보" width="30px"></img>
                  <div className="evalNameA">흥미로운 기사</div>
                  <div className="evalNumberA">{this.state.likeList[2]}</div>
                </div>
              </div>
              <div className="articleRightA">
                <div className="articleEvalA" onClick={() => this.evalUp(3)}>
                  <img src="/img/emoji/good4_Justice.png" alt="헛소리" width="30px"></img>
                  <div className="evalNameA">정의로운 기사</div>
                  <div className="evalNumberA">{this.state.likeList[3]}</div>
                </div>
                <div className="articleEvalA" onClick={() => this.evalUp(4)}>
                  <img src="/img/emoji/good5_Unique.png" alt="사실왜곡" width="30px"></img>
                  <div className="evalNameA">독창적인 기사</div>
                  <div className="evalNumberA">{this.state.likeList[4]}</div>
                </div>
                <div className="articleEvalA" onClick={() => this.evalUp(5)}>
                  <img src="/img/emoji/good6_Smart.png" alt="악의헤드" width="30px"></img>
                  <div className="evalNameA">논리정연한 기사</div>
                  <div className="evalNumberA">{this.state.likeList[5]}</div>
                </div>
              </div>
            </div>
            <hr width="90%" color="#d0cece"></hr>
            <div className="articleLikeA">
              <img src="/img/싫다.png" width="50vw"></img>
              <div>{this.state.totalDislike}</div>
            </div>
            <div className="articleEvalsA">
              <div className="articleLeftA">
                <div className="articleEvalA" onClick={() => this.evalUp(6)}>
                  <div className="tmp"><img src="/img/emoji/bad1_Advertising.png" alt="광고" width="30px"></img></div>
                  <div className="evalNameA">광고</div>
                  <div className="evalNumberA">{this.state.likeList[6]}</div>
                </div>
                <div className="articleEvalA" onClick={() => this.evalUp(7)}>
                  <div className="tmp"><img src="/img/emoji/bad2_No sincerity.png" alt="무성의" width="30px"></img></div>
                  <div className="evalNameA">내용무, 성의없음</div>
                  <div className="evalNumberA">{this.state.likeList[7]}</div>
                </div>
                <div className="articleEvalA" onClick={() => this.evalUp(8)}>
                  <div className="tmp"><img src="/img/emoji/bad3_Lier.png" alt="오보" width="30px"></img></div>
                  <div className="evalNameA">오보, 가짜 기사</div>
                  <div className="evalNumberA">{this.state.likeList[8]}</div>
                </div>
              </div>
              <div className="articleRightA">
                <div className="articleEvalA" onClick={() => this.evalUp(9)}>
                  <div className="tmp"><img src="/img/emoji/bad4_Gibberish.png" alt="헛소리" width="30px"></img></div>
                  <div className="evalNameA">헛소리, 선동</div>
                  <div className="evalNumberA">{this.state.likeList[9]}</div>
                </div>
                <div className="articleEvalA" onClick={() => this.evalUp(10)}>
                  <div className="tmp"><img src="/img/emoji/bad5_Distortion.png" alt="사실왜곡" width="30px"></img></div>
                  <div className="evalNameA">사실 / 통계 왜곡</div>
                  <div className="evalNumberA">{this.state.likeList[10]}</div>
                </div>
                <div className="articleEvalA" onClick={() => this.evalUp(11)}>
                  <div className="tmp"><img src="/img/emoji/bad6_malice.png" alt="악의헤드" width="30px"></img></div>
                  <div className="evalNameA">악의적 헤드라인</div>
                  <div className="evalNumberA">{this.state.likeList[11]}</div>
                </div>
              </div>
            </div>
          </div>
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
    );
  }
}

export default ArticleRight;
