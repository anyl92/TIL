import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import SignUpComp from './components/SignUpComp';
import Category from './components/Category';
import LoginComp from './components/LoginComp';
import MainArticle from './components/mainArticle';
import Politics from './components/Politics';
import society from './components/society';
import lifeCulture from './components/lifeCulture';
import international from './components/international';
import ITscience from './components/ITscience';
import entertainment from './components/entertainment';
import sports from './components/sports';

class App extends Component {
  constructor(props) {
    super(props);
    this.mainArticle = React.createRef();
  };

  onScroll = event => {
    const wheel = event.nativeEvent.wheelDelta;
    console.log('wheel Data', wheel );
    // console.log(this.mainArticle.current.style.overflow );
    this.mainArticle.current.style.overflow = "scroll";
    this.mainArticle.current.scrollTo(0, 10);
  }

  render(){
    var windowWidthSize = window.innerWidth;
    return (
      <Router>
        <div className="App" style={{width:'100%'}}>
          <Category></Category>
          <div className="articleTmp" style={{display: 'inline-block'}}>
              <Route exact path="/" component={MainArticle}/>
              <Route path="/politics" component={Politics} />
              <Route path="/society" component={society}/>
              <Route path="/lifeCulture" component={lifeCulture}/>
              <Route path="/international" component={international}/>
              <Route path="/ITscience" component={ITscience}/>
              <Route path="/entertainment" component={entertainment}/>
              <Route path="/sports" component={sports}/>
              <Route path="/signup" component={SignUpComp} />
              <Route path="/login" component={LoginComp}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
