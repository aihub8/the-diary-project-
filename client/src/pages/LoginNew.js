import React from "react";
import { useEffect, useState } from "react";
import SignInForm from "./user/SignInForm";
import SignUpForm from "./user/SignUpForm";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loginMain__Page from "./../img/login_new.svg";
import Login from "./Login";
const LoginNew = () => {
  const navigate = useNavigate();
  //view를 변경하기 위한 유즈스테이트
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [view, setView] = useState({
    signIn: false,
    signUp: false,
  });

  // 로그인 입력받을 데이터 props로 넘겨줌
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  //회원가입 입력받을 데이터를 props로넘겨줌
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
  });

  const onChangeSignInData = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSignUpData = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 상태일 때,/diary/home로 리다이렉트
  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      console.log(cookies.userData);
      navigate("/diary/home");
    }
  }, [cookies]);
  return (
    <Wrapper>
      <Temp>
        <LoginNewFixedKV>
          <RabbitKv />
          <AiDiaryBox> aiduary</AiDiaryBox>
          <BottomThreeLines></BottomThreeLines>
        </LoginNewFixedKV>
        <Login />
      </Temp>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border: 1px solid red; */
  /* background-image: url(${loginMain__Page});
  background-size: cover; */
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    #bc9f84;
  border-radius: 1.875em 1.875em 0 1.875em;
  position: relative;
  margin-left: -7.8125em;
  margin-top: -20px;
  margin-bottom: 0;
  padding: 0;
  bottom: 0%;
  width: 110%;
  height: 105%;
  z-index: 9999;
`;

const Temp = styled.div`
  position: absolute;
  padding-left: -7.8125em;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LoginNewFixedKV = styled.div`
  // border: 3px solid blue;
  width: 60em;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RabbitKv = styled.img``;
const AiDiaryBox = styled.div``;
const BottomThreeLines = styled.div``;
export default LoginNew;
