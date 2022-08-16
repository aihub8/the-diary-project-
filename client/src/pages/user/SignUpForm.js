import { useEffect, useRef, useState } from "react";
import $ from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import port from "./../../data/port.json";
import "./../../styles/SignUpForm.css";
import { useCookies } from "react-cookie";

const SignUpForm = ({ signUpData, onChangeSignUpData, setSignUpData }) => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef =useRef(); 
  const rePasswordRef = useRef(); 
  const nameRef = useRef()
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  useEffect(() => {
    if (cookies.userData === undefined) {  //리로딩 되었을 때, 로그인이 안된 상태면 input값에 있는 값들 초기화
      setSignUpData({
        email:"",
        password:"",
        rePassword:"",
        name:""
      })
      //console.log(cookies.userData);
      navigate("/");
    } else {
      //console.log(cookies.userData);
      navigate("/diary/home");
      
    }
  }, []);

  // 이미 프론트에서 띄워져있는 메시지중 백엔드에서 보내온 첫번째 에러메시지를 빨간색으로 바꿔줌 
  const [errorWarning, setErrorWarning] = useState({  
    email:false,
    password : false , 
    rePassword : false , 
    name : false, 
})

  //const [errorMessage, setErrorMessage] = useState(""); //백엔드에서의 errormessage : 일단 사용 안함. 
  
  const [emailErrorMessage, setEmailErrorMesage] = useState("") //이메일은 에러메시지가 달라서 string으로
  const [passwordValid, setPasswordValid]=useState(true)    //비밀번호 유효성 검사 (정규식)
  const [rePasswordValid, setRepasswordValid]=useState(true)  // 비밀번호 확인 유효성 검사 (같은지)
  const [nameValid, setNameValid] = useState(false)   //이름 유효성 검사 
  
  // 1. 이메일 유효성 검사
  const checkEmail = async(email) => {
    var regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/; 
    // 형식에 맞는 경우 true 리턴
    //console.log("이메일 유효성 검사 :: ", regExp.test(email));
    if(regExp.test(email)===true){ //유효함 
      await axios.get(`${port.url}/user/${email}/findEmail`).then(
        (res)=>{console.log(res)
        setEmailErrorMesage("존재하는 이메일입니다") //찾기 성공 => 존재하는 이메일 
        }).catch((e)=>{         //찾기 실패 => 존재하지 않는 거니까 에러 내용에 아무것도 저장 안함 
          setEmailErrorMesage("")
          setErrorWarning({      //다시 에러메시지 없어졌을 대 빨간색 없어짐 
            ...errorWarning,
            email:false
          })       
          console.log(e)})
    }
    else{ //아예 유효 x
      setEmailErrorMesage("유효하지 않는 이메일입니다.")
    }
  };

  // 2. 비밀번호 유효성 검사 
  const checkPassword = (password) => {
    //  8 ~ 10자 영문, 숫자 조합
    //console.log(password)
    var regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,}$/; //정규식 
    
    // 형식에 맞는 경우 true 리턴
    //console.log("비밀번호 유효성 검사 :: ", regExp.test(password));
    if(regExp.test(password)){  //정규식에 들어 맞았을 때 
      setPasswordValid(true)    // 메시지 없애고 
      setErrorWarning({         //빨간색 효과도 초기화 
        ...errorWarning,
        password:false
      }) 
    }
    else{                       //정규식에 안 맞을 때 
    setPasswordValid(false)     //메시지 나오게 함 // 빨간색 효과는 클릭했을 때 나오니 setErrorWarning은 사용 안함.
    }
  };

 //3. 비밀번호 확인 유효성 검사  
  const checkRepassword = (password, rePassword) => {
    console.log(password,rePassword)
   if(password===rePassword){
    setRepasswordValid(true)
    setErrorWarning({
      ...errorWarning,
      rePassword:false
    })  
   }
   else{
    setRepasswordValid(false)
   }
  }
//4. 이름 유효성 검사 
  const checkName = (name) => {
    if(name===""){
      setNameValid(false)
    }
    else{
      setNameValid(true)
      setErrorWarning({
        ...errorWarning,
        name:false
      })
    }
  }
