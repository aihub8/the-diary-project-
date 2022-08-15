import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import url from "./../../data/port.json";
import $ from "jquery";
import moment from "moment";
//Redux
import { useDispatch } from "react-redux";
import { setDiaryDataDetails } from "./../../app/reducer/diarySlice";
import "./../../styles/DiaryUpdate2.css";
let Base64 = ""; //dalle이미지의 bast64값

const DiaryUpdate2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const [cookies, ,] = useCookies(["userData"]);
  const [currntDiary, setCurrentDiary] = useState({});
  const [dalle, setDalle] = useState(false);
  const now = moment();
  const currentTime = now.format("YYYY.MM.DD HH:mm:ss"); //
  const currentShortId = params.id;
  const emotions = [
    "😁 I feeel goood",
    "😂 oh, That's so funny",
    "😫 what shooooda do?!",
    "😒 unpleasant, boring",
    "😤 how dare you",
    "😡 angry",
    "🤯 I wanna get outta here...",
    "💖 love",
    "🤕 not in a good condition",
    "💙 I feeel blue",
  ];
  useEffect(() => {
    getDiaryView(params.id).then((res) => {
      console.log(res.data);
      setCurrentDiary(res.data);
      Base64 = currntDiary.img_url;
    });
  }, []);

  const getDiaryView = async () => {
    return await axios.get(url.url + `/diary/${params.id}/view`, {
      headers: {
        accessToken: cookies.userData.accessToken,
      },
    });
  };

  //태그들의 번역된 값(한->영)들을 dalle api에 전송하는 함수
  const dalleReturn = async (
    translatedHashTag1,
    translatedHashTag2,
    translatedHashTag3
  ) => {
    await axios
      .post(
        "https://main-dalle-server-scy6500.endpoint.ainize.ai/generate",
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

    setCurrentDiary({
      ...currntDiary,
      ["img_url"]: Base64,
    });
    setDalle(true);
  };

  //태그값들을 파파고 api를 통해 번역된 값을 가져와 저장함.
  const getPapago = async () => {
    alert("이미지 생성 중입니다 잠시만 기다려주세요");
    var translatedHashTag1, translatedHashTag2, translatedHashTag3;

    await axios
      .get(url.url + `/translate/${currntDiary.tag1}`)
      .then((res) => {
        translatedHashTag1 = res.data.message.result.translatedText;
        console.log(res.data.message.result.translatedText);
      }) //태그 1의 번역된 값
      .catch((e) => console.log(e));

    await axios
      .get(url.url + `/translate/${currntDiary.tag2}`)
      .then((res) => {
        translatedHashTag2 = res.data.message.result.translatedText;
        console.log(res.data.message.result.translatedText);
      }) //태그 2의 번역된 값
      .catch((e) => console.log(e));

    await axios
      .get(url.url + `/translate/${currntDiary.tag3}`)
      .then((res) => {
        translatedHashTag3 = res.data.message.result.translatedText;
        console.log(res.data.message.result.translatedText);
      }) //태그 3의 번역된 값
      .catch((e) => console.log(e));

    dalleReturn(translatedHashTag1, translatedHashTag2, translatedHashTag3);
  };

  const onChangeDiary = (e) => {
    //글셋팅
    setCurrentDiary({
      ...currntDiary,
      [e.target.name]: e.target.value,
    });
  };

  const deleteDiary = async () => {
    return await axios.get(url.url + `/diary/${params.id}/delete`, {
      headers: {
        accessToken: cookies.userData.accessToken,
      },
    });
  };

  const onClickDeleteButton = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      //예
      deleteDiary(params.id)
        .then((res) => {
          alert("삭제가 완료됐습니다.");
          navigate("/diary/home");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      //아니오.
      return;
    }
  };

  const onClickUpdateDairy = async () => {
    return await axios
      .post(url.url + `/diary/${params.id}/update`, currntDiary, {
        headers: {
          accessToken: cookies.userData.accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(setDiaryDataDetails(res.data.shortId));
        // setDiary({ ...diary, shortId: res.data.shortId });
        navigate(`/diary/${params.id}/diaryView`);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
      });
  };

  //--------------------------------------------------------------------

  return (
    <div className="diaryUpdatePaper">
      <div className="diaryUpdatePaper_content">
        <div className="diaryUpdate">
          <div className="diaryUpdate__container">
            <form>
              <div className="diaryUpdate__nonDalle">
                <div className="setion0">
                  <div className="">오늘날짜: &nbsp;{currentTime}</div>
                </div>
                <div className="setion1">
                  <div className="">
                    <label htmlFor="inputEmail4">작성자&nbsp;&nbsp;</label>
                    <input
                      type="text"
                      className="author"
                      id="author"
                      name="author"
                      value={currntDiary.author}
                      style={{ width: "30%" }}
                      readOnly
                      disabled
                    />
                    {/* <input
                      type="title"
                      className="form-control"
                      id="user_id"
                      name="user_id"
                      value={currntDiary.user_id}
                      hidden
                    /> */}
                    <input
                      type="text"
                      className="shortId"
                      id="shortId"
                      name="shortId"
                      value={currntDiary.shortId}
                      hidden
                    />
                    <label htmlFor="inputPassword4">
                      &nbsp;&nbsp;제목&nbsp;&nbsp;
                    </label>
                    <input
                      type="text"
                      className="title"
                      id="title"
                      name="title"
                      value={currntDiary.title}
                      onChange={onChangeDiary}
                    />
                  </div>
                </div>
                <div className="setion2">
                  <div className="text">오늘의 감정을 태그로 입력하세요.</div>
                  <div className="tags">
                    <input
                      type="text"
                      id="tag1"
                      name="tag1"
                      placeholder={currntDiary.tag1}
                      onChange={onChangeDiary}
                      required
                    />

                    <input
                      type="text"
                      id="tag2"
                      name="tag2"
                      placeholder={currntDiary.tag2}
                      onChange={onChangeDiary}
                      required
                    />
                    <input
                      type="text"
                      id="tag3"
                      name="tag3"
                      placeholder={currntDiary.tag3}
                      onChange={onChangeDiary}
                      required
                    />
                    <button className="aiButton" onClick={getPapago}>
                      AI 이미지 생성
                    </button>
                  </div>
                </div>
                <div className="setion3">
                  <div className="text">감정지수를 선택하세요.</div>
                  <div className="selectBox">
                    <select
                      className="select"
                      name="emotion"
                      id="emotion"
                      value={currntDiary.emotion}
                      required
                      readOnly
                      disabled
                    >
                      <option value="">
                        {/* {currntDiary.emotion} */}
                        {emotions.find((item, index) => {
                          if (index === currntDiary.emotion) {
                            return item;
                          }
                        })}
                      </option>
                    </select>
                    <span className="icoArrow">
                      <img
                        src="https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png"
                        alt=""
                      />
                    </span>
                  </div>
                </div>
                <div className="setion4">
                  <textarea
                    id="content"
                    rows="3"
                    name="content"
                    value={currntDiary.content}
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
                    style={{ marginRight: "2%" }}
                    onClick={onClickUpdateDairy}
                  >
                    수정완료
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
                  <button
                    type="button"
                    onClick={() => {
                      onClickDeleteButton(currentShortId);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="diaryUpdate__dalle">
                <div className="diaryUpdate__dalle_img">
                  {Base64 !== "" ? (
                    <>
                      <img src={`data:image/jpeg;base64,${Base64}`} alt="" />
                      <div className="diaryUpdate__dalle_text">
                        ai 이미지 생성 완료!
                      </div>
                    </>
                  ) : (
                    // <div className="diaryUpdate__dalle_none">
                    //   태그로 생성된 <br></br>ai 이미지를 확인해보세요 !
                    // </div>
                    <></>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryUpdate2;
