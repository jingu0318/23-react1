import React from "react" //임포트
import Book from "./book" //Book 컴포넌트 가져다 쓰니까 임포트(상대경로)

function Library(props) {
  return( //Book을 컴포넌트해서 div안에서 사용 가능
    <div> 
      <Book name="처음만난 파이썬" numOfPage={300}></Book> 
      <Book name="처음만난 AWS" numOfPage={400}></Book>
      <Book name="처음만난 리액트" numOfPage={500}></Book>
    </div>
  )
}

export default Library //익스포트(다른곳에서 사용가능)