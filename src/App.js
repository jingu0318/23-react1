import './App.css';
import { Component,useState } from 'react';


class Subject extends Component {
  render() {
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
      <button onClick={onApple}>사과</button> 
      <button onClick={onOrange}>오렌지</button>
      <button onClick={onBanana}>바나나</button>
    </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Subject></Subject>
      </div>
    );
  }
}

export default App;