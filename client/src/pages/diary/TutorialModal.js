import React, { useEffect } from 'react';
// import './TutorialModal.css'
import tutorialSVG from '../../img/tutorialSVG.svg';

const TutorialModal = (props) => {


  return(
      <div className='tutorialModalContainer'>
        <img className='tutorialModalSVG' src={tutorialSVG}></img>
      </div>    
  );
};
// const TutorialModal = (props) => {

//     useEffect(()=>{
//         document.body.style.overflow = 'hidden';
//         return () => {
//           document.body.style.overflow = 'auto';
//         };  
//       }, []);
    
//       // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
//       const { open, close} = props;

//     return(
//         <div className={open ? 'opentutoModal tutomodal' : 'tutomodal'} onClick={close}>
//       {open ? (
//         <div className='tutorialModalContainer' onClick={(e)=>e.stopPropagation()}>
//           <img className='tutorialModalSVG' src={tutorialSVG}></img>
//         </div>    
//       ) : null}
//     </div>
//     );
// };

export default TutorialModal;