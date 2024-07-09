import React from 'react';

const Inputlogin = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className='rounded-lg pl-2 w-64'
  />
);

export default Inputlogin;
