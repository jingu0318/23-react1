import React, {useState} from"react";

function useCounter(initialValue){
  const[count, setCount] = useState(initialValue);

  const increaseCount = () => setCount((cont) => count + 1);
  const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));

  retrun [count, increaseCount, decreaseCount];
}

export default useCounter;