
import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import LoginContainer from './Components/LoginContainer';


class App extends React.Component {
  render() {
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
        
        <Row>
          <Col>
            <MuiThemeProvider>
              <LoginContainer />
            </MuiThemeProvider>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;