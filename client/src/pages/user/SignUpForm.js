import { useRef, useState } from "react";
import $ from "react";
import axios from "axios";
import port from "./../../data/port.json";
import "./../../styles/SignUpForm.css";
const SignUpForm = ({ signUpData, onChangeSignUpData, setSignUpData }) => {
  const emailRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  const onClickSignUpButton = () => {
    // if (signUpData.email === "") {
    //   alert("이메일 입력해주세요");
    //   emailRef.current.focus();
    //   return;
    // } else if (signUpData.password === "") {
    //   alert("비밀번호를 입력해주세요");
    //   $("#password").focus();
    //   return;
    // } else if (signUpData.rePassword === "") {
    //   alert("rePassword를 입력해주세요");
    //   $("#rePassword").focus();
    //   return;
    // } else if (signUpData.name === "") {
    //   alert("name를 입력해주세요");
    //   $("#name").focus();
    //   return;
    // } else if (signUpData.password !== signUpData.rePassword) {
    //   alert("비밀번호를 확인해주세요");
    //   setSignUpData({
    //     ...setSignUpData,
    //     password: "",
    //     rePassword: "",
    //   });

    //   $("#password").focus();
    //   return;
    // }
    sendSignUpData()
      .then((res) => {
        console.log(res.data);
        alert(res.data.result);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.response.data.error);
      });
  };

  const sendSignUpData = async () => {
    return await axios.post(`${port.url}/user/signUp`, signUpData);
  };

  return (
    <div className="signUp_form">
      <div>
        <form>
          <div>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              ref={emailRef}
              value={signUpData.email}
              onChange={onChangeSignUpData}
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={signUpData.password}
              onChange={onChangeSignUpData}
              className="form-control"
              name="password"
              id="password"
            />
          </div>
          <div>
            <label htmlFor="rePassword" className="form-label">
              rePassword
            </label>
            <input
              type="password"
              value={signUpData.rePassword}
              onChange={onChangeSignUpData}
              className="form-control"
              name="rePassword"
              id="rePassword"
            />
          </div>
          <div>
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="text"
              value={signUpData.name}
              onChange={onChangeSignUpData}
              className="form-control"
              name="name"
              id="name"
            />
          </div>
          <div>
            <p className="text-danger">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={onClickSignUpButton}
            className="btn btn-primary"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
