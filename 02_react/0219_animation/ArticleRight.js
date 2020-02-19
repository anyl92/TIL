import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, Line} from 'recharts';
import './Politics.css';

//  import WordCloud from './wordCloud';
import 'd3-transition';
import { select } from 'd3-selection';
import ReactWordcloud from 'react-wordcloud';

import QueueArim from 'rc-queue-anim';
import {LineSeries, Tooltip, ChartProvider, XAxis, YAxis,} from 'rough-charts'


const axios = require("axios");
// const popup = () => {
//   console.log('파법')
//   return (
//     document.getElementById('confirmPopup').classList.toggle('show') 
//   )
// }

// const request = (options) => {
//   const headers = new Headers({
//       'Content-Type': 'application/json',
//   })
  
//   if(localStorage.getItem(ACCESS_TOKEN)) {
//       headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
//   }

//   const defaults = {headers: headers};
//   options = Object.assign({}, defaults, options);

//   return fetch(options.url, options)
//   .then(response => 
//       response.json().then(json => {
//           if(!response.ok) {
//               return Promise.reject(json);
//           }
//           return json;
//       })
//   );
// };

class ArticleRight extends Component {
  constructor(props) {
    super(props);
      this.login = React.createRef();
      this.logout = React.createRef();
      this.newsContents = this.props.Articles;
      // console.log(this.newsContents.newsContents[0].wordCloudData, '으아아아아아아앙나');
      this.focusIndex = this.props.index;
      this.state = {
        // scoreList: [this.newsContents.newsContents[this.focusIndex].opinionCnt.e1, this.newsContents.newsContents[this.focusIndex].opinionCnt.e2,
        // this.newsContents.newsContents[this.focusIndex].opinionCnt.e3, this.newsContents.newsContents[this.focusIndex].opinionCnt.e4,
        // this.newsContents.newsContents[this.focusIndex].opinionCnt.e5, this.newsContents.newsContents[this.focusIndex].opinionCnt.e6,
        // this.newsContents.newsContents[this.focusIndex].opinionCnt.e7, this.newsContents.newsContents[this.focusIndex].opinionCnt.e8,
        // this.newsContents.newsContents[this.focusIndex].opinionCnt.e9, this.newsContents.newsContents[this.focusIndex].opinionCnt.e10,
        // this.newsContents.newsContents[this.focusIndex].opinionCnt.e11, this.newsContents.newsContents[this.focusIndex].opinionCnt.e12],
        // totalLike: this.props.Articles.newsContents[this.focusIndex].opinionCnt.good,
        // totalDisLike: this.props.Articles.newsContents[this.focusIndex].opinionCnt.bad,
        popupShow: false,
        hit : this.newsContents.newsContents[this.focusIndex].hit,
        wordCloudData: this.newsContents.newsContents[this.focusIndex].wordCloudData,
      };
      // this.colorChange = this.colorChange.bind(this);
    }

    // // colorChange() {
    // //   this.setState({
    // //   })
    // // }

    // likeCnt(flag) {
    //   if (flag === 1) {
    //     this.setState((state) => {
    //       return {
    //         totalLike: state.totalLike + 1,
    //         userChecked: true,
    //         // colorVal: "red",
    //       };
    //     });
    //   } else {
    //     this.setState((state) => {
    //       return {
    //         totalLike: state.totalLike - 1,
    //         userChecked: false,
    //         // colorVal: "black",
    //       };
    //     });
    //   };
    // }

    // dislikeCnt(flag) {
    //   if (flag === 1) {
    //     this.setState((state) => {
    //       return {
    //         totalDislike: state.totalDislike + 1,
    //         userChecked: true,
    //         // colorVal: "red",
    //       };
    //     });
    //   } else {
    //     this.setState((state) => {
    //       return {
    //         totalDislike: state.totalDislike - 1,
    //         userChecked: false,
    //         // colorVal: "black",
    //       };
    //     });
    //   };
    // }

