import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';

class EvaluationBar extends React.Component {
  constructor(props, context) {
  super(props, context);

    this.state = {
      width: 0,
      setWidth: 0,
    };

    this.widthVal = this.widthVal.bind(this);
    this.setWidth = this.setWidth.bind(this);
  }

  widthVal(e) {
    this.setState({ 
      width: e.target.value,
    });
  }

  setWidth(e) {
    this.setState({
      widthVal: this.state.width,
    });

    e.preventDefault();
  }

  render() {
    var barStyle = {
      width: this.state.widthVal + "%",
    };

    return (
      <div className="barArea">
        <div style={barStyle} className="barA"></div>

        <form onSubmit={this.setWidth}>
          <input onChange={this.widthVal}
            placeholder="Enter a width value"></input>
          <button type="submit">go</button>
        </form>
      </div>
    );
  }
}
export default EvaluationBar;