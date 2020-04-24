import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, Box, Select, MenuItem } from '@material-ui/core';
import { closetjsx } from '../css/useStyles'

const baseUrl = process.env.REACT_APP_URL

export default function Closet() {
  const styles = closetjsx();

  // 유저의 팔로 리스트 서버에서 받아오기
  const [ routeTarget, setRouteTarget ] = useState('closet');
  const [ followerRes, setFollowerRes ] = useState([]);
  const [ followingRes, setFollowingRes ] = useState([]);

  useEffect(() => {
    var comment1 = ['follower-user', 'following-user']
    for (let i=0; i<2; i++){
      let url = `${baseUrl}/user/${comment1[i]}`;
      console.log(localStorage.token, '토큰')
      axios.get(url, {'headers': {'Authorization': localStorage.token}})
      .then((res) => {
        const followList = res.data;
        followList.forEach((follow) => {
          if (follow.following_email === localStorage.email) { 
            // 나를 팔로우한 유저가 저장 === 내 팔로워
            let data = { email: follow.follower_email, nickname: follow.nickname, img: follow.profile_img }
            setFollowerRes(followerRes => [...followerRes, data])
          } else {
            // 내가 팔로우한 유저가 저장 === 내 팔로잉
            let data = { email: follow.following_email, nickname: follow.nickname, img: follow.profile_img }
            setFollowingRes(followingRes => [...followingRes, data])
          }
        });
      });
    }
  }, []);

  // 드롭다운 팔로 선택 시 선택된 유저 옷장으로 이동
  const followSelect = (e) => {
    let target = e.target.value;
    setRouteTarget(target);
  }

  // 팔로우 버튼 - 내 옷장 아닌지 확인 필요
  const handleFollowClick = (e) => {

  }

  // 옷장 소개 수정 - 내 옷장 인지 확인 필요
  const [ closetIntro, setClosetIntro ] = useState('유림스옷장');
  const [ isEdit, setIsEdit ] = useState(true);

  const handleIntroClick = (e) => {
    setIsEdit(false)
  }

  const ClosetIntroView = () => ( // true  
    <div>
      <span>{closetIntro}</span>
      <button onClick={handleIntroClick}>수정버튼</button>
    </div>
  );

  const ClosetIntroEdit = () => {  // false
    const [ editIntro, setEditIntro ] = useState(closetIntro);

    const handleIntroChange = (e) => {
      setEditIntro(e.target.value)
    }

    const handleIntroBlur = (e) => {
      setClosetIntro(e.target.value)
      setIsEdit(true)
    }
  
    const handleIntroEnter = (e) => {
      if (e.key === 'Enter') {
      setClosetIntro(e.target.value)
      setIsEdit(true)
      }
    }

    return (
      <div>
        <input type="text" value={editIntro} autoFocus
          onChange={handleIntroChange} onBlur={handleIntroBlur} onKeyPress={handleIntroEnter}></input>
      </div>
    )
  }

  return (
    <Grid className={styles.root} style={{backgroundColor:'white'}}>
      <Card className="myInfo">
        <div className="myProfile">
          <span className="profileName">Yulim</span>
          <button onClick={handleFollowClick}> follow </button>
          {isEdit ? <ClosetIntroView /> : <ClosetIntroEdit />}
        </div>
        <div className="follow">
          <span className="followTag">Follower</span>
          <span className="followerCnt">35</span>
          <Select name='followerDrop' onChange={followSelect}
          >{followerRes.map((follower) => (
            <MenuItem key={follower.email} value={follower.nickname}><img src={follower.img} width='20px' height='20px'/> {follower.nickname}</MenuItem>
          ))}</Select>
          {/* <span className="followerList">
            <span className="followerBtn">얍</span>
            <div className="followerDrop">
              <Link to="/">swim</Link>
              <Link to="/">jhj</Link>
              <Link to="/">kim</Link>
            </div>
          </span> */}
        </div>
        <div className="follow">
          <span className="followTag">Following</span>
          <span className="followingCnt">35</span>
          <Select name='followingDrop' onChange={followSelect}
          >{followingRes.map((following) => (
            <MenuItem key={following.email} value={following.nickname}><img src={following.img} width='20px' height='20px'/> {following.nickname}</MenuItem>
          ))}</Select>
        </div>
      </Card>
      {routeTarget !== 'closet' && <Redirect to={routeTarget}></Redirect>}

      <div className="closet">
        <div className="dropMajorDiv">
        </div>
        <div className="dropMiddleDiv">
        </div>
        <div className="dropMinorDiv">
        </div>

        <div className="clothesWrite">
          <Link to="/clothesregister"><button>새 옷</button></Link>
        </div>
      </div>

      <div className="clothesImage">
        <Link to={`/detail/1`}>
          <img src="./logo192.png"></img>
          <p>클릭시 상세페이지로 이동</p>
        </Link>
      </div>
    </Grid>
  )
}
