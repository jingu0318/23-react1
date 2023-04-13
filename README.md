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
두개 파일 작업후 index.js 에 import CommentList from './chapter_05/CommentList'; 문장 추가 후 <CommentList />  변환 하면 npm start 구현 가능

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
변경 후 index.js 파일에 import NotificationList from './chapter_06/NotificationList'; 문장 추가 후 <NotificationList /> 으로 변경 하면 npm start 가능 

ReactDeveloper tools 크롬으로 다운
하면 npm start 후  웹창(npm web 창에서만 가능)에서 검사(F12) 버튼 누른 후 엘리먼트 옆 표시에서 ReactDeveloper tools 기능을 실행 가능하다. 


# 23-React1 이진구 
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

<div id="root"></div> 리액트에 필수로 들어가는 중요한 코드 > Root DOM node

const element = <h1> 안녕, 리액트 </h1>;

ReactDOM.render(element, document.getElementById('root')); >렌더링하는 함수

7. 실전

jsx 파일을 만들고 임포트 익스포트를 하면 index.js 에서 <> 안에 사용할 jsx 파일 이름을 넣으면 jsx 파일이 사용 됌(?)

8. 요약
엘리먼트 정의, 생김새, 특징

엘리먼트 렌더링과 컴포넌트

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

