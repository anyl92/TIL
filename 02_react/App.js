
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import Chart from 'react-apexcharts'

class Trans extends React.Component {
  constructor(props){
    super(props);
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options: {
        chart : {
          type: 'bar'
        },
        fill: {
          type: 'pattern',
          pattern: {
            style:'horizontalLines',
          },
        },
      },
      series: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }
      ],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
          'United States', 'China', 'Germany'
        ],
      }
    }
  }



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
        
        <div className="row">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            width="500"
          />
        </div>

        <div id="barA">
          <div id="progressA">
            div
          </div>
        </div>

      </div>
    );
  }
}

export default App;