// 클릭했을 때, [백엔드 유효성 검사]
  const onClickSignUpButton = () => {
    var validationValue; //백엔드에서 유효성 검사를 진행 한 후 나온 첫번째 에러의 종류 
    sendSignUpData()
      .then((res) => {
        console.log(res.data);
        alert(res.data.result);
        window.location.reload();
      })
      .catch((e) => {  //백엔드 오류 
        console.log(e.response.data.value); 
        validationValue = e.response.data.value; //에러종류 
        console.log(validationValue) 
        //setErrorMessage(e.response.data.error);
        if(validationValue==="email"){  //1. 에러 종류 : 이메일 
          emailRef.current.focus();
          setErrorWarning({
            ...errorWarning,
            email:true
          })
        }
        else if(validationValue==="password"){  //2. 에러 종류 : 비밀번호 
            passwordRef.current.focus()
            setErrorWarning({
              ...errorWarning,
              password:true
            })
        }
        else if(validationValue==="rePassword") //3. 에러종류 : 비밀번호 확인 
        {
          rePasswordRef.current.focus()
          setErrorWarning({
            ...errorWarning,
            rePassword:true
          })
        }
        else if(validationValue==="name"){    //4. 에러종류: 이름 
          nameRef.current.focus()
          setErrorWarning({
            ...errorWarning,
            name:true
          })
        }
      });
      
  };

  const sendSignUpData = async () => {        //로그인 함수 
    return await axios.post(`${port.url}/user/signUp`, signUpData);
  };



  // 입력했을 때, [프론트 유효성 검사 ]
  const handleEmailChange = (e) => { // 1.이메일 유효성 검사 
    //console.log(e.target.value)
    checkEmail(e.target.value)
  }

  const handlePasswordChange = (e) => { //2. 비밀번호 유효성 검사 
    //console.log(e.target.value)
    checkPassword(e.target.value)
  }

  const handleRepasswordChange = (e) => {  //3. 비밀번호 유효성 검사 
    //console.log(signUpData.password)
    checkRepassword(signUpData.password,e.target.value)
  }

  const handleNameChange = (e) => {       // 4. 이름 유효성 검사 
    checkName(e.target.value)
  }
  return (
    <div className="signUp_form">
      <div>
        <form>
          <div>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
          </div>
          <div>
            <input
              size='30'
              type="email"
              ref={emailRef}
              value={signUpData.email}
              onChange={(e)=>{
                onChangeSignUpData(e)
                handleEmailChange(e)
              }}
              className="siginUp_form-input"
              name="email"
              id="email"
              aria-describedby="emailHelp"
            />
            {/* 이메일 에러 메시지*/}
            <p style={{color:errorWarning['email']?'red':'black'}}>{emailErrorMessage}</p> 
            <div id="emailHelp">
            </div>
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
          <div>
            <input
              size='30'
              type="password"
              value={signUpData.password}
              ref = {passwordRef}
              onChange={(e)=>{
                onChangeSignUpData(e)
                handlePasswordChange(e)
                
              }}
              className="siginUp_form-input"
              name="password"
              id="password"
            />
          </div>
          {/* 비밀번호 에러 메시지 */}
          <p>{passwordValid?(<></>):(<p style={{color:errorWarning['password']?'red':'black'}}>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</p>)}</p>
          <div>
            <label htmlFor="rePassword" className="form-label">
              rePassword
            </label>
          </div>
          <div>
            <input
              size='30'
              type="password"
              value={signUpData.rePassword}
              className="siginUp_form-input"
              name="rePassword"
              id="rePassword"
              ref = {rePasswordRef}
              onChange={(e)=>{
                onChangeSignUpData(e)
                handleRepasswordChange(e)}}
            />
             {/* 비밀번호 확인 에러 메시지 */}
        <p>{rePasswordValid?(<></>):(<p style={{color:errorWarning['rePassword']?'red':'black'}}>비밀번호가 일치하지 않습니다.</p>)}</p>
        </div>
          <div>
            <label htmlFor="name" className="form-label">
              name
            </label>
          </div>
          <div>
            <input
              size='30'
              type="text"
              value={signUpData.name}
              onChange={(e)=>{
                onChangeSignUpData(e)
                handleNameChange(e)
                // checkEmail(signUpData.email)
              }}
              className="siginUp_form-input"
              name="name"
              id="name"
              ref = {nameRef}
            />
             {/* 이름 에러 메시지 */}
             <p>{nameValid?(<></>):(<p style={{color:errorWarning['name']?'red':'black'}}>필수정보입니다.</p>)}</p>
          </div>
          {/* 백엔드 에러메시지인데 안씀 */}
          {/* <div>
            <p className="text-danger" >{errorMessage}</p>
          </div> */}
          <button
            type="button"
            onClick={onClickSignUpButton}
            className="siginUp_form-button"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
