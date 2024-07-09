import React from 'react';

const InputM = ({ type, value, onChange, required }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    required={required}
    className="border rounded px-4 py-2 w-full"
  />
);

export default InputM;
