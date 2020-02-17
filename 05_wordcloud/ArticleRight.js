import React, { Component } from "react";
// import { Link } from "react-router-dom";

import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis} from 'recharts';

// import WordCloud from './wordCloud';
import 'd3-transition';
import { select } from 'd3-selection';
import ReactWordcloud from 'react-wordcloud';

import words from './words';

// const axios = require("axios");
// const popup = () => {
//   console.log('파법')
//   return (
//     document.getElementById('confirmPopup').classList.toggle('show') 
//   )
// }


class ArticleRight extends Component {
  // constructor(props) {
  //   super(props);
  //     this.newsContents = this.props.Articles;
  //     console.log(this.newsContents, '나오냐');
  //     this.focusIndex = this.props.index;
  //     this.state = {
  //       scoreList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       scoreList: [this.newsContents.newsContents[this.focusIndex].opinionCnt.e1, this.newsContents.newsContents[this.focusIndex].opinionCnt.e2,
  //       this.newsContents.newsContents[this.focusIndex].opinionCnt.e3, this.newsContents.newsContents[this.focusIndex].opinionCnt.e4,
  //       this.newsContents.newsContents[this.focusIndex].opinionCnt.e5, this.newsContents.newsContents[this.focusIndex].opinionCnt.e6,
  //       this.newsContents.newsContents[this.focusIndex].opinionCnt.e7, this.newsContents.newsContents[this.focusIndex].opinionCnt.e8,
  //       this.newsContents.newsContents[this.focusIndex].opinionCnt.e9, this.newsContents.newsContents[this.focusIndex].opinionCnt.e10,
  //       this.newsContents.newsContents[this.focusIndex].opinionCnt.e11, this.newsContents.newsContents[this.focusIndex].opinionCnt.e12],
  //       totalLike: this.props.Articles.newsContents[this.focusIndex].opinionCnt.good,
  //       totalDisLike: this.props.Articles.newsContents[this.focusIndex].opinionCnt.bad,
  //       popupShow: false,
  //     };
  //     this.colorChange = this.colorChange.bind(this);
  //   }

    //--------------------------------------wordcloud
    getCallback(callback) {
      return function(word, event) {
        const isActive = callback !== 'onWordMouseOut';
        const element = event.target;
        const text = select(element);
        text
          // .on('click', () => {
          //   if (isActive) {
          //     window.open(`https://duckduckgo.com/?q=${word.text}`, '_blank');
          //   }
          // })
          .transition()
          .attr('background', 'white')
          .attr('font-size', isActive ? '300%' : '100%')
          .attr('text-decoration', isActive ? 'underline' : 'none');
      };
    }  

    

    render() {
      const data = [
        { subject: '유익한 정보', A: 120, B: 110, fullMark: 150 },
        { subject: '정확한 정보', A: 98, B: 130, fullMark: 150 },
        { subject: '흥미로운 기사', A: 86, B: 130, fullMark: 150 },
        { subject: '정의로운 기사', A: 99, B: 100, fullMark: 150 },
        { subject: '독창적인 기사', A: 85, B: 90, fullMark: 150 },
        { subject: '논리정연한 기사', A: 65, B: 85, fullMark: 150 },
      ];

      const callbacks = {
        // getWordColor: word => (word.value > 50 ? 'orange' : 'purple'),
        getWordTooltip: word =>
          `The word "${word.text}" appears ${word.value} times.`,
        onWordClick: this.getCallback('onWordClick'),
        onWordMouseOut: this.getCallback('onWordMouseOut'),
        onWordMouseOver: this.getCallback('onWordMouseOver'),
      };

      const options = {
        colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
        enableTooltip: true,
        deterministic: false,
        fontFamily: 'impact',
        fontSizes: [5, 60],
        fontStyle: 'normal',
        fontWeight: 'normal',
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: 'sqrt',
        spiral: 'archimedean',
        transitionDuration: 10,
      };

      // this.focusIndex = this.props.index;
      // this.newsContents = this.props.Articles;  
      // const Articles = this.newsContents.newsContents;
      // console.log(this.Articles, '나오냐고');

      return (
        <div>
          <div className="articleChartA">
            <RadarChart cx={300} cy={220} outerRadius={150} width={600} height={440} data={data} textAlign='center'>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar name=" 내 성향" dataKey="A" stroke="#6d74da" fill="#6d74da" fillOpacity={0.5}/>
              <Radar name=" 기사 성향" dataKey="B" stroke="#ff7e5a" fill="#ff7e5a" fillOpacity={0.5}/>
              <Legend />
            </RadarChart>
          </div>

          <div className="wordCloudA">
              <div style={{ height: 400, width: 600 }}>
                <ReactWordcloud words={words} callbacks={callbacks} options={options} />
              </div>
          </div>
        </div>
    );
    
  }
}

export default ArticleRight;
