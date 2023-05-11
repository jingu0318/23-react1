import './App.css';
import { Component,useState } from 'react';


const App = () => {
    const [fruit, setfruit] = useState();

  const onApple = () => {
    setfruit(fruit = '사과'); 
  }

  const onOrange = () => {
    setfruit(fruit = '오렌지');
  }
  const onBanana = () => {
    setfruit(fruit = '바나나');
  }
    return (
      <div>
      <h1>어떤 과일을 좋아하나요? {fruit}.</h1>
      <button onClick={onApple}>사과</button>  &nbsp;&nbsp;&nbsp;
      <button onClick={onOrange}>오렌지</button> &nbsp;&nbsp;&nbsp;
      <button onClick={onBanana}>바나나</button>
    </div>
    );
  };

export default App;