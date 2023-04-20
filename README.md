
# 23-React1 이진구 
---
 ## 강의날 4/13 7주차
---
지난 수업시간 되돌아보는 시간 chaptere_06에서 NotificationList.jsx는 마운트,언마운트를 통해 원하는 시기에 함수를 보여줄 수 있다. 

6.4 State란

리액트 컴포넌트의 변경 가능한 데이터(가장많이 사용하기도 한다.) 

7장

1. 훅이란(중요하다.)

클래스형 컴포넌트에서는 생서자에서 state를 정의하고, setState()함수를 통해 state를 업데이트

state와 생명주기 기능에 갈고리를 걸어원하는 시점에정해진 함수를 실행되도록 만든 함수

훅의 이름은 모두 use로 시작

2. useState

함수형 컴포넌트에서 state를 사용하기 위한 Hook

ex) const[count,setCount] = useState(0);

... setCount(count+1) 호출될때마다 카운트 + 1

3. useEffect

사이드 이펙트를 수행하기 위함(부수적인 효과, 영향)

클래스 컴포넌트의 생명주기 함수와 같은 기능을 하나로 통합한 기능을 제공

랜더링 외에 실행해야 하는 부수적인 코드

useEffect(이펙트함수, 의존성 배열);

이펙트함수는 처음 컴포넌트가 렌더링 된 이후, 재 렌더링 이후에 실행

두번째 생략하여 배열없이 useEffect를 사용하면 DOM 변견된 이후 해당 이펙트 함수 실행 (마운트,언마운트시)

state 나 effect 둘다 사용하기전 improt React, {useState,useEffect} form "react"; 를 해주면 된다.

4. useMemo
Memoizde value를 리턱하는 훅

연산작업이 많은 것, 렌더링이 일어나는 동안 실행

5. useCallvack 

useMemodhk 유사한 역할

차이점은 값이 아님 함수를 반환

6. useRef 

래퍼런스를 상용하기 위한 훅

ex) const refContainer = useRef(초기값);

라이프타임 전체에 걸쳐서 유지(마운트 해제전까지 유지된다는 말)

7. 훅의 규칙

7.1 무조건 최상의 레벨에서만 호출
7.2 리액트 함수 컴포넌트에서만 훅을 호출

8. 나만의 훅 만들기

커스텀 훅을 만들어야한다.

중간: a4 용지 주고 작업지시서를 작성하는 것(오픈북으로진행)

useCounter.jsx 
```js
import React, {useState} from"react";

function useCounter(initialValue){
  const[count, setCount] = useState(initialValue);

  const increaseCount = () => setCount((cont) => count + 1);
  const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));

  retrun [count, increaseCount, decreaseCount];
}

export default useCounter;
```

Accommodate.jsx 
```js
import React, { useState, useEffect } from "react";
import useCounter from "./useCounter";

const MAX_CAPACITY = 10;

function Accommodate(props) {
    const [isFull, setIsFull] = useState(false);
    const [count, increaseCount, decreaseCount] = useCounter(0);

    useEffect(() => {
        console.log("======================");
        console.log("useEffect() is called.");
        console.log(`isFull: ${isFull}`);
    });

    useEffect(() => {
        setIsFull(count >= MAX_CAPACITY);
        console.log(`Current count value: ${count}`);
    }, [count]);

    return (
        <div style={{ padding: 16 }}>
            <p>{`총 ${count}명 수용했습니다.`}</p>

            <button onClick={increaseCount} disabled={isFull}>
                입장
            </button>
            <button onClick={decreaseCount}>퇴장</button>

            {isFull && <p style={{ color: "red" }}>정원이 가득찼습니다.</p>}
        </div>
    );
}

export default Accommodate;
```

index.js 에서 할 작업
```js
import Accommodate from './chapter_07/Accommodate'; //추가

<React.StrictMode>
      <Accommodate />   //Accommodate 수정
</React.StrictMode>
```
npm start 하면 작동

---
## 강의날 4/6 6주차
---
5강 컴포넌트 추출

컴포넌트는 기본적으로 하나의 기능만 할 수 있게 하는것이좋다.

