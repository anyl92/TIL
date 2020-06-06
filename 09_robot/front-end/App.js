import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let curfloor = 11;
  return (
    <div className="App">
      <div className="border">
      <div className="startBox">
        <div className="startGuideBtn">안내 시작</div>
      </div>
      </div>

      <div className="border">
      <div className="startBox authenBox">인증 번호 입력
        <div className="numberBox">
          <div className="number pressed">1</div>
          <div className="number pressed">1</div>
          <div className="number pressed">2</div>
          <div className="number pressed">4</div>
        </div>
      </div>
      </div>

      <div className="border">
        <div className="startBox">
          <div className="left">
            <div className="mapBox">이곳은 {curfloor}층입니다.</div>
            <div className="mapBox pressed">Map</div>
          </div>

          <div className="right"> 
            <div className="guideBox">어디로 안내할까요?
              <div className="listBox">
                <div className="list pressed">1101호</div>
                <div className="list pressed">1102호</div>
                <div className="list pressed">우수 프로젝트 부릉부릉</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="firstBox pressed">Pressed Box</div> */}
    </div>
  );
}

export default App;
