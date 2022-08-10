import React from "react";
import styled from "styled-components";

import diarybodyImg from "./../img/diary_body.png";
const DiaryBody = () => {
  return (
    <Background>
      <img alt="" src={diarybodyImg} />
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  border: 1px solid gray;
  width: 100%;
  height: 100%;
  img {
    width: 80%;
    height: 80%;
    @media (max-width: 768px) {
      width: initial;
    }
  }
`;
export default DiaryBody;