chapter_05
comment.jsx 파일 내용
```js
import React from "react";
// css 부분
const styles = {
  wrapper: {
      margin: 8,
      padding: 8,
      display: "flex",
      flexDirection: "row",
      border: "1px solid grey",
      borderRadius: 16,
  },
  imageContainer: {},
  image: {
      width: 50,
      height: 50,
      borderRadius: 25,
  },
  contentContainer: {
      marginLeft: 8,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
  },
  nameText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
  },
  commentText: {
      color: "black",
      fontSize: 16,
  },
};

function Comment(props){
  return(
    <div style={styles.wrapper}>
      <div style={styles.imageContainer}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt="프로필 이미지"
          style={styles.image}
       />
      </div>
      <div style={styles.contentContainer}>
        <span style={styles.nameText}>{props.name}</span>
        <span style={styles.commentText}>{props.comment}</span>
      </div>
    </div>
  )
}

export default Comment;
```
commentList.jsx 파일
```js
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
```
index.js 에서 할 작업
```js
import CommentList from './chapter_05/CommentList'; //추가

<React.StrictMode>
      <CommentList />   //CommentList 수정
</React.StrictMode>
```
npm start 하면 작동

chapter_06
Notification.jsx 파일 내용
```js
import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        border: "1px solid grey",
        borderRadius: 16,
    },
    messageText: {
        color: "black",
        fontSize: 16,
    },
};

class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        console.log(`${this.props.id} componentDidMount() called.`);
    }

    componentDidUpdate() {
        console.log(`${this.props.id} componentDidUpdate() called.`);
    }

    componentWillUnmount() {
        console.log(`${this.props.id} componentWillUnmount() called.`);
    }

    render() {
        return (
            <div style={styles.wrapper}>
                <span style={styles.messageText}>{this.props.message}</span>
            </div>
        );
    }
}

export default Notification;
```
NotificationList.jsx 파일내용
```js
import React from "react";
import Notification from "./Notification";

const reservedNotifications = [
    {
        id: 1,
        message: "안녕하세요, 오늘 일정을 알려드립니다.",
    },
    {
        id: 2,
        message: "점심식사 시간입니다.",
    },
    {
        id: 3,
        message: "이제 곧 미팅이 시작됩니다.",
    },
];

var timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
        };
    }

    componentDidMount() {
        const { notifications } = this.state;
        timer = setInterval(() => {
            if (notifications.length < reservedNotifications.length) {
                const index = notifications.length;
                notifications.push(reservedNotifications[index]);
                this.setState({
                    notifications: notifications,
                });
            } else {
                this.setState({
                    notifications: [],
                });
                clearInterval(timer);
            }
        }, 1000);
    }

    componentWillUnmount() {
        if (timer) {
            clearInterval(timer);
        }
    }

    render() {
        return (
            <div>
                {this.state.notifications.map((notification) => {
                    return (
                        <Notification
                            key={notification.id}
                            id={notification.id}
                            message={notification.message}
                        />
                    );
                })}
            </div>
        );
    }
}

export default NotificationList;
```
index.js 에서 할 작업
```js
import NotificationList from './chapter_06/NotificationList'; //추가

<React.StrictMode>
      <NotificationList />   //NotificationList 수정
</React.StrictMode>
```

npm start 하면 작동

ReactDeveloper tools 크롬으로 다운
하면 npm start 후  웹창(npm web 창에서만 가능)에서 검사(F12) 버튼 누른 후 엘리먼트 옆 표시에서 ReactDeveloper tools 기능을 실행 가능하다. 


---
## 강의날 3/30 5주차
---
#### 클론파일할려면 폴더 안에 .git 이 있는 폴더에 하는 것이 아닌 아무것도 작업을 안한 오픈폴더에 할것 , 클론 주소를 위에 창에 붙여 넣기 해야됨

### 4장
1. 엘리먼트 요소

엘리먼트란 리액트 앱의 가장 작은 빌딩 블록들

2. 엘리먼트 생김새

트리구조 헤더,바디(바디안에는 div , button 등 점점 세분화되어 내려간다.)

3. 리액트를 쓸때는 js 사용하는 거처럼 그대로 사용하지말 것

type > button(종류) props > color(색속성),children(내용속성)

4. 파일이름을 커포넌트로 해야되서 다른 종류끼리는 분류를 해 주어야 한다.

