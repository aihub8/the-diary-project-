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
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState({
    page: 1, //현재 보고있는 페이지 번호
    totalPage: 0, //전체 페이지 수
  });
  // const [reload, setReload] = useState(true);
  useEffect(() => {
    if (cookies.userData === undefined) {
      navigate("/");
    } else {
      getDiaryList(cookies.userData.user_id, page.page).then((res) => {});
      setUserId(cookies.userData.user_id);
    }
  }, []);

  const getDiaryList = async (my_id, temPage) => {
    console.log(my_id);
    return await axios
      .get(url.url + `/diary/${my_id}/getOtherList?page=${temPage}&perPage=6`, {
        headers: {
          accessToken: cookies.userData.accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        // let checkcehck = JSON.stringfy(res);
        // console.log(checkcehck);
        let ttp = res.data.totalPage;
        console.log(ttp);
        setDiaryList(res.data.diaries);
        setPage({
          page: temPage,
          totalPage: ttp,
        });
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
      });
  };
  const onClickPagination = (page) => {
    getDiaryList(userId, page);
  };

  return (
    <div className="diaryOtherList_paper">
      <div className="diaryOtherList_paper_content">
        <main className="diaryOtherList">
          {diaryList !== null &&
          (diaryList !== undefined) & (diaryList !== 0) ? (
            diaryList &&
            diaryList.map((it, index) => (
              <div className="" key={index}>
                <div className="mini-posts">
                  <article className="mini-post">
                    <header>
                      <h3>
                        <a
                          className="mini-post-title"
                          onClick={() => {
                            navigate(`/diary/${it.shortId}/diaryView`);
                          }}
                        >
                          <span>작성자 : &nbsp;{it.author}</span>
                          <span>
                            {it.title.substring(0, it.content.length / 2)}
                          </span>
                        </a>
                      </h3>
                      <time className="published" dateTime={it.created_at}>
                        {it.createdDate}
                      </time>
                      <a
                        onClick={() => {
                          navigate(`/diary/${it.shortId}/diaryView`);
                        }}
                        className="author"
                      >
                        <img
                          className="diaryOtherList_RabbitKVSrc"
                          src={RabbitKVSrc}
                          alt=""
                        />
                      </a>
                    </header>
                    <a
                      onClick={() => {
                        navigate(`/diary/${it.shortId}/diaryView`);
                      }}
                      className="image"
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
            ))
          ) : (
            <div>아직 게시글이 없습니다 😢</div>
          )}
        </main>
        <div style={{ textAlign: "center" }} className="diaryOtherList_ul">
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
                      &laquo;
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
                      &raquo;
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DiaryOhterList;
