import React from "react";
import { useEffect, useState } from "react";
import SignInForm from "./user/SignInForm";
import SignUpForm from "./user/SignUpForm";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loginMain__Page from "./../img/loginMain__Page_2.svg";
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
      <FunctionWrapper>
        <Login />
      </FunctionWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid gray;
  background-image: url(${loginMain__Page});
  background-size: cover;
  position: absolute;
  margin-left: -10%;
  margin-bottom: 0%;
  bottom: 0%;
  width: 110%;
  height: 105%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const FunctionWrapper = styled.div`
  border: 1px solid #000000;
  width: 1000px;
  height: 700px;
  margin-top: 50%;
`;

export default LoginNew;