5. 엘리먼트 특징 : 불변성(한번 생선된 엘리먼트의 children이나 속성을 바꿀 수 없음)

만약 내용을 바꿀려면 컴포넌트를 통해 새로운 엘리먼트를 생성하면 됌(교체하는 작업하기 위해 Virtual DOM을 사용)

6. 엘리먼트 렌더링하기 
```js
<div id="root"></div>
```
리액트에 필수로 들어가는 중요한 코드 
```js
Root DOM node const element = <h1> 안녕, 리액트 </h1>;
```
렌더링하는 함수

```js
ReactDOM.render(element, document.getElementById('root')); 
```

7. 실전

jsx 파일을 만들고 임포트 익스포트를 하면 index.js 에서 <> 안에 사용할 jsx 파일 이름을 넣으면 jsx 파일이 사용 됌(?)

8. 요약
엘리먼트 정의, 생김새, 특징

엘리먼트 렌더링과 컴포넌트

Clock.jsx 파일
```js
import React from "react";

function Clock(){ 
  const element = (
    <div>
      <h1>안녕, 리액트!</h1>
      <h2>현재 시간: {new Date().toLocaleTimeString()}</h2>
    </div>
  );
}
export default Clock;
```
Clock.html 파일
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <script type="text/babel"> //function 기능 이나 js 스크립트 기능을 html 파일에서 사용할때 <script>로 열어서 사용 할 것
    function tick(){
        const element = (
          <div>
            <h1>안녕, 리액트!</h1>
            <h2>현재 시간: {new Date().toLocaleTimeString()}</h2>
          </div>
        );

        ReactDOM.render(element, document.getElementById('root'));
      }

      setInterval(tick, 1000); // 1초마다 tick 함수를 사용
  </script>
  <div id="root"></div>  <!--루트는 스크립트 밖에서 사용하기-->
  
  
</body>
</html>
```
index.js 에서 할 작업
```js
import Clock from './chapter_04/Clock'; //추가

<React.StrictMode>
      <Clock />   //Clock으로 수정
