import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
		<TutorialeBox>
			Today
			<TutorialInputBox />
		</TutorialeBox>
		<TutorialeBox>
			Title
			<TutorialInputBox />
		</TutorialeBox>
		<TutorialeBox>
			Tags
			<TutorialInputBox />
		</TutorialeBox>
		<TutorialeBox>
			Contents
			<TutorialInputBoxContents />
		</TutorialeBox>
		<TutorialeBox />
		<TutorialeBox />
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
const TutorialeBox = styled.div`
	height: 10%;
	padding-top: 5% 
`
const TutorialInputBox = styled.div`
	height: 50%;
	width: 45%;
	margin-top: 3%;
	background: #EEE7DB;
`
const TutorialInputBoxContents = styled.div`
	height: 300%;
	width: 45%;
	margin-top: 3%;
	background: #EEE7DB;
`
export default Tutorial;
