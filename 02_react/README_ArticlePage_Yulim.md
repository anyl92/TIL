1. App.js 와 mainArticle.js 를 조금 분리해 보았다.

App.js 에 들어있던 NavBar 와 Search_B 컴포넌트를 main으로 옮겼고 Category는 사용하므로 그대로 둠

return 부분의 .App style width가 아래 컴포넌트 페이지들에게 영향을 끼쳐서 그 때 100%로 바꾸어 보았는데 .. 문제가 있다면 다시 바꿔줘염...

내가 사용하는 부분은 App.js 에서

```react
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Politics from './components/Politics';

class App extends Component {
    constructor(props) {
    super(props);
    this.mainArticle = React.createRef();
  };
    ...
  render(){
    var windowWidthSize = window.innerWidth;
    return (
      <Router>
        <div className="App" style={{width:'100%'}}>
          <Category></Category>
          <div className="articleTmp" style={{display: 'inline-block'}}>
              <Route exact path="/" component={MainArticle}/>
              <Route path="/politics" component={Politics} />
    ...       
```



2. Politics.js 에서 페이지 구성을 시작함.

articleDivA = 스크롤 부분이 빠진 전체 width를 100%로 두기 위한 div

articleLeftA / articleRightA = articleDivA에서 왼쪽과 오른쪽 구역을 나누기 위한 div

articleImageA = 왼쪽 구역에서 기사 이미지들을 보여줄 img



articleDivA의 width를 scroll을 뺀 부분에서부터 시작해야 articleLeftA 와 articleRightA 부분을 반응형으로 사용할 수 있을 것 같아 widthSize의 %를 계산했다. -> 반응형 고칠 때 react를 이용해 바꿔볼 예정



```react
import './Politics.css';

class Politics extends Component {
    ...
    render(){
        var windowWidthSize = window.innerWidth;
        var noscrollWidthSize = windowWidthSize - 100;  // category 부분의 width를 빼줌
        var calWidthSize = noscrollWidthSize / windowWidthSize * 100  
        // scroll 없는 부분의 width가 전체width의 몇 퍼센트인지 계산해서 width를 정해주기 위한 계산식

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
```