</React.StrictMode>
```

npm start 하면 작동

###5장
1. 2장에서 말했다 시피 리액트는 컴포넌트 기반

컴포넌트는 재사용이 가능하기 때문에 전체 코드의 양을 줄일 수 있어 개발시간과 유지보수 비용 감소

다만 입력은 Props 가 담당, 출력은 리액트 엘리먼트의 형태

엘리먼트를 필요한 만큼 만들어 사용한다는 면에서 객체 지향의 개념과 비슷

2. Props의 특징 : 읽기전용 , 변경할 수 없음 ,속성이 다른 엘리먼트를 생성하려면 새로운 Props를 컴포넌트에전달하면됌

3. Pure 함수 vs Impure 함수

Pure 함수는 인수로 받은 정보가 함수 내부에서도 변하지 않는 함수(모든리액트 컴포넌트는 Props에 관해서 Pure 함수 같은 역할 수행)

Imprure 함수는 인수로 받은 정보가 함수 내부에서 변하는 함수

4. Props 사용법

 jsx에서는 key-value 쌍으로 구성
 
 jsx를 사용하지 않고 props 전달방법은 createElement() 함수를 사용
 
 createElement()함수의 두번째 매개변수가 > Props
 
 5.컴포넌트 만들기
 
 컴포넌트는 두종류로 나뉜다 .초기에 사용한 클래스형 컴포넌트, 이후 Hook이라는 개념이나오면서 최근에 많이 사용하는 함수형 컴포넌트
 
 6.컴포넌트 이름
 
 항상 대문자 , 파일이름과 컴포넌트이름 
 

---
## 강의날 3/23 4주차
---
레포지토리를 다 지우고 npc create-reat-app 을 통해 새로운 프로젝트 생성. 작업폴더를 새로 연결해서 레포지토리를 생성했다. 터미널에서 cd [폴더이름] 을 통해 작업폴더로 와서 npm start를 하면 react가 시작된다.

1. JSX(Java Script XML)
 java script에 xml을 추가한 것 ,,ex const 변수명 = html문;

2. JSX 역할과 장점: 가독성 높임(코드가 간결),자바스크립트로 자동변환(createElement), 해킹을 방어

3. JSX 사용법

자바스크립트문법에 xml,html 섞어 사용 

html,xml에 자바스크립트 코들 사용하고 싶다면{} 괄호사용
---
## 강의날 3/16 3주차
---
node js 설치 후 cmd에서 설치 확인(node -v)

리액트의 장점

1. 빠른 업데이트와 렌더링 속도(Virtual DOM)

DOM은 동기식 Virtual DOM은 비동기식 이다.(서버와 클라이언트가 같이 움직이냐 따로 움직이냐)

통채로 움직이는건 DOM , 필요한 부분만 따로 가져오는 것은 Virtual DOM

브라우저 동작원리

![image](https://user-images.githubusercontent.com/116775121/225492298-26f5ebc7-55a7-48be-92b5-13c4fe29813f.png)

일반적인 브라우저 작동원리이다.

2. 컨포넌트 기반 구조

리액트의 모든 페이지는 컴포넌트로 구성, 하나의 컴포넌트는 다른 여러개의 컴포넌트로 조합으로 구성할 수 있음

레고블럭 조립처럼 웹사이트 개발 , 재사용성이 뛰어남

3. 재사용성

반복적인 작업을 줄여주어 생상성 향상 , 유지보수 용이 

재사용성이 가능하려면 해당 모듈의 의존성이 없어야 함

![image](https://user-images.githubusercontent.com/116775121/225494127-9b917820-78c9-45b8-9544-1a24bbd6322d.png)

4. 메타에서 오픈소스 프레적트로 관리하고 있어 계속 발전

5. 활발한 지식공유 & 커뮤니티

6. 모바일 앱 개발가능

리액트 네이티브라는 모바일 환경 UI프레임워크를 사용하면 크로스 플랫폼 모방일 앱을 개발할 수 있음


리액트의 단점

1. 반대한 학습량

2. 높은 상태 관리 복잡도

html.js 실습 예제 해보기

book.jsx 파일
```js
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
```
Library.jsx 파일
```js
import React from "react" //임포트
import Book from "./Book" //Book 컴포넌트 가져다 쓰니까 임포트(상대경로)

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
```
index.js 에서 할 작업
```js
import Library from './chapter_03/Library'; //추가

<React.StrictMode>
      <Library />   //Library 로 수정
</React.StrictMode>
```

새로운 작업폴더에 들어가서 터미널에서 npx create-react-app [폴더이름] 작성하면 install을 시작함
설치가 되면 작업 폴더를 다시 열고 npm start 하면 됌
---
## 강의날 3/9 2주차
---
1. vscode에서git config --global user.email "you@example.com" , git config --global user.name "Your Name" 통해 계정 연결

2. 리액트를 위한 레퍼지토리 만들기

3. 깃허브 레퍼지토리와 vscode를 연결

4. vscode에서 commit과 push 하는 법 배우고 익히기

5. 교재 chapter 0 준비하기(HTML,CSS,JS 개념에 대하여)

  HTML:웹 사이트의 뼈대를 구성하는 테그(single page application)

  CSS: 웹 사이트의 세세한 부분까지의 디자인을 표현

  JS: 동적인 부분 표현

6. 자바스크립트 자세히

다양한 브라우저의 등장(익스플러우러,엣지,크롬)(호환성)
자바 스크립트로 호환성을 극복

이크마스크립트 ES6(ECMA-262) 자바스크립트 윗 단계 인듯하다.

자바스크립트의 자료형

var 중복선언 가능, 재할당가능  let 중복선언 불가능, 재할당 가능  const 중복선언 불가능, 재할당 불가능(상수)

7. 리액트는 자바스크립트완 연결 되어 있다. (강조하시는 이유)

8. JSON 자바스크립트 오브젝트 노티션 style

key : key value

9. 자바스크립트의 연산자 

대입연산자, 산술연산자, 증감 연산자(postfix 방식 (먼저더하기?),prefix 방식(나중에 더하기?))

=== 세개일땐 속성까지 따짐

10. 자바스크립트 함수(함수 공부할때 자세히 잘할것)

function 함수 
Arrow 함수 : 리액트에서는 화살표함수를 많이 씀

