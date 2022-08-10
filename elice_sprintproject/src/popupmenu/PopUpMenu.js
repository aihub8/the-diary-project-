import React from 'react';
import './popupmenu/popUpMenu.css';
// import {Helmet} from "react-helmet";

const PopUpMenu = () => {

    const [isActive, setIsActive] = useState(false);
    const handleClick = event => {
        // 👇️ toggle isActive state on click
        setIsActive(current => !current);
      };

    return (
        <>
            <div className="container">
            <a className="btn js-click-modal">Open Modal</a>
            <div className="modal">
                <div className="header">This is a full-width modal with a title
                </div>
                <div className="body"><p>And here is all its contents.</p>
                    <a className="btn js-close-modal">Close</a>
                </div>
            </div>
            </div>
            
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

                <script  src="./popupmenu/popUpMenuJquery.js"></script>          
        </>
    )
}

export default PopUpMenu;