import React, { HTMLAttributes } from 'react'

interface MyButtonProps {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    ariaLabel?: string;
  }
  

const  MyButton: React.FC<MyButtonProps> = ({label, onClick, disabled, type, className, ariaLabel}) => {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    type={type}
    className={className}
    aria-label={ariaLabel || label}
  >
    {label}
  </button>
  )
}

export default MyButton;
