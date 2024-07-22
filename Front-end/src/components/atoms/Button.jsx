import React from 'react';

const Button = ({ type ,onClick, children, Style}) => (
  <button type={type} onClick={onClick} className={Style}>
    {children}
  </button>
);

export default Button;
