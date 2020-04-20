import React, { useState, useEffect } from 'react';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

import '../css/ClosetPage.css';
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function Closet() {
  const [ routeTarget, setRouteTarget ] = useState('closet');
  const [ response, setResponse ] = useState([]);
  
  useEffect(() => {
    let url = `http://i02a401.p.ssafy.io:8000/user/follower-user`;

    axios.get(url, {'headers': {'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE1ODczOTAwMTksImV4cCI6MTU4NzM5NzIxOX0.ZLMJcy6ptUS9GaMrx9MyUn2ZzcCkyRnAu7qMrOCoxxc'}})
      .then((res) => { 
        const followList = res.data;
        followList.map((follow) => {
          setResponse(response => [...response, follow.nickname])
        })
        console.log(res.data)
      });
  });

  const Options = [
    { key: 'kms', value: 'kms', text: 'kimmyungsoo'},
    { key: 'khc', value: 'khc', text: 'kimhyuncheol'},
    { key: 'ayl', value: 'ayl', text: 'anyulim'},
    { key: 'lsy', value: 'lsy', text: 'leesooyoung'},
    { key: 'jhj', value: 'jhj', text: 'janghyunjin'},
    { key: 'kms2', value: 'kms2', text: 'kimmyungsoo'},
    { key: 'khc2', value: 'khc2', text: 'kimhyuncheol'},
    { key: 'ayl2', value: 'ayl2', text: 'anyulim'},
    { key: 'lsy2', value: 'lsy2', text: 'leesooyoung'},
    { key: 'jhj2', value: 'jhj2', text: 'janghyunjin'}
  ];

  const DropdownOnClick = (e) => {
    let target = e.target.innerText;
    setRouteTarget(target);
  }

  const ProfileNameEdit = (e) => {
    
  }

  console.log(response, 'useeff')

  return (
    <div className="myCloset">
      <div className="myInfo">
        <div className="myProfile">
          <span className="profileName">Yulim</span>
          <input type="text"></input>
          <button onClick={ProfileNameEdit}>수정버튼</button>
          <span>환영한다</span>
          <button>수정버튼</button>
        </div>
        <div className="follow">
          <span className="followTag">Follower</span>
          <span className="followerCnt">35</span>
          <span className="followerList">
            <span className="followerBtn">얍</span>
            <div className="followerDrop">
              <Link to="/">swim</Link>
              <Link to="/">jhj</Link>
              <Link to="/">kim</Link>
            </div>
          </span>
        </div>
        <div className="follow">
          <span className="followTag">Following</span>
          <span className="followingCnt">35</span>
        </div>
      </div>
      <Dropdown
        scrolling={true}
        search
        selection
        options={Options}
        onChange={DropdownOnClick}
      ></Dropdown>
      {routeTarget !== 'closet' && <Redirect to={routeTarget}></Redirect>}

      <div className="closet">
        <div className="dropMajorDiv">
          <button className="dropMajorBtn">Major</button>
          <div className="dropMajorContent">
            <Link to="/closet">여성</Link>
            <Link to="/closet">남성</Link>
            <Link to="/closet">아동</Link>
          </div>
        </div>
        <div className="dropMiddleDiv">
          <button className="dropMiddleBtn">Middle</button>
          <div className="dropMiddleContent">
            <Link to="/closet">상의</Link>
            <Link to="/closet">하의</Link>
            <Link to="/closet">신발</Link>
          </div>
        </div>
        <div className="dropMinorDiv">
          <button className="dropMinorBtn">Minor</button>
          <div className="dropMinorContent">
            <Link to="/closet">티셔츠</Link>
            <Link to="/closet">니트</Link>
            <Link to="/closet">셔츠</Link>
          </div>
        </div>
        <div className="clothesWrite">
          <Link to="/clothesresister"><button>새 옷</button></Link>
        </div>
      </div>

      <div className="clothesImage">
        <Link to={`/detail/1`}>
          <img src="./logo192.png"></img>
          <p>클릭시 상세페이지로 이동</p>
        </Link>
      </div>
    </div>
  )
}

export default Closet;