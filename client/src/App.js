import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
//Redux
import Store from "./app/Store";
import { Provider } from "react-redux";

//components
import Login from "./pages/Login";
import Tutorial from "./pages/diary/Tutorial";
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

import bgImg from "./img/main_bg_2.svg";
import LoginNew from "./pages/LoginNew";
// import bgImg from "./img/Rectangle_25.png";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  console.log(cookies.userData);
  function toggleDarkMode() {
    console.log(" toggleDarkMode");
    setDarkMode((preMode) => !preMode);
  }
  return (
    <Provider store={Store}>
      <Router>
        <MainWrapper color={darkMode ? "#ECE6CC" : "#ECE6CC"}>
          <PageWrap>
            {/* {cookies.userData ? <DiaryBar /> : <></>} */}
            <DiaryBar />
            <div className="diaryMain__Page">
              <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="/" element={<LoginNew />} />
                <Route path="oauth">
                  <Route path="kakao/callback" element={<KakaoCallBack />} />
                  <Route path="signUp" element={<SocialSignup />} />
                </Route>
                <Route path="diary">
                  {/** 첫로그인후 메인 home */}
                  <Route path="home" element={<Home />} />
                  {/** 일기장 작성 튜토리얼 페이지 */}
                  <Route path="tutorial" element={<Tutorial />} />
                  {/**글작성 */}
                  <Route path="dali" element={<Dali />} />
                  {/**달리 */}
                  <Route path="write" element={<DiaryCreate />} />
                  <Route path="diaryList" element={<DiaryList />} />{" "}
                  <Route path=":id">
                    <Route path="diaryView" element={<DiaryView />} />{" "}
                    {/* url -> http://localhost:3000/review/:id/detail */}
                    <Route path="diaryUpdate" element={<DiaryUpdate2 />} />{" "}
                    {/* url -> http://localhost:3000/review/:id/update */}
                  </Route>
                </Route>
              </Routes>
            </div>
            <DiaryNav />
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
  background-color: ${(props) => props.color || "#ECE6CC"};
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

export default App;
