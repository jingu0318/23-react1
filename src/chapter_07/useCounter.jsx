import React, {useState} from"react";

function useCounter(initialValue){ //function 이름과 파일이름은 통일
  const[count, setCount] = useState(initialValue);

  const increaseCount = () => setCount((count) => count + 1); //변수 재선언
  const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));

  return [count, increaseCount, decreaseCount];
}

export default useCounter; //파일이름과 통일