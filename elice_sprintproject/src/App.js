import './App.css';
import DiaryImg from './img/diaryimg.svg';
import trybutton from './img/mainicon.svg';
// import PopUpMenu from './PopUpMenu';
import {useState} from 'react';
import Modal from './Modal';
import Dropdown  from './Dropdown';

function App() {

  //modal
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // dropdown
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  return(
    <div className='background-color'>
    <img src={DiaryImg} className="diaryimg-svg" />
      <div>
        <button className="button-write" onClick={()=>{alert('click');}}></button>
        {/* <button className="button-try" onClick={()=>{alert('click');}}><img src={trybutton}/></button> */}
        <button className="button-delete" onClick={()=>{alert('click');}} />
        {/* <button className="button-bookmark" onClick={()=>{alert('click');}} /> */}
      </div>
      <div>
        {/* <button className="button-lowerlist" onClick={()=>{alert('click');}} ></button> */}
        <button className="button-lowerlist" onClick={openModal}><img src={trybutton}/></button>
        <Modal open={modalOpen} close={closeModal} header="Modal heading" />
        
      </div>
      <div className='dropdown'>
        <button className='button-bookmark' onClick={e => setDropdownVisibility(!dropdownVisibility)}>
                {
                    dropdownVisibility
                        ? 'Close'
                        : 'Open'
                }
        </button>
        <Dropdown visibility={dropdownVisibility}>
          <ul>
            <li>메뉴 1</li>
            <li>메뉴 2</li>
            <li>메뉴 1</li>
          </ul>
        </Dropdown>
      </div>
    </div>
  )
}

export default App;
