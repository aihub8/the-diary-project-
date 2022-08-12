import React from "react";
import "./Cards.css"
import carroticon from "../../img/carroticon.png";

const Cards = (prop) => {
    const diaryList = prop;
    return (
        <div className="Card_container">
            <div className="img_pod">
                <img className="carroticon" src={carroticon} />
            </div>
            <div className="cards_form"> 
            {/* {
                diaryList && diaryList.map((it, index) => (
            <div>
                <h3>10 Augest 2022</h3>
                <h1>Title</h1>
                <p>Diary Content here</p>
                <a className="btn_primary" href="#" target="_blank">Read More</a>
            </div>
                ))} */}
                <h3>10 Augest 2022</h3>
                <h1>Title</h1>
                <p>Diary Content here</p>
                <a className="btn_primary" href="#" target="_blank">Read More</a>
            </div>
        </div>
    )
}

export default Cards;