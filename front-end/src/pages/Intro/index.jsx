import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import logoHome from '../../assets/images/logoHome.png';

function Intro() {
  return (
    <div className="flex justify-center items-center h-full">
      <img
        src={logoHome}
        alt=""
        className="w-[5rem] h-[5rem] flex items-center content-center"
      />
      <h2 data-text="CHAT_APP" className="text-[3rem] font-light">
        CHAT_APP
      </h2>
    </div>
  );
}

export default Intro;
