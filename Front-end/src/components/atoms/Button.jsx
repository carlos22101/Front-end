import React from 'react';

const Button = ({ onClick, children, Style}) => (
  <button onClick={onClick} className={Style}>
    {children}
  </button>
);

export default Button;
