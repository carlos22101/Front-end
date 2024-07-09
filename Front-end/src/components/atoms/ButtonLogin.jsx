import React from 'react';

const ButtonLogin = ({ onClick, children }) => (
  <button onClick={onClick} className='border border-solid w-44 h-8 b rounded-xl hover:bg-green-500'>
    {children}
  </button>
);

export default ButtonLogin;
