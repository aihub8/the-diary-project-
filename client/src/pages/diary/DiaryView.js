import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import url from "./../../data/port.json";
import { useCookies } from "react-cookie";

//Redux
import { useDispatch } from "react-redux";
import { setDiaryDataDetails } from "./../../app/reducer/diarySlice";
import "./../../styles/DiaryView.css";

const DiaryView = () => {
  const dispatch = useDispatch(); //action을 사용하기위해 보내주는 역할
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [currntDiary, setCurrentDiary] = useState({});
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
  console.log(emotions);
  const navigate = useNavigate();

  useEffect(() => {
    getDiaryView(params.id).then((res) => {
      console.log(res.data);
      setCurrentDiary(res.data);
    });
  }, []);

  const getDiaryView = async () => {
    return await axios.get(url.url + `/diary/${params.id}/view`, {
      headers: {
        accessToken: cookies.userData.accessToken,
      },
    });
  };
  const onChangeDiary = (e) => {
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
      deleteDiary(params.id)
        .then((res) => {
          alert("삭제가 완료됐습니다.");
          navigate("/diary/home");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      return;
    }
  };

  const onClickUpdateButton = () => {
    console.log(params.id);
    dispatch(setDiaryDataDetails(params.id));
    navigate(`/diary/${params.id}/diaryUpdate`);
  };

  return (
    <div className="diaryViewPaper">
      <div className="diaryView_content">
        <div className="diaryView">
          <div className="diaryView__container">
            <form>
              <div className="diaryView__nonDalle">
                <div className="setion0">
                  <div className="">Date: &nbsp;{currntDiary.createdDate}</div>
                </div>
                <div className="setion1">
                  <div className="">
                    <label htmlFor="inputEmail4">Author&nbsp;&nbsp;</label>
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
                    <input
                      type="title"
                      className="form-control"
                      id="user_id"
                      name="user_id"
                      value={currntDiary.user_id}
                      hidden
                    />
                    <label htmlFor="inputPassword4">
                      &nbsp;&nbsp;Title &nbsp;&nbsp;
                    </label>
                    <input
                      type="title"
                      className="title"
                      id="title"
                      name="title"
                      placeholder="제목을 입력하세요"
                      onChange={onChangeDiary}
                    />
                  </div>
                </div>
                <div className="setion2">
                  <div className="text">Your #Tags</div>
                  <div className="tags">
                    <input
                      type="text"
                      id="tag1"
                      name="tag1"
                      value={currntDiary.tag1}
                      required
                      readOnly
                      disabled
                    />

                    <input
                      type="text"
                      id="tag2"
                      name="tag2"
                      value={currntDiary.tag2}
                      required
                      readOnly
                      disabled
                    />

                    <input
                      type="text"
                      id="tag3"
                      name="tag3"
                      value={currntDiary.tag3}
                      required
                      readOnly
                      disabled
                    />
                  </div>
                </div>
                <div className="setion3">
                  <div className="text">How did you feel</div>
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
                    value={currntDiary.content}
                    onChange={onChangeDiary}
                    readOnly
                    disabled
                  ></textarea>
                </div>
                <div className="setion5">
                  <button
                    type="button"
                    className=""
                    // style={{ marginRight: "2%" }}
                    onClick={onClickUpdateButton}
                  >
                    수정하기
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
                    className=""
                    onClick={() => {
                      onClickDeleteButton(params.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="diaryView__dalle">
                <div className="diaryView__dalle_img">
                  <img
                    src={`data:image/jpeg;base64,${currntDiary.img_url}`}
                    alt=""
                  />
                  <div className="diaryView__dalle_text">Ai based Image</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryView;
