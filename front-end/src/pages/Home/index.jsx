import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ProfileBar from '../../components/ProfileBar/index';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from '../../components/NavigationBar/index';
import { ToastContainer, toast } from 'react-toastify';
import logoHome from '../../assets/images/logoHome.png';

function Home() {
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

export default Home;
