import React, { Component } from "react";

class ArticleEval extends Component {
  constructor(props) {
    super(props);

      this.state = {
        likeList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
      this.evalUp = this.evalUp.bind(this);
    }
    
    evalUp(key) {
      const popup = () => {
        return (
          <div>투표하시겠어요?<button>Ok</button></div>
        );
      }

      let newLikeList = [...this.state.likeList];
      newLikeList[key] = newLikeList[key] + 1;

      this.setState({
        likeList: newLikeList,
      });
    }

    render() {
      return (
        <div className="articleDetailA">
        <div className="articleLikeA">
          <img src="/img/좋다.png" width="50vw"></img>
          <div>31</div>
        </div>
        <div className="articleEvalsA">
          <div className="articleLeftA">
            <div className="articleEvalA" onClick={() => this.evalUp(0)}>
                <img src="/img/emoji/good1_Helpful.png" alt="광고" width="30px"></img>
                <div className="evalNameA">유익한 정보</div>
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
          <div>123</div>
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
      );
    }
}

export default ArticleEval;
