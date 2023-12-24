import React from 'react';

interface TopBarProps {
  currentStep: number;
}

const TopBar: React.FC<TopBarProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center mb-8">
      <div className="flex items-center text-gray-500 relative">
        <div
          className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
            currentStep >= 2 ? 'bg-[#3386ff] text-white' : ''
          } border-[#3386ff]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user-plus"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium uppercase text-gray-500">
          Account
        </div>
      </div>
      <div
        className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
          currentStep >= 2 ? 'border-[#66a4ff]' : 'border-gray-300'
        }`}
      ></div>
      <div className="flex items-center text-gray-500 relative">
        <div
          className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
            currentStep >= 2 ? 'border-[#3386ff]' : 'border-gray-300'
          } ${currentStep >= 3 ? 'bg-[#3386ff] text-white' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-mail"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium uppercase text-gray-500">
          Message
        </div>
      </div>
      <div
        className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
          currentStep >= 3 ? 'border-[#66a4ff]' : 'border-gray-300'
        }`}
      ></div>{' '}
      <div className="flex items-center text-gray-500 relative">
        <div
          className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
            currentStep >= 3 ? 'border-[#3386ff]' : 'border-gray-300'
          } ${currentStep >= 4 ? 'bg-[#3386ff] text-white' : ''}`}
        >
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-database"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium uppercase text-gray-500">
          Confirm
        </div>
      </div>
    </div>
  );
};

export default TopBar;
