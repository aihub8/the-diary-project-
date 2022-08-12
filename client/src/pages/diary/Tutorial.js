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
<<<<<<< HEAD
import url from "./../../data/port.json";
import "./../../styles/Tutorial.css";
=======
import DiaryBody from "../../components/DiaryBody";
// import diarybodyImg from "./../img/diary_body.png";
// import RabbitKv from "./../../img/DiaryRabbitKV.svg";

>>>>>>> 81bbd38ebf15f70dcf7673fc41509c00ac422bc8
>>>>>>> efeea0ddee03b2603956923056f67988ec11ba29
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
  return <div className="tutorial">튜토리얼입니다</div>;
=======
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
>>>>>>> efeea0ddee03b2603956923056f67988ec11ba29
};

export default Tutorial;
