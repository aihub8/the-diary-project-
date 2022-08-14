import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import url from "./../../data/port.json";
// import "./Cards_try.css";
import carroticon from "../../img/carroticon.png"

const DiaryList = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [diaryList, setDiaryList] = useState([]);
  const [page, setPage] = useState({
    page: 1, //현재 보고있는 페이지 번호
    totalPage: 0, //전체 페이지 수
  });
  const [reload, setReload] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth()+1)
  //  const user_id = cookies.userData.user_id;
  
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

  const getDiaryList = async (user_id,month) => {
    return await axios
      .get(url.url + `/diary/${user_id,month}/getList`, {
        headers: {
          accessToken: cookies.userData.accessToken,
        },
      })
      .then((res) => {
        console.log(res)
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
  }

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Diary List</h1>
          </div>
        </div>
      </section>
      <div className="album py-5">
        <div className="container">
          {/* <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"> */}
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
                      <h5
                        className="card-title"
                        onClick={() => {
                          navigate(`/diary/${it.shortId}/diaryView`);
                        }}
                      >
                        {it.title}
                      </h5>
                      <p className="card-text">
                        {it.content.substring(0, it.content.length / 2)}
                        <a
                          onClick={() => {
                            navigate(`/diary/${it.shortId}/diaryView`);
                          }}
                        >
                          &nbsp;&nbsp;&nbsp;...상세보기
                        </a>
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <nav
          aria-label="Page navigation example"
          style={{ display: "inline-block" }}
        >
          <ul className="pagination">
            {page.page - 1 < 1 ? (
              <></>
            ) : (
              <>
                <li className="page-item">
                  <a
                    className="page-link"
                    aria-label="Previous"
                    onClick={() => onClickPagination(page.page - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => onClickPagination(page.page - 1)}
                  >
                    {page.page - 1}
                  </a>
                </li>
              </>
            )}

            <li className="page-item active">
              <a
                className="page-link"
                onClick={() => onClickPagination(page.page)}
              >
                {page.page}
              </a>
            </li>
            {page.page + 1 > page.totalPage ? (
              <></>
            ) : (
              <>
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => onClickPagination(page.page + 1)}
                  >
                    {page.page + 1}
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
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
    </main>
  );
};

export default DiaryList;
