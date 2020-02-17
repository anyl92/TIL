import 'd3-transition';
import { select } from 'd3-selection';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactWordcloud from 'react-wordcloud';

import words from './words';


function getCallback(callback) {
  return function(word, event) {
    const isActive = callback !== 'onWordMouseOut';
    const element = event.target;
    const text = select(element);
    text
      .on('click', () => {
        if (isActive) {
          window.open(`https://duckduckgo.com/?q=${word.text}`, '_blank');
        }
      })
      .transition()
      .attr('background', 'white')
      .attr('font-size', isActive ? '300%' : '100%')
      .attr('text-decoration', isActive ? 'underline' : 'none');
  };
}

const callbacks = {
  getWordColor: word => (word.value > 50 ? 'orange' : 'purple'),
  getWordTooltip: word =>
    `The word "${word.text}" appears ${word.value} times.`,
  onWordClick: getCallback('onWordClick'),
  onWordMouseOut: getCallback('onWordMouseOut'),
  onWordMouseOver: getCallback('onWordMouseOver'),
};

function App() {
  return (
    <div>
      <p>
        This example shows how we can use the callbacks prop to customize word
        colors and tooltips based on the data of the word.
      </p>
      <p>
        We can also capture the event target element and create an external link
        based on the word text!
      </p>
      <div style={{ height: 400, width: 600 }}>
        <ReactWordcloud callbacks={callbacks} words={words} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);