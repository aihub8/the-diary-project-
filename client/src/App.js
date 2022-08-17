import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
//Redux
import Store from "./app/Store";
import { Provider } from "react-redux";

//components
import Login from "./pages/Login";
// import Tutorial from "./pages/diary/Tutorial";
import Dali from "./pages/diary/Dali";
import Home from "./pages/Home";

//social
import KakaoCallBack from "./pages/user/KakaoCallBack";
import SocialSignup from "./pages/user/SocialSignup";

//pages
import DiaryCreate from "./pages/diary/DiaryCreate";
import DiaryView from "./pages/diary/DiaryView";
import DiaryUpdate2 from "./pages/diary/DiaryUpdate2";
import DiaryList from "./pages/diary/DiaryList";
import styled from "styled-components";
import DiaryNav from "./components/DiaryNav";
import DiaryBar from "./components/DiaryBar";

// modal
// import Modal from "./pages/diary/Modal";
// import RabbitKv from "./img/DiaryRabbitKV.svg";

import { useState } from "react";
import TutorialModal from "./pages/diary/TutorialModal";

function App() {

  //modal
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [darkMode, setDarkMode] = useState(false);
  function toggleDarkMode() {
    console.log(" toggleDarkMode");
    setDarkMode((preMode) => !preMode);
  }
  return (
    <Provider store={Store}>
      <Router>
      
        <MainWrapper color={darkMode ? "#ffeace" : "#ffeace"}>
          <Routes>
            <Route path="*" element={<TutorialModal />} id="tutorialModalId" />  
          </Routes>
          <PageWrap>
          <DiaryNav />
            <DiaryBar />
            <DiaryPageBg1>
              <DiaryPageBg2>
                <DiaryPage>
                  <Routes>
                    
                    <Route path="/" element={<Login />} />
                    <Route path="oauth">
                      <Route
                        path="kakao/callback"
                        element={<KakaoCallBack />}
                      />
                      <Route path="signUp" element={<SocialSignup />} />
                    </Route>
                    <Route path="diary">
                      {/** 첫로그인후 메인 home */}
                      <Route path="home" element={<Home />} />
                      {/** 일기장 작성 튜토리얼 페이지 */}
                      {/* <Route path="tutorial" element={<Tutorial />} /> */}
                      {/**글작성 */}
                      <Route path="dali" element={<Dali />} />
                      {/**달리 */}
                      <Route path="write" element={<DiaryCreate />} />
                      <Route path="diaryList" element={<DiaryList />} />{" "}
                      <Route path=":id">
                        <Route path="diaryView" element={<DiaryView />} />{" "}
                        {/* url -> http://localhost:3000/diary/:id/DiaryView */}
                        <Route
                          path="diaryUpdate"
                          element={<DiaryUpdate2 />}
                        />{" "}
                        {/* url -> http://localhost:3000/review/:id/update */}
                      </Route>
                    </Route>
                  </Routes>
                  {/* <DiaryRabbitKV>
                    <DiaryRabbitButton onClick={openModal} >
                    <img src={RabbitKv}/>
                    </DiaryRabbitButton>
                    <Modal open={modalOpen} close={closeModal} header="Modal heading" />
                  </DiaryRabbitKV> */}
                </DiaryPage>
              </DiaryPageBg2>
            </DiaryPageBg1>

          </PageWrap>
        </MainWrapper>
      </Router>
    </Provider>
  );
}

const MainWrapper = styled.div`
  /* border: 1px solid #000000; */
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.color || "#ffeace"};
  background-size: cover;
  display: flex;
  justify-content: center;
  z-index: 1;
  padding: 0;
  margin: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
`;

const PageWrap = styled.div`
  /* border: 1px solid #000000; */
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: space-between;
  width: 80%;
  height: 100%;
  padding-top: 80px;
  z-index: 2;
  overflow: hidden;
`;

const DiaryPageBg1 = styled.div`
  /* border: 1px solid #000000; */
  margin-left: 0;
  position: relative;
  width: 80%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    #dac0a9;
  border-radius: 0px 50px 0px 0px;
  box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
`;
const DiaryPageBg2 = styled.div`
  /* border: 1px solid #000000; */
  position: relative;
  margin-left: 0;
  /* margin-top: 1%; */
  top: 0%;
  margin: 0;
  width: 100%;
  height: 98%;
  margin-bottom: 0%;
  bottom: 0%;
  background: #d9d9d9;
  border-radius: 0px 50px 0px 0px;
`;
const DiaryPage = styled.div`
  /* border: 1px solid #000000; */
  margin-left: 0;
  margin-top: 2%;
  margin-bottom: 0%;
  bottom: 0%;
  width: 97%;
  height: 100%;
  background: #fffdfd;
  border-radius: 0px 50px 0px 0px;
  /* padding: 20px; */
`;
//modal style css
// const DiaryRabbitKV = styled.div`
//   // border: 1px solid #000000;
//   // display: absolute;
//   // display: flex;
//   // flex-direction: column;
//   // justify-content: flex-start;
//   /* background: #BC9F84; */
//   // width: 25%;
//   // height: 20%;
//   // top: 80%;
//   // z-index: 9999;
//   // img {
//   //   width: 100%;
//   // }
// `;
// const DiaryRabbitButton = styled.button`
//   border: 0;
//   outline: 0;
//   cursor: pointer;
//   //버튼색 투명하게
//   background-color:transparent;
//   position: absolute;
//   width: 17%;
//   // height: 300px; width값에 자동으로 원본 사이즈 조정
//   // top: 69%; 우리 다이어리 웹의 기준이 바닥에 있기 때문에 반응형을 바닥을 중심으로 잡았다.
//   bottom: 1%;
//   left: 75%;
//   // z-index: 9999;
//   img {
//     width: 100%;
//     height: 100%
//   }
// `

export default App;
