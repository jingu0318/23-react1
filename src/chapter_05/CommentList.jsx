import React from "react"; //컴포넌트 만들때는 리액트 임포트가 기본이다.
import Comment from "./Comment";

const comments = [
    {
        name: "2진구",
        comment: "안녕하세요, 2진구입니다.",
    },
    {
        name: "2진9",
        comment: "리액트 2진9!",
    },
    {
        name: "279",
        comment: "저도 279 배워보고 싶어요!!",
    },
];

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;