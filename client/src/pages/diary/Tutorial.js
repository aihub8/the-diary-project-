import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import url from './../../data/port.json'
const getPapago = () => {
  axios.get(url.url+'/translate')
  .then(res=>console.log(res.data.message.result.translatedText))
  .catch(e=>console.log(e)); 
}





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
    <div>
  <div>튜토리얼 페이지입니다</div>
  <button onClick={getPapago}>버튼</button>
  </div>);
};

export default Tutorial;
