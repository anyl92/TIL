import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Test from './components/testclass';
import WriteClothes from './components/WriteClothes';
import MyCloset from './components/MyCloset';


interface Props {
  name: string;
  age?: number;
}

const MyComponent: React.FunctionComponent<Props> = function({ name, age = 23 }) {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      {/* <MyComponent name='유림' />
      <Test /> */}
      <Router>
        <Route path="/" exact component={WriteClothes} />
        <Route path="/mycloset" exact component={MyCloset} />
      </Router>
    </div>
  );
}

export default App;
