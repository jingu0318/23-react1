import React from "react"; // 컴포넌트 만들때는 리액트 임포트가 기본이다
import Comment from "./Comment"

function CommentList(props){
  return(
    <div>
      <Comment name={"2진구"} comment={"안녕하세요. 2진구입니다"}/>
      <Comment name={"2진9"} comment={"안녕하세요. 2진9입니다"}/>
      <Comment name={"279"} comment={"안녕하세요. 279입니다"}/>
    </div>
  )
}

export default CommentList;