import React, {Component} from 'react';
import logo from './logo.svg';
import FirstComponent, {SecondComponent} from './components/learning-examples/FirstComponent';
import ThirdComponent from './components/learning-examples/ThirdComponent';
import Counter from './components/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}


// section2 - leaning basic components feature 
function LearningComponents() {
  return (
    <div className="LearningComponents">
      This is App
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
    </div>
  );
}

export default App;
