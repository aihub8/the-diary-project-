import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import url from "../../data/port.json";
import "./../../styles/DiaryOtherList.css";
import RabbitKVSrc from "./../../img/DiaryRabbitKV.svg";
const DiaryOhterList = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [diaryList, setDiaryList] = useState([]);
  const [page, setPage] = useState({
    page: 1, //현재 보고있는 페이지 번호
    totalPage: 0, //전체 페이지 수
  });
  const [reload, setReload] = useState(true);
  //  const user_id = cookies.userData.user_id;

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

  const getDiaryList = async (my_id) => {
    return await axios
      .get(url.url + `/diary/${my_id}/getOtherList`, {
        headers: {
          accessToken: cookies.userData.accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        setDiaryList(res.data.diaries);
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
      });
  };
  const onClickPagination = (page) => {
    getDiaryList(page);
  };
  const deleteDiary = async (shortId) => {
    return await axios.get(url.url + `/diary/${shortId}/delete`, {
      headers: {
        accessToken: cookies.userData.accessToken,
      },
    });
  };

  const onClickDeleteButton = (shortId) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      //예
      deleteDiary(shortId)
        .then((res) => {
          alert("삭제가 완료됐습니다.");
          setReload((reload) => !reload); //글 삭제 후 재렌더링용
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      //아니오.
      return;
    }
  };
  const onClickUpdateButton = (shortId) => {
    console.log(shortId);
    // dispatch(setDiaryDataDetails(params.id));
    navigate(`/diary/${shortId}/diaryUpdate`);
  };
  const checkDiary = () => {
    console.log(diaryList);
  };

  return (
    <div className="diaryOtherList_paper">
      <div className="diaryOtherList_paper_content">
        <main className="diaryOtherList">
          {diaryList &&
            diaryList.map((it, index) => (
              <div className="" key={index}>
                <div class="mini-posts">
                  <article class="mini-post">
                    <header>
                      <h3>
                        <a
                          onClick={() => {
                            navigate(`/diary/${it.shortId}/diaryView`);
                          }}
                        >
                          {it.title}
                        </a>
                      </h3>
                      <time class="published" datetime={it.created_at}>
                        {it.createdDate}
                      </time>
                      <a
                        onClick={() => {
                          navigate(`/diary/${it.shortId}/diaryView`);
                        }}
                        class="author"
                      >
                        <img src={RabbitKVSrc} alt="" />
                      </a>
                    </header>
                    <a
                      onClick={() => {
                        navigate(`/diary/${it.shortId}/diaryView`);
                      }}
                      class="image"
                    >
                      <img
                        src={`data:image/jpeg;base64,${it.img_url}`}
                        alt=""
                        style={{ width: "100%", overflow: "hidden" }}
                      />
                    </a>
                  </article>
                </div>
              </div>
            ))}
        </main>
        <div style={{ textAlign: "center" }}>
          <nav
            aria-label="Page navigation example"
            style={{ display: "inline-block" }}
          >
            <ul className="">
              {page.page - 1 < 1 ? (
                <></>
              ) : (
                <>
                  <li className="">
                    <a
                      className=""
                      aria-label="Previous"
                      onClick={() => onClickPagination(page.page - 1)}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      className=""
                      onClick={() => onClickPagination(page.page - 1)}
                    >
                      {page.page - 1}
                    </a>
                  </li>
                </>
              )}

              <li className="">
                <a className="" onClick={() => onClickPagination(page.page)}>
                  {page.page}
                </a>
              </li>
              {page.page + 1 > page.totalPage ? (
                <></>
              ) : (
                <>
                  <li className="">
                    <a
                      className=""
                      onClick={() => onClickPagination(page.page + 1)}
                    >
                      {page.page + 1}
                    </a>
                  </li>
                  <li className="">
                    <a
                      className=""
                      aria-label="Next"
                      onClick={() => onClickPagination(page.page + 1)}
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <button onClick={checkDiary}>다이어리 상태</button>
        </div>
      </div>
    </div>
  );
};

export default DiaryOhterList;
