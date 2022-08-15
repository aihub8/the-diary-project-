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
  const now = moment();
  const currentTime = now.format("YYYY.MM.DD HH:mm:ss"); // 2021-10-09T00:01:13+09:00
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
        reg_date: currentTime,
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
    <div className="diaryCreate">
      <div className="diaryCreate__container">
        <form>
          <div className="diaryCreate__nonDalle">
            <div className="setion0">
              <div className="">오늘날짜: &nbsp;{currentTime}</div>
            </div>
            <div className="setion1">
              <div className="">
                <label htmlFor="inputEmail4">작성자&nbsp;&nbsp;</label>
                <input
                  type="text"
                  className="diaryCreate__nonDalle_setion1_author"
                  id="author"
                  name="author"
                  value={diary.author || ""}
                  onChange={onChangeDiary}
                  style={{ width: "30%" }}
                  readOnly
                  disabled
                />
                <input
                  type="title"
                  className=""
                  id="user_id"
                  name="user_id"
                  value={diary.user_id || ""}
                  onChange={onChangeDiary}
                  hidden
                />
                <label htmlFor="inputPassword4">
                  &nbsp;&nbsp;제목 &nbsp;&nbsp;
                </label>
                <input
                  type="title"
                  className="diaryCreate__nonDalle_setion1_title"
                  id="title"
                  name="title"
                  placeholder="제목을 입력하세요"
                  onChange={onChangeDiary}
                />
              </div>
            </div>
            <div className="setion2">
              <div className="">오늘의 감정을 태그로 입력하세요.</div>
              <div className="tags">
                <input
                  type="text"
                  className=""
                  id="tag1"
                  name="tag1"
                  onChange={onChangeDiary}
                  placeholder="tag1"
                  required
                />

                <input
                  type="text"
                  className=""
                  id="tag2"
                  name="tag2"
                  onChange={onChangeDiary}
                  placeholder="tag2"
                  required
                />

                <input
                  type="text"
                  className=""
                  id="tag3"
                  name="tag3"
                  onChange={onChangeDiary}
                  placeholder="tag3"
                  required
                />
                <button onClick={getPapago}>달리 이미지 생성</button>
              </div>
            </div>
            <div className="setion3">
              <div>감정지수를 선택하세요.</div>
              <div className="selectBox">
                <select
                  className="select"
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
                <span class="icoArrow">
                  <img
                    src="https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png"
                    alt=""
                  />
                </span>
              </div>
            </div>
            <div className="setion4">
              <textarea
                className=""
                id="content"
                rows="3"
                name="content"
                onChange={onChangeDiary}
              ></textarea>
            </div>
            <div className="setion5">
              <select
                className=""
                name="hidden"
                id="hidden"
                onChange={onChangeDiary}
                required
              >
                <option value="true">숨기기</option>
                <option value="false">보여주기</option>
              </select>

              <button
                type="button"
                className=""
                style={{ marginRight: "2%" }}
                onClick={onClickCreateDairy}
              >
                일기작성완료
              </button>
              <button
                type="button"
                className=""
                onClick={() => {
                  window.history.back();
                }}
              >
                뒤로가기
              </button>
            </div>
          </div>
          <div className="diaryCreate__dalle">
            <div className="diaryCreate__dalle_img"></div>
            {/* {dalle ? (
              <img
                src={`data:image/jpeg;base64,${Base64}`}
                style={{ width: "100px", height: "100px" }}
              ></img>
            ) : (
              <></>
            )} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiaryCreate;
