import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUserLoginDataDetails } from "./../app/reducer/userSlice";

const DiaryNav = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const dispatch = useDispatch(); //action을 사용하기위해 보내주는 역할
  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      console.log(cookies.userData);
      navigate("/diary/home");
    }
  }, [cookies]);

  console.log(cookies.userData);
  //--------------kakao oauth
  const REST_API_KEY = "7d3a56396c0500b913cedacc843ff47a"; //보통은 이런 고유 상수키값은 어떻게 관리하는지, 따로 lock을 걸어두는지. 이게 .env인지.물어볼것
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_OAUTH_URI = `https:/kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onClickLogin = () => {
    dispatch(
      setUserLoginDataDetails({
        isLoginPg: true,
        isSignUpPg: false,
      })
    );
    navigate("/");
  };

  const onClickSignUp = () => {
    dispatch(
      setUserLoginDataDetails({
        isLoginPg: false,
        isSignUpPg: true,
      })
    );
    navigate("/");
  };
  return (
    <Wrapper>
      {" "}
      {cookies.userData ? (
        <>
          <PostItNav1>
            <DiaryNav1 onClick={() => navigate("/")}>메인</DiaryNav1>
            <DiaryNav2 onClick={() => navigate("/diary/write")}>
              일기쓰기
            </DiaryNav2>
            <DiaryNav3 onClick={() => navigate("/diary/tutorial")}>
              튜토리얼
            </DiaryNav3>
            <DiaryNav4 onClick={() => navigate("/diary/other")}>
              남의글
            </DiaryNav4>
          </PostItNav1>
          <DiaryHandleContainer>
            <DiaryHandle>
              <a
                onClick={() => {
                  removeCookie("userData", { path: "/" });
                  navigate("/");
                }}
              >
                LogOut
              </a>
            </DiaryHandle>
          </DiaryHandleContainer>
        </>
      ) : (
        <PostItNav2>
          <LoginNav onClick={onClickLogin}>Login</LoginNav>
          <KaKaoLoginNav>
            <a href={KAKAO_OAUTH_URI}>&nbsp;&nbsp;&nbsp; Login with Kakao</a>
          </KaKaoLoginNav>
          <SignUpNav onClick={onClickSignUp}> signUp</SignUpNav>
        </PostItNav2>
      )}
    </Wrapper>
  );
};

export default DiaryNav;
const Wrapper = styled.div`
  border: 1px solid #000000;
  margin-left: 0;
  width: 30%;
  height: 100%;
  background: transparent;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 15px;
  font-weight: bold;
  a {
    color: white;
  }
  z-index: -1;
`;

const PostItNav1 = styled.div`
  /* border: 1px solid #000000; */
  margin-top: 25%;
  height: 80%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-left: 0px;
  padding-right: 20px;
  letter-spacing: 1.42px;
  line-height: 1.08;
  a {
    text-decoration: none !important;
  }
`;
const PostItNav2 = styled.div`
  /* border: 1px solid #000000; */
  margin-top: 40%;
  height: 80%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 0px;
  padding-right: 20px;
  align-items: center;
  letter-spacing: 1.42px;
  line-height: 1.08;
  a {
    text-decoration: none !important;
  }
  /* a:hover {
    text-decoration: none !important;
  } */
  /* z-index: -1; */
`;

const DiaryNav1 = styled.a`
  width: 70%;
  height: 7%;
  background: #afe783;
  padding: 20%;
  color: white;
  transition: all 0.2% ease 0.5s;
  &:hover {
    background: #80d83a;
    opacity: 1;
  }
`;
const DiaryNav2 = styled.a`
  width: 70%;
  height: 7%;
  background: #ffb1ae;
  padding: 20%;
  &:hover {
    background: #ed6068;
    opacity: 1;
  }
`;
const DiaryNav3 = styled.a`
  width: 70%;
  height: 7%;
  background: #cd83e7;
  padding: 20%;
  &:hover {
    background: #bb3de7;
    opacity: 1;
  }
`;
const DiaryNav4 = styled.a`
  width: 70%;
  height: 7%;
  background: #83abe7;
  padding: 20%;
  &:hover {
    background: #528de7;
    opacity: 1;
  }
`;

const LoginNav = styled.button`
  width: 100%;
  height: 15%;
  background: #4fed4c;
  margin-bottom: 10px;
  margin-left: 0%;
  padding-left: 0%;
  padding-top: 10%;
  text-align: center;
  border: none;
`;
const KaKaoLoginNav = styled.div`
  background: #fee500;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    width: 100%;
  }
  margin-left: 0%;
  padding-left: 0%;
`;
const SignUpNav = styled.button`
  width: 100%;
  height: 15%;
  background: #2461ff;
  margin-bottom: 10px;
  margin-left: 0%;
  padding-left: 0%;
  padding-top: 10%;
  text-align: center;
  border: none;
`;
const DiaryHandleContainer = styled.div`
  /* border: 1px solid #000000; */
  height: 20%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* justify-content: space-between; */
`;

const DiaryHandle = styled.div`
  margin-top: 20%;
  width: 70%;
  height: 70%;
  background: #774a20;
  border-radius: 0px 50px 50px 0px;
  padding: 10%;
  align-items: center;
  /* img {
    width: 100%;
    transform: rotate(180deg);
  } */
  box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
  &:hover {
    background: #492a0d;
    opacity: 1;
  }
`;
