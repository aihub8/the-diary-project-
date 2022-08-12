import './HoriScrollList.css'
// import Cards from "./Cards";

import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import url from "./../../data/port.json";
import carroticon from "../../img/carroticon.png"

const HoriScrollList = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [diaryList, setDiaryList] = useState([]);
  
  const [reload, setReload] = useState(true);
  //  const user_id = cookies.userData.user_id;
  //갯수 잘 가져오는지 확인  
  console.log(diaryList);

  useEffect(() => {
    if (cookies.userData === undefined) {
      console.log(cookies.userData);
      navigate("/");
    } else {
      getDiaryList(cookies.userData.user_id).then((res) => {
        console.log(res);
      });
    }
  }, [reload]);
  console.log(cookies.userData);

  const getDiaryList = async (user_id) => {
    return await axios
      .get(url.url + `/diary/${user_id}/getModalList`, {
        headers: {
          accessToken: cookies.userData.accessToken,
        },
      })
      .then((res) => {
        setDiaryList(res.data.diaries);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
      });
  };

  return(
    <div className="wrap">
      <div className="scroll__wrap">
        <div className="Card_list_container_try">  
            {diaryList &&
              diaryList.map((it, index) => (
                // <div className="col" key={index}>
                //   <div className="card shadow-sm">
                <div className="Card_container_try" key={index}>
                  <div className="img_pod_try">
                    <img className="carroticon" src={carroticon} />
                  </div> 
                  <div className="cards_form_try">
                    <div className="card-body">
                      <h1
                        className="card-title"
                        onClick={() => {
                          navigate(`/diary/${it.shortId}/diaryView`);
                        }}
                      >
                        {it.title}
                      </h1>
                      <a className='cards_btn_primary' onClick={() => {
                            navigate(`/diary/${it.shortId}/diaryView`);
                          }}>Read more
                      </a>
                      {/* <p className="card-text">
                        {it.content.substring(0, it.content.length / 2)}
                        <a
                          onClick={() => {
                            navigate(`/diary/${it.shortId}/diaryView`);
                          }}
                        >
                          &nbsp;&nbsp;&nbsp;...상세보기
                        </a>
                      </p> */}
                      {/* <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            onClick={() => {
                              onClickDeleteButton(it.shortId);
                            }}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            삭제
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onClickUpdateButton(it.shortId);
                            }}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            수정
                          </button>
                        </div>
                        <small className="text-muted">9 mins</small>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>

        </div>
    </div>
    )
}

export default HoriScrollList;