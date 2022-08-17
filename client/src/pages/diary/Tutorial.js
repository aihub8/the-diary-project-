import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import RabbitKv from "../../img/DiaryRabbitKV_tuto.svg";
import { keyframes } from "styled-components";


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

  return (
	<TutorialContainer>
	  <TutorialContainer__header>
		<TutorialContainer__left>
			<TutorialBox__left>
				Today
				<TutorialInputBox />
			</TutorialBox__left>

			<TutorialBox__left>
				Title
				<TutorialInputBox  />
			</TutorialBox__left>

			<TutorialBox__left>
				Tags
				<TutorialInputBoxTagsContainer>
					<TutorialInputBoxTags />
					<TutorialInputBoxTags />
					<TutorialInputBoxTags />
					<Tutorial__button />
				</TutorialInputBoxTagsContainer>
			</TutorialBox__left>

			<TutorialBox__left>
				Contents
				<TutorialInputBoxContents />
			</TutorialBox__left>
		</TutorialContainer__left>

		<TutorialContainer__right>
			<TutorialBox__right> 
				<TutorialInputBoxDalle />
				Dalle
			</TutorialBox__right>
		</TutorialContainer__right>

		<TutorialBox__right />
	  </TutorialContainer__header>
		
		<TutorialContainer__footer>
			<Tutorial__button $changeWidth="15%" $changeHeight="5%" />
			<Tutorial__button $changeWidth="15%" $changeHeight="5%" />
		</TutorialContainer__footer>

		<DiaryRabbitKV_tuto>
			<DiaryRabbitButton_tuto >
				<img src={RabbitKv}/>
			</DiaryRabbitButton_tuto >
		</DiaryRabbitKV_tuto>
		
	</TutorialContainer>

    // <div className="tutorial__container">
    //   	<div className="tutorial__container__leftbox">
	// 			<div className="tutorial__today">
	// 			<div className="tutorial__today__blank"></div>
	// 		</div>
	// 		<div className="tutorial__title">
	// 			<div className="tutorial__title__blank"></div>
	// 		</div>
	// 		<div className="tutorial__tags">
	// 			<div className="tutorial__tags__blank"></div>
	// 		</div>
	// 		<div className="tutorial__contents">
	// 			<div className="tutorial__contents__blank"></div>
	// 			<div className="tutorial__contents__button"></div>
	// 		</div>
	// 	</div>
		
	// 	<div className="tutorial__container__rightbox">
	// 		<div className="tutorial__dalle"></div>
	// 		<div className="searchRabbit"></div>
	// 	</div>
	// </div>
  )
};
const TutorialContainer = styled.div`
	argin-left: 0;
	margin-top: 2%;
	margin-bottom: 0%;

	padding-left: 3%;
	bottom: 0%;
	width: 97%;
	height: 100%;
	background: #fffdfd;	
	border-radius: 0px 50px 0px 0px;

`

const TutorialContainer__header = styled.div`
	height: 95%;
	display: flex;
`
const TutorialContainer__left = styled.div`
	width: 49%;
	margin-right: 2%
`
const TutorialContainer__right = styled.div`
	width: 49%;

`


const TutorialBox__left = styled.div`
	height: 10%;
	padding-top: 4%;

	animation: Tutorial__aniRedBox;
	
`
const TutorialBox__right = styled.div`
	height: 10%;
	padding-top: 20%;
	padding-left: 4%; 
	text-align: right;

`
const TutorialInputBox = styled.div`
	height: 50%;
	// width: 45%;
	margin-top: 3%;
	background: #EEE7DB;

`
const TutorialInputBoxTagsContainer = styled.div`
	margin-top: 3%;
	height: 50%;
	display: flex;
	opacity: 1.0;

`
const TutorialInputBoxTags = styled.div`
	// height: 50%;
	width: 20%;
	margin-top: 0%;
	margin-right: 5%;
	background: #EEE7DB;

`
const TutorialInputBoxContents = styled.div`
	height: 300%;
	// width: 45%;
	margin-top: 3%;
	background: #EEE7DB;
`
const TutorialInputBoxDalle = styled.div`

	height: 250%;
	width: 70%;
	margin-top: 3%;
	margin-left: 20%;
	background: #EEE7DB;

	margin-top: 10%
`
const Tutorial__button = styled.div`
	width: ${props => props.$changeWidth || "20%" };
	height: ${props => props.$changeHeight || "" };
	display: inline-block;
	margin-top: 0%;
	margin-right: 5%;
	background: #C1AB86;
	border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
	
`
const TutorialContainer__footer = styled.div`
	height: 95%;
	text-align: center;
`

//modal style css
const DiaryRabbitKV_tuto = styled.div`
  // border: 1px solid #000000;
  // display: absolute;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  /* background: #BC9F84; */
  // width: 25%;
  // height: 20%;
  // top: 80%;
  // z-index: 9999;
  // img {
  //   width: 100%;
  // }
`;
const DiaryRabbitButton_tuto = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;
  //버튼색 투명하게
  background-color:transparent;
  position: absolute;
  width: 23%;
  // height: 300px; width값에 자동으로 원본 사이즈 조정
  // top: 69%; 우리 다이어리 웹의 기준이 바닥에 있기 때문에 반응형을 바닥을 중심으로 잡았다.
  bottom: 1%;
  left: 75%;
  // z-index: 9999;
  img {
    width: 100%;
    height: 100%
  }
`
const Tutorial__aniRedBox = keyframes`

  border: solid #FF0000 5px;
  border-color: red;
  
`



export default Tutorial;
