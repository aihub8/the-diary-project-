import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import $ from "jquery";
import axios from "axios";
import url from "../../data/port.json";
import { useNavigate } from "react-router-dom";
import moment from "moment";
//Redux
import { useDispatch } from "react-redux";
import { setDiaryDataDetails } from "./../../app/reducer/diarySlice";
import "./../../styles/DiaryCreate.css";
let Base64 = ""; //dalle이미지의 bast64값

const DiaryCreate = () => {
  const navigate = useNavigate();
  const [cookies, ,] = useCookies(["userData"]);
  const dispatch = useDispatch(); //action을 사용하기위해 보내주는 역할
  const today = moment("YYYY-MM-DD HH:mm:ss");
  const [diary, setDiary] = useState({});
  const [dalle, setDalle] = useState(false);

  //태그들의 번역된 값(한->영)들을 dalle api에 전송하는 함수
  const dalleReturn = async (
    translatedHashTag1,
    translatedHashTag2,
    translatedHashTag3
  ) => {
    await axios
      .post(
        "https://main-dalle-server-scy6500.endpoint.ainize.ai/generate",
        // '{"text":"apple", "num_images":1}',
        {
          text: translatedHashTag1 + translatedHashTag2 + translatedHashTag3,
          num_images: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data[0]);
        Base64 = res.data[0];
      })
      .catch((e) => console.log(e));

    setDiary({
      ...diary,
      ["img_url"]: Base64,
    });
    // console.log(diary)
    setDalle(true);
  };
  //태그값들을 파파고 api를 통해 번역된 값을 가져와 저장함.
  const getPapago = async () => {
    alert("이미지 생성 중입니다 잠시만 기다려주세요");
    var translatedHashTag1, translatedHashTag2, translatedHashTag3;

    await axios
      .get(url.url + `/translate/${diary.tag1}`)
      .then((res) => {
        translatedHashTag1 = res.data.message.result.translatedText;
        console.log(res.data.message.result.translatedText);
      }) //태그 1의 번역된 값
      .catch((e) => console.log(e));

    await axios
      .get(url.url + `/translate/${diary.tag2}`)
      .then((res) => {
        translatedHashTag2 = res.data.message.result.translatedText;
        console.log(res.data.message.result.translatedText);
      }) //태그 2의 번역된 값
      .catch((e) => console.log(e));

    await axios
      .get(url.url + `/translate/${diary.tag3}`)
      .then((res) => {
        translatedHashTag3 = res.data.message.result.translatedText;
        console.log(res.data.message.result.translatedText);
      }) //태그 3의 번역된 값
      .catch((e) => console.log(e));

    dalleReturn(translatedHashTag1, translatedHashTag2, translatedHashTag3);
  };

  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      console.log(cookies);

      const receivedInfo = {
        shortId: "",
        user_id: cookies.userData.user_id,
        author: cookies.userData.author,
        email: cookies.userData.email,
        title: "",
        content: "",
        emotion: "",
        reg_date: today.format(),
        tag1: "",
        tag2: "",
        tag3: "",
        img_url: "",
        hidden: "true",
      };

      setDiary(receivedInfo);
    }
  }, []);

  const onChangeDiary = (e) => {
    //글셋팅
    setDiary({
      ...diary,
      [e.target.name]: e.target.value,
    });
  };

  const onClickCreateDairy = async () => {
    return await axios
      .post(url.url + "/diary/write-page", diary, {
        headers: {
          accessToken: cookies.userData.accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(setDiaryDataDetails(res.data.shortId));
        // setDiary({ ...diary, shortId: res.data.shortId });
        navigate(`/diary/${res.data.shortId}/diaryView`);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        alert(error.response.data.error);
      });
  };

  return (
    <div className="diary__create">
      <div className="container">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">작성자</label>
              <input
                type="title"
                className="form-control"
                id="author"
                name="author"
                value={diary.author || ""}
                onChange={onChangeDiary}
                readOnly
                disabled
              />
              <input
                type="title"
                className="form-control"
                id="user_id"
                name="user_id"
                value={diary.user_id || ""}
                onChange={onChangeDiary}
                hidden
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">제목</label>
              <input
                type="title"
                className="form-control"
                id="title"
                name="title"
                placeholder="제목을 입력하세요"
                onChange={onChangeDiary}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom03">tag1</label>
              <input
                type="text"
                className="form-control"
                id="tag1"
                name="tag1"
                onChange={onChangeDiary}
                placeholder="tag1"
                required
              />
              <div className="invalid-feedback">
                오늘의 감정을 태그로 입력하세요.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationCustom04">tag2</label>
              <input
                type="text"
                className="form-control"
                id="tag2"
                name="tag2"
                onChange={onChangeDiary}
                placeholder="tag2"
                required
              />
              <div className="invalid-feedback">
                오늘의 감정을 태그로 입력하세요.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationCustom05">tag3</label>
              <input
                type="text"
                className="form-control"
                id="tag3"
                name="tag3"
                onChange={onChangeDiary}
                placeholder="tag3"
                required
              />
              <div className="invalid-feedback">
                오늘의 감정을 태그로 입력하세요.
              </div>
              <button onClick={getPapago}>달리 이미지 생성</button>
              {/* <button onClick={diaryCheck}>diary 상태 체크</button> */}
            </div>
          </div>
          <div className="form-group">
            <select
              className="custom-select"
              name="emotion"
              id="emotion"
              onChange={onChangeDiary}
              required
            >
              <option value="">오늘의 감정지수는?</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
            <div className="invalid-feedback">감정지수를 선택하세요.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              내용
            </label>
            <textarea
              className="form-control"
              id="content"
              rows="3"
              name="content"
              onChange={onChangeDiary}
            ></textarea>
            <select
              className="hidden-select"
              name="hidden"
              id="hidden"
              onChange={onChangeDiary}
              required
            >
              <option value="true">숨기기</option>
              <option value="false">보여주기</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-dark"
            style={{ marginRight: "2%" }}
            onClick={onClickCreateDairy}
          >
            일기작성완료
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              window.history.back();
            }}
          >
            뒤로가기
          </button>
          {dalle ? <img src={`data:image/jpeg;base64,${Base64}`}></img> : <></>}
        </form>
      </div>
    </div>
  );
};

export default DiaryCreate;
