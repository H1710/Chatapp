import React from 'react';
import styled from 'styled-components';

const Loading: React.FC = () => {
  return (
    <FormContainer>
      <div className="ring">
        Loading...
        <span></span>
      </div>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  .ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: transparent;
    border: 3px solid white;
    border-radius: 50%;
    text-align: center;
    line-height: 190px;
    font-size: 28px;
    color: black;
    letter-spacing: 4px;
    text-shadow: 0 0 10px #2196f3;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  .ring:before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #2196f3;
    border-right: 3px solid #2196f3;
    border-radius: 50%;
    animation: animateC 2s linear infinite;
  }
  span {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background: transparent;
    transform-origin: left;
    animation: animate 2s linear infinite;
  }
  span:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    top: -6px;
    right: -8px;
    box-shadow: 0 0 20px black;
  }
  @keyframes animateC {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes animate {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(405deg);
    }
  }
`;

export default Loading;
