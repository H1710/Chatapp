import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const CustomButton = ({
  text,
  classContent,
  handleSubmit,
  isLoading,
  type,
}) => {
  return (
    <button
      onClick={handleSubmit}
      className={`${classContent}`}
      disabled={isLoading}
      type={type}
    >
      {isLoading ? (
        <>
          <CircularProgress size={16} color="inherit" />
          Loading
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};

export default CustomButton;
