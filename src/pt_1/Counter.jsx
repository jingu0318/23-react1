import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(number + 1); //number 상태 설정해주는것 넘버가 늘어남
  }

  const onDecrease = () => {
    setNumber(number - 1);
  }

  return ( //{onIncrease()} 로 하면 버튼을 누를때마다 함수가 실행되기 때문에 괄호없이 넣기만
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button> 
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;