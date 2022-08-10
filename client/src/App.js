import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
import RabbitKv from "./img/DiaryRabbitKV.svg";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <MainWrapper>
          <PageWrap>
            <DiaryBar />
            <DiaryPageBg1>
              <DiaryPageBg2>
                <DiaryPage>
                  {/* <DiaryBookmark></DiaryBookmark> */}
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
                      <Route path="tutorial" element={<Tutorial />} />
                      {/**글작성 */}
                      <Route path="dali" element={<Dali />} />
                      {/**달리 */}
                      <Route path="write" element={<DiaryCreate />} />
                      <Route path="diaryList" element={<DiaryList />} />{" "}
                      <Route path=":id">
                        <Route path="diaryView" element={<DiaryView />} />{" "}
                        {/* url -> http://localhost:3000/review/:id/detail */}
                        <Route
                          path="diaryUpdate"
                          element={<DiaryUpdate2 />}
                        />{" "}
                        {/* url -> http://localhost:3000/review/:id/update */}
                      </Route>
                    </Route>
                  </Routes>

                  <DiaryRabbitKV>
                    <img src={RabbitKv} alt="" />
                  </DiaryRabbitKV>
                </DiaryPage>
              </DiaryPageBg2>
            </DiaryPageBg1>
            <DiaryNav />
          </PageWrap>
        </MainWrapper>
      </Router>
    </Provider>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffeace;
  background-size: cover;
  display: flex;
  justify-content: center;
`;

const PageWrap = styled.div`
  /* border: 5px solid #000000; */
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: space-between;
  width: 80%;
  height: 100vh;
  padding-top: 80px;
`;

const DiaryPageBg1 = styled.div`
  /* border: 1px solid #000000; */
  margin-left: 0;
  width: 65%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    #dac0a9;
  border-radius: 0px 50px 0px 0px;
  box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
`;
const DiaryPageBg2 = styled.div`
  /* border: 1px solid #000000; */
  margin-left: 0;
  width: 99%;
  height: 100%;
  background: #d9d9d9;
  border-radius: 0px 50px 0px 0px;
`;
const DiaryPage = styled.div`
  margin-left: 0;
  margin-top: 1%;
  width: 98%;
  height: 100%;
  background: #fffdfd;
  border-radius: 0px 50px 0px 0px;
  padding: 20px;
`;
// const DiaryBookmark = styled.div`
//   /* border: 1px solid #000000; */
//   display: absolute;
//   background: #bc9f84;
//   top: 0;
//   margin-left: 80%;
//   width: 10%;
//   height: 20%;
// `;
const DiaryRabbitKV = styled.div`
  border: 1px solid #000000;
  display: absolute;

  /* background: #bc9f84; */
  width: 25%;
  height: 20%;
  top: 80%;
  z-index: 9999;
  img {
    width: 100%;
  }
`;

export default App;
