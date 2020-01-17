
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import Chart from 'react-apexcharts'


class App extends React.Component {
  
  render() {
    let percentTmp = 77;
    return (
      <div className="App">

        <Navbar className="navFontA">
          <Nav.Link href="#">커뮤니티</Nav.Link> |
          <Nav.Link href="#">랭킹보기</Nav.Link> |
          <Nav.Link href="#">기사작성</Nav.Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end rightNavFontA">
            <Nav.Link href="#">로그인</Nav.Link> |
            <Nav.Link href="#">회원가입</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        
      </div>
    );
  }
}

export default App;