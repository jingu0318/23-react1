import React from "react" //임포트

function Book(props){ //컴퍼넌트 이름은 파일 이름과 같게! 해준다.
  return(
    <div>
      <h1>{`이 책의 이름은 ${props.name}입니다.`}</h1>
      <h2>{`이 책은 총 ${props.numOfPage}페이지로 이루어져 있습니다.`}</h2>
    </div>
  )
}

export default Book //다른 폴더에서 사용할 수 있게 해줌?