    // evalUp(key) {
    //   // console.log(localStorage.isAuthenticated) undefined
    //   console.log(localStorage)

    //   // if (localStorage.isAuthenticated === true) {
    //     if (this.state.userChecked === false) {  // 평가 처음 flag1
    //       var newLikeList = [...this.state.likeList];
    //       newLikeList[key] = newLikeList[key] + 1;
    //       if (key < 6) {
    //         this.likeCnt(1);
    //       } else {
    //         this.dislikeCnt(1);
    //       }
    //     } else {  // 평가 했었어 flag0
    //       var newLikeList = [...this.state.likeList];
    //       newLikeList[key] = newLikeList[key] - 1;
    //       if (key < 6) {
    //         this.likeCnt(0);
    //       } else {
    //         this.dislikeCnt(0);
    //       }
    //     }
    //   // } else {
          
    //   // }
    //   // console.log(this.state.userChecked, '체크됐니 안됐니 여긴 온클릭 안')
    //   this.setState({
    //     likeList: newLikeList,
    //   });
    
    componentDidMount(){
      if(localStorage.isAuthenticated === "true"){
          this.login.current.style.display = "none"
          this.logout.current.style.display = "relative"
      }else{
          this.login.current.style.display = "relative"
          this.logout.current.style.display = "none"
      }
    }

    logoutClick = event => {
        localStorage.token = null;
        localStorage.isAuthenticated = false;
        window.location.reload();
    }

    //--------------------------------------wordcloud
    getCallback(callback) {
      return function(value, event) {
        const isActive = callback !== 'onWordMouseOut';
        const element = event.target;
        const text = select(element);
        const baseFontSize = text.attr('font-size');
        const baseFontSizeNum = baseFontSize.substring(0,baseFontSize.search('p'))
        console.log(baseFontSize);
        console.log("야나두", baseFontSizeNum)
        // if (text.value.value > 10) {
        //   value.size=200
        // } else {
        //   value.size=100
        // }
        // console.log(text['_groups']['0']['0'], '밸류나와라');
        // console.log(element, 'ㅎㅎ')
        // if(callback == 'onWordMouseOver'){
        //   console.log(element)
        //   text.transition().attr('font-size', baseFontSizeNum * 2 + 'px' )
        //   console.log("오버됨")
        // }else if(callback == 'onWordMouseOut'){
        //   console.log("나갔음")
        //   text.transition().attr('font-size', baseFontSizeNum / 2 + 'px')
        // }
        // text
        //   // .attr('font-size', value.value>10 ? value.size=200 : value.size=100)
        //   .on('click', () => {
        //     if (isActive) {
        //       // window.open(`https://duckduckgo.com/?q=${word.text}`, '_blank');
        //     }
        //   })
        //   .transition()
        //   .attr('background', 'white')
        //   .attr('font-size', isActive ? "6" : "1")
        //   .attr('text-decoration', isActive ? 'underline' : 'none');
      };
    }  


