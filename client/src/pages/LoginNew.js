import React from "react";
import { useEffect, useState } from "react";
import SignInForm from "./user/SignInForm";
import SignUpForm from "./user/SignUpForm";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loginMain__Page from "./../img/login_new.svg";
import Login from "./Login";
import RabbitKVSrc from "./../img/DiaryRabbitKV.svg";
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
          <AiDiaryBox>
            <RabbitKv>
              <img src={RabbitKVSrc} />
            </RabbitKv>
            <AiText>ai-diary</AiText>
            <BottomThreeLines />
            <BottomThreeLines />
            <BottomThreeLines />
          </AiDiaryBox>
        </LoginNewFixedKV>
        <Login />
        <DiaryHandleContainer2 />
        <DiaryHandleContainer3 />
      </Temp>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border: 2px solid red; */
  border-radius: 2.5em;
  background: #836a54;
  box-shadow: inset 5px 5px 8px #735d4a, inset -5px -5px 8px #93775e;
  position: relative;
  margin-left: -7.8125em;
  margin-top: -2.25em;
  margin-bottom: 0;
  padding: 0;
  bottom: 0%;
  width: 110%;
  height: 110vh;
  z-index: 9998;
`;

const Temp = styled.div`
  /* border: 2px solid orange; */
  position: absolute;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
`;
const LoginNewFixedKV = styled.div`
  /* border: 2px solid yellow; */
  position: absolute;
  width: 60em;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: absolute; */
  /* flex-direction: column;
  justify-content: center;
  align-items: center; */
`;
const RabbitKv = styled.div`
  /* border: 1px solid brown; */
  position: absolute;

  width: 5em;
  margin-left: -28.125em;
  margin-top: -9.375em;
  img {
    width: 100%;
  }
`;
const AiDiaryBox = styled.div`
  /* border: 1px solid blue; */

  width: 28.125em;
  height: 18em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-left: 18.75rem; */
  /* margin-top: 4.375em; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
`;

const AiText = styled.div`
  width: 100%;
  height: 10rem;
  border-radius: 0px;
  background: #d9d9d9;
  box-shadow: inset 5px 5px 10px #bbbbbb, inset -5px -5px 10px #f7f7f7;
  font-size: 6rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* margin: auto; */
`;
const BottomThreeLines = styled.div`
  margin-top: 0.625em;
  width: 100%;
  height: 3%;
  background-color: #d9d9d9;
`;

const DiaryHandleContainer2 = styled.div`
  /* border: 1px solid #000000; */
  position: absolute;
  width: 21.875em;
  height: 15em;
  margin-top: 25em;
  /* margin-left: 30px; */
  right: -0px;
  /* z-index: 9999; */
  background: #774a20;
  /* display: inline; */
  border-radius: 3.125em 0em 0em 3.125em;
  a {
    width: 70%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #774a20;
    border-radius: 0em 3.125em 3.125em 0em;
    box-shadow: rgb(0 0 0/50%) 0em 0em 1.125em 0em;
    &:hover {
      background: #492a0d;
      opacity: 1;
    }
  }
`;
const DiaryHandleContainer3 = styled.div`
  /* border: 1px solid #000000; */
  position: absolute;
  width: 2.1875em;
  height: 15em;
  margin-top: 25em;
  /* display: inline-block; */
  /* margin-left: 30px; */
  /* left: 1000px; */
  right: -2.0625em;
  /* z-index: 9999; */
  background: #5f462f;
`;
//background: #5F462F;
export default LoginNew;
