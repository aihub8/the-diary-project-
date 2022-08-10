import React from "react";
import './HoriScrollList.css'
// import Cards from "./Card";

const HoriScrollList = () => {

    return(
        <div className="wrap">
            <div className="scroll__wrap">
                {/* <div className="scroll--element">Element1</div> */}
                {/* <div><Cards /></div> */}
                <div className="scroll--element">Element2</div>
                <div className="scroll--element">Element3</div>
                <div className="scroll--element">Element4</div>
                <div className="scroll--element">Element5</div>
                <div className="scroll--element">Element6</div>
            </div>
        </div>
    )
}

export default HoriScrollList;