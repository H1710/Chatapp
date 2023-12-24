import React, { FC, MouseEvent } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface CustomButtonProps {
  text: string;
  classContent: string;
  handleSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
}

const CustomButton: FC<CustomButtonProps> = ({
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
