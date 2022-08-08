import book from './img/book.svg';
import to from './img/to.svg';
import './App.css';
// import { FaAngleDown } from "react-icons/fa";
// import React, { Component } from 'react';
// import Modal from './Modal';
// import { useState } from 'react'
import React, { useState } from 'react';
import Modal from './Modal';

function App() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    
    <div className="App">
      <header className="App-header">
      <img src={book} className="App-book" alt="book" />
      {/* <img src={to} className="to" alt="to" /> */}
          <div>
            {/* <button className="button-write" onClick={()=>{alert('click');}}></button> */}
            <button className="write" onClick={()=>{alert('작성?');}}></button>
            <button className="delete" onClick={()=>{alert('삭제?');}}></button>
            {/* <button className="to" onClick={openModal}></button>     */}
          </div>
          <div>
            <button className="to" onClick={openModal}></button>
            <Modal open={modalOpen} close={closeModal} header="일기목록">
              일기 리스트
            </Modal>
          </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >   
        </a>
      </header>
      <body>
      
      {/* <div className="App">
      <div className="container">
        <input id="dropdown" type="checkbox" />
        <label className="dropdownLabel" for="dropdown">
          <div>CSS</div>
          <FaAngleDown className="caretIcon" />
        </label>
        <div className="content">
          <ul>
            <li>Class</li>
            <li>Selectors</li>
            <li>Media query</li>
          </ul>
        </div>
      </div>
    </div> */}
        </body>
    </div>
  );
}

export default App;

// function App() {
//   // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
//   const [modalOpen, setModalOpen] = useState(false);

//   const openModal = () => {
//     setModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <button onClick={openModal}>모달팝업</button>
      
//       <Modal open={modalOpen} close={closeModal} header="Modal heading">
//         <main> {props.children} </main>
//       </Modal>
//     </React.Fragment>
//   );
// }

// function MO(props) {
//   // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
//   const [modalOpen, setModalOpen] = useState(false);

//   const openModal = () => {
//     setModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalOpen(false);
//   };
//   return (
//     <React.Fragment>
//           <button onClick={openModal}>모달팝업</button>
//           <Modal open={modalOpen} close={closeModal} header="Modal heading">
//             <main> {props.children} </main>
//           </Modal>
//         </React.Fragment>
//   );
// }


    


