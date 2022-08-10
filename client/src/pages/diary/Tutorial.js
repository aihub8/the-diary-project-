import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import axios from 'axios'
import url from './../../data/port.json'
const getPapago = () => {
  axios.get(url.url+'/translate')
  .then(res=>console.log(res.data.message.result.translatedText))
  .catch(e=>console.log(e)); 
}





>>>>>>> 93f7039e84acf9834f9c0b0de96550138a7f05ad
=======
import styled from "styled-components";
import DiaryBody from "../../components/DiaryBody";
// import diarybodyImg from "./../img/diary_body.png";
// import RabbitKv from "./../../img/DiaryRabbitKV.svg";

>>>>>>> 81bbd38ebf15f70dcf7673fc41509c00ac422bc8
const Tutorial = () => {
  const navigate = useNavigate();
  //view를 변경하기 위한 유즈스테이트
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      console.log(cookies);
    }
  }, [cookies]);
<<<<<<< HEAD
<<<<<<< HEAD
  return <div>튜토리얼 페이지입니다</div>;
=======
  return (
    <div>
  <div>튜토리얼 페이지입니다</div>
  <button onClick={getPapago}>버튼</button>
  </div>);
>>>>>>> 93f7039e84acf9834f9c0b0de96550138a7f05ad
=======
  return (
    <MainWrapper>
      <PageWrap>
        <DiaryBar></DiaryBar>

        <DiaryPageBg1>
          <DiaryPageBg2>
            <DiaryPage>
              <DiaryBookmark></DiaryBookmark>
              <DiaryRabbitKV></DiaryRabbitKV>
            </DiaryPage>
          </DiaryPageBg2>
        </DiaryPageBg1>

        <DiaryNav>
          <PostItNav>
            <DiaryNav1></DiaryNav1>
            <DiaryNav2></DiaryNav2>
            <DiaryNav3></DiaryNav3>
            <DiaryNav4></DiaryNav4>
          </PostItNav>

          <DiaryHandleContainer>
            <DiaryHandle></DiaryHandle>
          </DiaryHandleContainer>
        </DiaryNav>
      </PageWrap>
    </MainWrapper>
  );
>>>>>>> 81bbd38ebf15f70dcf7673fc41509c00ac422bc8
};

const MainWrapper = styled.div`
  @media screen and (max-width: 1799px) {
    /* 데스크탑 */
  }
  @media screen and (min-width: 1300px) {
    /* 데스크탑 */
  }
  @media screen and (max-width: 1199px) {
    /* 타블렛 가로 */
  }
  @media screen and (max-width: 899px) {
    /* 모바일 가로, 타블렛 세로 */
  }

  @media screen and (max-width: 599px) {
    /* 모바일 세로 */
  }
  width: 100%;
  height: 100vh;
  background: #ece6cc;
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
  margin-top: 80px;
  margin: 80px;
  width: 80%;
  height: 70%;
`;
const DiaryBar = styled.div`
  margin-left: 0;
  width: 10%;
  height: 100%;
  background: #774a20;
  border-radius: 0px;
`;
const DiaryPageBg1 = styled.div`
  border: 1px solid #000000;
  margin-left: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    #dac0a9;
  border-radius: 0px 50px 0px 0px;
`;
const DiaryPageBg2 = styled.div`
  border: 1px solid #000000;
  margin-left: 0;
  margin-top: 1%;
  width: 99%;
  height: 99%;
  background: #d9d9d9;
  border-radius: 0px 50px 0px 0px;
`;
const DiaryPage = styled.div`
  margin-left: 0;
  margin-top: 2%;
  width: 98%;
  height: 98%;
  background: #fffdfd;
  border-radius: 0px 50px 0px 0px;
`;

const DiaryBookmark = styled.div`
  /* border: 1px solid #000000; */
  display: absolute;
  background: #bc9f84;
  top: 0;
  margin-left: 80%;
  width: 10%;
  height: 20%;
`;
const DiaryRabbitKV = styled.div`
  /* border: 1px solid #000000; */
  display: absolute;

  /* background: #bc9f84; */
  width: 25%;
  height: 20%;
  margin-left: 70%;
  /* top: -70%; */
  margin-top: 60%;
  z-index: 9999;
  background-image: url("./../../img/DiaryRabbitKV.png");
`;
const DiaryNav = styled.div`
  /* border: 1px solid #000000; */
  margin-left: 0;
  width: 30%;
  height: 100%;
  background: transparent;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const PostItNav = styled.div`
  /* border: 1px solid #000000; */
  height: 70%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: space-between;

  padding-left: 0px;
  padding-right: 20px;
`;
const DiaryNav1 = styled.div`
  margin-top: 40%;
  width: 90%;
  height: 20%;
  background: #afe783;
`;
const DiaryNav2 = styled.div`
  width: 80%;
  height: 20%;
  background: #ed6068;
`;
const DiaryNav3 = styled.div`
  width: 90%;
  height: 20%;
  background: #cd83e7;
`;
const DiaryNav4 = styled.div`
  width: 80%;
  height: 20%;
  background: #83abe7;
`;
const DiaryHandleContainer = styled.div`
  /* border: 1px solid #000000; */
  height: 30%;
  width: 60%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: space-between;
`;

const DiaryHandle = styled.a`
  margin-top: 20%;
  width: 70%;
  height: 70%;
  background: #774a20;
  border-radius: 50px 0px 0px 50px;
  transform: rotate(180deg);
`;
export default Tutorial;
