import './App.css';
import {useState} from "react";

function App() {
    let[logo] = useState('ReactBlog')
    let [title , setTitle] = useState(['강남여행','순천여행','미국여행'])
    let [date]=useState('2월 17일 발행');
    let [good,setGood] = useState([0,0,0]);
    let [modal,setModal] = useState(false);
    let [selectedTitle, setSelectedTitle] = useState('');

    return (
      <div className="App">
          <div className="black-nav">
              <h4 style={{"color": "white", "fontSize": "24px"}}>{logo}</h4>
          </div>
          <button onClick={() => {
              let copy = [...title];
              copy.sort();
              setTitle(copy);
          }}>
              가나다 순 정렬
          </button>
          <button onClick={() => {
              let copy = [...title]; // a. 원본 데이터 복사
              copy[0] = '여자코트 추천'; // b. 복사한 데이터 값 변경
              setTitle(copy); // c. 변경한 값을 화면에 반영
          }}>
              글수정
          </button>
          {
              title.map(function(i,index){
                  return (
                      <div className="list" key={index}>
                          <div className="wrap">
                              <h4 onClick={() => {
                                  // 이벤트 핸들러의 인자 i는 이벤트 객체로, 이는 React 컴포넌트의 자식 요소로 렌더링될 수 없음.
                                  setSelectedTitle(i);
                                  setModal(!modal);
                              }}>
                                {i}
                              </h4>
                              <span onClick={()=>{
                                  const newGood = [...good]; // a. 원본 데이터 복사
                                  newGood[index] = newGood[index] + 1; // b. 복사한 데이터 값 변경
                                  setGood(newGood); // c. 변경한 값을 화면에 반영
                              }
                              }>👍</span>{ good[index] }
                          </div>
                          <p>{date}</p>
                      </div>
                  )
              })
          }
          {modal === true ? <Modal color={'yellow'} selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle}/> : null}
      </div>
    );
}

function Modal(props) {
    return (
        <>
            <div className="modal" style={{background:props.color}}>
                <h4>{props.selectedTitle}</h4>
                <p>상세</p>
                <p>상세내용</p>
                <button onClick={()=>{
                    let copy = '여자 코트 추천';
                    props.setSelectedTitle(copy);
                    /* props.글제목변경(['여자코트 추천','강남 맛집소개','파이선 독학'])
                    *
                    * */
                }}>글수정</button>
            </div>
        </>
    )
}

export default App
/* [강의내용 정리] */
/* 1. useState사용법
* -  기존 state가 array나 object일 경우 복사를 해서 사용해야 함.(원본은 저장하는게 필요) => shallow copy,deep copy
* - ...이란? 괄호를 벗겨주세요 array/object 담은 변수엔 화살표만 저장됨
* - 값이 변경되어 화면에 반영되어야 할 경우에, 참조하는 곳이 달라져야 변경되었다고 인지하기에 복사에서 사용하는듯.
*
* 2. 컴포넌트 문법
* - function 다른 함수 바깥에 만들어야 함
* - 반복적인 html 축약할때, 큰 페이지들, 자주변경되는 것들을 컴포넌트화 시킬때 장점이 존재
* - const 로 만들경우 : 수정하면 error 메시지 표시해줘서 굿
* - 단점: state를 가져다쓸 때 문제가 생김: A함수에 있던 변수는 B함수에서 맘대로 가져다 쓸 수 없음.
*
* 3. 동적인 UI 만들기
* - html.css 미리 디자인 완성
* - UI의 현재 상태를 state로 저장
* - state에 따라 UI가 어떻게 보일지 작성(조건문 등으로)
*
* 4. 함수형으로 만들경우 : 모든 변수는 함수 탈출 불가
*
* 5. 부모와 자식 관계
* - App 부모 컴포넌트 , Modal 자식 컴포넌트
* - 부모가 가진 state를 props를 통해 자식이 사용가능
*
* 5-1. props를 사용하고 싶다면 state를 전송하면 됨.
* - 자식 컴포넌트로 가서 아래 처럼 작명 / props.작명 사용
* - <자식컴포넌트 작명={state이름}>
* - 옆집, 자식 -> 부모로는 전송할 수 있음
* - props로도 일반 문자 전송가능 : "yellow"
* 단점: 컴포넌트가 많아지면 props쓰는게 귀찮아 질 수 있음.
* prop으로 사용하기 위해서는 사용하는 자식 컴포넌트에서 불러와야 함.
* */