    render() {
      const data1 = [
        { subject: '유익한 정보', A: 120, B: 110, fullMark: 150 },
        { subject: '정확한 정보', A: 98, B: 130, fullMark: 150 },
        { subject: '흥미로운 기사', A: 86, B: 130, fullMark: 150 },
        { subject: '정의로운 기사', A: 99, B: 100, fullMark: 150 },
        { subject: '독창적인 기사', A: 85, B: 90, fullMark: 150 },
        { subject: '논리정연한 기사', A: 65, B: 85, fullMark: 150 },
      ];
      const data2 = [
        { subject: '광고', A: 120, B: 110, fullMark: 150 },
        { subject: '내용무, 성의없음', A: 98, B: 130, fullMark: 150 },
        { subject: '오보, 가짜 기사', A: 86, B: 130, fullMark: 150 },
        { subject: '헛소리, 선동', A: 99, B: 100, fullMark: 150 },
        { subject: '사실 / 통계 왜곡', A: 85, B: 90, fullMark: 150 },
        { subject: '악의적 헤드라인', A: 65, B: 85, fullMark: 150 },
      ];
      const data3 = [
        { name: 'A', value1: 30, value2: 35 },
        { name: 'B', value1: 90, value2: 17 },
        { name: 'C', value1: 50, value2: 23 },
        { name: 'D', value1: 40, value2: 15 },
        { name: 'E', value1: 70, value2: 39 },
        { name: 'G', value1: 30, value2: 25 },
        { name: 'H', value1: 100, value2: 31 },
        { name: 'I', value1: 110, value2: 32 },
      ];

      this.focusIndex = this.props.index;
      this.newsContents = this.props.Articles;  
      const Articles = this.newsContents.newsContents;
      const score = this.props.score;
      console.log('score?? ', score);

      const wcdata = JSON.parse(Articles[this.focusIndex].wordCloudData);

      // var jsonwcdata = JSON.parse(wcdata);


      // console.log('newsContents ', Articles[this.focusIndex])
      // this.setState({
      //   scoreList : [Articles[this.focusIndex].opinionCnt.e1, Articles[this.focusIndex].opinionCnt.e2,
      //                 Articles[this.focusIndex].opinionCnt.e3, Articles[this.focusIndex].opinionCnt.e4,
      //                 Articles[this.focusIndex].opinionCnt.e7, Articles[this.focusIndex].opinionCnt.e8,
      //                 Articles[this.focusIndex].opinionCnt.e5, Articles[this.focusIndex].opinionCnt.e6,
      //                 Articles[this.focusIndex].opinionCnt.e9, Articles[this.focusIndex].opinionCnt.e10,
      //                 Articles[this.focusIndex].opinionCnt.e11, Articles[this.focusIndex].opinionCnt.e12]
      // })
      // console.log('scoreList', this.state.scoreList )
      console.log(this.newsContents.newsContents[this.focusIndex], '나와주세여');
      return (
        <div  style={{overflowY :'auto', height:'100%'}}>
          <QueueArim type={['right', 'left']} interval={[200, 300]}
        delay={[0, 1000]} duration={[3000, 5000]}
        ease={['easeOutBack', 'easeInOutCirc']} leaveReverse>
            <div className="articleNavA">
            {/* <div style={{width:'calc( 100% - 100px)',height:'100px',background:'#FFC000', minWidth:'430px', position:'fixed', zIndex:100, textAlign:'center', paddingTop:'17px'}}> */}
                <span className="navBar">
                    {/* <div className="btn-group" role="group" aria-label="...">
                        <button type="button" className="btn btn-default" style={{backgroundColor:"#FFC000", color:"#ffffff"}}>기획의도</button>
                        <button type="button" className="btn btn-default" style={{backgroundColor:"#FFC000", color:"#ffffff"}}>종합랭킹</button>
                    </div> */}
                    <Link to="/landing">기획의도</Link> &nbsp;| &nbsp;
                    <Link to="/ranking">종합랭킹 </Link>
                </span>
                <img src="/img/logo.png" alt="로고" style={{ width: "130px" , display:'relative', verticalAlign:'middle'}} />
                <span className="navBar" ref={this.login}>
                    <Link to="/login">로그인</Link> &nbsp;| &nbsp;
                    <Link to="/signup">회원가입 </Link>
                </span>
                <span className="navBar" ref={this.logout} onClick={this.logoutClick}>
                    <Link to="/">로그아웃</Link>
                </span>
            {/* </div> */}
            </div>
            <div className="articleTitleA" key="1">
              <a href={Articles[this.focusIndex].link} target="_blank" rel="noopener noreferrer" onMouseUp={()=>this.props.hitUp(this.props.hit)}>{Articles[this.focusIndex].title}</a>
            </div>
            <div className="articleJournalistA" key="2">
              <img src={Articles[this.focusIndex].journalist.img} width="70px" height="70px" style={{borderRadius:'50%', display:'inline'}} alt=""></img>
              {/* <div>아</div> */}
              <div style={{display:'inline-block', verticalAlign:'top', height:'70px', paddingTop:'10px', paddingLeft:'15px'}}>
              <div className="journalistNameA"> 
                {Articles[this.focusIndex].journalist.press.name} | {Articles[this.focusIndex].journalist.name} 기자 : 
                <div style={{display: 'inline-block'}}>입만 열면 거짓말</div>
              </div>
              <div className='journalistInfoA' style={{marginTop:'5px'}}>
                <img className='img-16' src='img/follow.png' alt=""></img>
                <div style={{display: 'inline-block'}}> HIT : {this.props.hit} | </div>
                <span className='reliability'> 기자 신뢰도 </span>
                <span className='reliability'>{Articles[this.focusIndex].journalist.reliability}%</span>
                <img className='img-20' src='img/alert_green.png' alt=""></img>
              </div>
              </div>
            </div>
            <div className="articleDetailA" key="3">
              <div id="confirmPopup" style={{display:'none'}}>투표하시겠어요?<button>Ok</button></div>
              <div className="articleLikeA">
                <img src="/img/좋다.png" width="50vw" alt=""></img>
                <div> {score.good} </div>
              </div>
              <div className="articleEvalsA">
                <div className="scoreLeftA">
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(1)}>
                    <img src="/img/emoji/good1_Helpful.png" alt="광고" width="30px"></img>
                    <div className="evalNameA">유익한 정보</div>
                    <div className="evalNumberA"> {score.e1} </div>
                  </div>
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(2)}>
                    <img src="/img/emoji/good2_Exact.png" alt="무성의" width="30px"></img>
                    <div className="evalNameA">정확한 정보</div>
                    <div className="evalNumberA">{score.e2}</div>
                  </div>
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(3)}>
                    <img src="/img/emoji/good3_Exciting.png" alt="오보" width="30px"></img>
                    <div className="evalNameA">흥미로운 기사</div>
                    <div className="evalNumberA"> {score.e3}</div>
                  </div>
                </div>
                <div className="scoreRightA">
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(4)}>
                    <img src="/img/emoji/good4_Justice.png" alt="헛소리" width="30px"></img>
                    <div className="evalNameA">정의로운 기사</div>
                    <div className="evalNumberA"> {score.e4}</div>
                  </div>
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(5)}>
                    <img src="/img/emoji/good5_Unique.png" alt="사실왜곡" width="30px"></img>
                    <div className="evalNameA">독창적인 기사</div>
                    <div className="evalNumberA"> {score.e5}</div>
                  </div>
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(6)}>
                    <img src="/img/emoji/good6_Smart.png" alt="악의헤드" width="30px"></img>
                    <div className="evalNameA">논리정연한 기사</div>
                    <div className="evalNumberA"> {score.e6}</div>
                  </div>
                </div>
              </div>
              <hr width="90%" color="#d0cece"></hr>
              <div className="articleLikeA">
                <img src="/img/싫다.png" width="50vw" alt=""></img>
                <div>{/*this.state.totalDisLike*/} {score.bad}</div>
              </div>
              <div className="articleEvalsA">
                <div className="scoreLeftA">
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(7)}>
                    <div className="tmp"><img src="/img/emoji/bad1_Advertising.png" alt="광고" width="30px"></img></div>
                    <div className="evalNameA">광고</div>
                    <div className="evalNumberA">{score.e7}</div>
                  </div>
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(8)}>
                    <div className="tmp"><img src="/img/emoji/bad2_No sincerity.png" alt="무성의" width="30px"></img></div>
                    <div className="evalNameA">내용무, 성의없음</div>
                    <div className="evalNumberA">{score.e8} </div>
                  </div>
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(9)}>
                    <div className="tmp"><img src="/img/emoji/bad3_Lier.png" alt="오보" width="30px"></img></div>
                    <div className="evalNameA">오보, 가짜 기사</div>
                    <div className="evalNumberA">{score.e9} </div>
                  </div>
                </div>
                <div className="scoreRightA">
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(10)}>
                    <div className="tmp"><img src="/img/emoji/bad4_Gibberish.png" alt="헛소리" width="30px"></img></div>
                    <div className="evalNameA">헛소리, 선동</div>
                    <div className="evalNumberA">{score.e10} </div>
                  </div>
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(11)}>
                    <div className="tmp"><img src="/img/emoji/bad5_Distortion.png" alt="사실왜곡" width="30px"></img></div>
                    <div className="evalNameA">사실 / 통계 왜곡</div>
                    <div className="evalNumberA">{score.e11} </div>
                  </div>
                  <div className="articleEvalA" onClick={() => this.props.scoreUpdate(12)}>
                    <div className="tmp"><img src="/img/emoji/bad6_malice.png" alt="악의헤드" width="30px"></img></div>
                    <div className="evalNameA">악의적 헤드라인</div>
                    <div className="evalNumberA">{score.e12}</div>
                  </div>
                </div>
              </div>
            </div>
          {/* <div className="wordCloudA"  key="4">
              <div style={{ marginLeft: '10vw', height: '400px', width: '100%'}}>
                <ReactWordcloud words={wcdata} minSize={[400, 400]} size={[400, 400]}
                callbacks={{
                  getWordColor: ({ value }) => {
                    return value > 10 ? 'blue' : 'purple'
                  },
                  getWordTooltip: word =>
                    `"${word.text}" 단어가 ${word.value} 번 쓰였습니다`,
                  onWordClick: this.getCallback('onWordClick'),
                  onWordMouseOut: this.getCallback('onWordMouseOut'),
                  onWordMouseOver: this.getCallback('onWordMouseOver'),
                }} 
                options={{
                  enableTooltip: true,
                  deterministic: false,
                  fontFamily: 'GmarketSansTTFBold',
                  fontSizes: [8,2],
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  padding: 5,
                  rotations: 10,
                  rotationAngles: [0, 90],
                  scale: 'log',
                  spiral: 'rectangular',
                  transitionDuration: 1000,
                }}/>
              </div>
          </div> */}

          <div className="articleChartA" key="5">
            <ChartProvider height={400} data={data3}>
              <XAxis dataKey="name" />
              <YAxis />
              <LineSeries dataKey="value1" options={{stroke: "#0392cf", strokeWidth:2}} />
              <LineSeries dataKey="value2" options={{stroke: "#feb2a8", strokeWidth:2}} />
              <Tooltip />
            </ChartProvider>
            {/* <RadarChart cx={300} cy={220} outerRadius={150} width={600} height={440} data={data1} textAlign='center'>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar name=" 기자 성향" dataKey="A" stroke="#6d74da" fill="#6d74da" fillOpacity={0.5}/>
              <Radar name=" 기사 성향" dataKey="B" stroke="#ff7e5a" fill="#ff7e5a" fillOpacity={0.5}/>
              <Legend />
            </RadarChart>
          </div>
          <div className="articleChartA" key="6" style={{marginLeft: '4vw', marginBottom: '2vw'}}>
            <RadarChart cx={300} cy={220} outerRadius={150} width={600} height={440} data={data2} textAlign='center'>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar name=" 기자 성향" dataKey="A" stroke="#6d74da" fill="#6d74da" fillOpacity={0.5}/>
              <Radar name=" 기사 성향" dataKey="B" stroke="#ff7e5a" fill="#ff7e5a" fillOpacity={0.5}/>
              <Legend />
            </RadarChart> */}
          </div>
          </QueueArim>
      </div>
    );
  }
}

export default ArticleRight;
