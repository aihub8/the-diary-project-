import React from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
const DiaryBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [bg, setBg] = useState("#644e3a");
  useEffect(() => {
    if (!cookies.userData) {
      setBg("#ECE6CC");
    } else {
      setBg("#644e3a");
    }
  }, [cookies]);
  return <Wrapper bg={bg}></Wrapper>;
};
const Wrapper = styled.div`
  /* border: 2px solid black; */
  margin-left: 0;
  width: 5%;
  height: 100vh;
  background: ${(props) => props.bg};
  border-radius: 0px;
  z-index: 9997;
`;
export default DiaryBar;
