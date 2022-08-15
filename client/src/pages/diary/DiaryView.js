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
// import "./../../styles/diaryView.css";
const DiaryView = () => {
  const dispatch = useDispatch(); //action을 사용하기위해 보내주는 역할
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [currntDiary, setCurrentDiary] = useState({});
  const navigate = useNavigate();
  console.log(params.id);
  useEffect(() => {
    getDiaryView(params.id).then((res) => {
      console.log(res);
      setCurrentDiary(res.data);
    });
  }, []);

  //---------------------------delete-----------------------------------

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

  //----------------------------------update------------------------------

  const onClickUpdateButton = () => {
    console.log(params.id);
    dispatch(setDiaryDataDetails(params.id));
    navigate(`/diary/${params.id}/diaryUpdate`);
  };

  //---------------------------------------------------------------------

  return (
    <div className="diaryView">
      <div className="diaryView__container">
        <form>
          <div className="diaryView__nonDalle">
            <div className="setion0">
              <div className="">오늘날짜: &nbsp;</div>
            </div>
            <div className="setion1">
              <div className="">
                <label htmlFor="inputEmail4">작성자&nbsp;&nbsp;</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  name="author"
                  value={currntDiary.author}
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
                  &nbsp;&nbsp;제목 &nbsp;&nbsp;
                </label>
                <input
                  type="title"
                  className="diaryView__nonDalle_setion1_title"
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
                  className="form-control"
                  id="tag1"
                  name="tag1"
                  value={currntDiary.tag1}
                  required
                  readOnly
                  disabled
                />

                <input
                  type="text"
                  className="form-control"
                  id="tag2"
                  name="tag2"
                  value={currntDiary.tag2}
                  required
                  readOnly
                  disabled
                />

                <input
                  type="text"
                  className="form-control"
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
              <div>감정지수를 선택하세요.</div>
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
                  <option value="">{currntDiary.emotion}</option>
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
            <div className="diaryView__dalle_img"></div>
            <img src={`data:image/jpeg;base64,${currntDiary.img_url}`} alt="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiaryView;
