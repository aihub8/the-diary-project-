import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import url from "./../../data/port.json";
import "./../../styles/Tutorial.css";
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
  return <div className="tutorial">튜토리얼입니다</div>;
};

export default Tutorial;
