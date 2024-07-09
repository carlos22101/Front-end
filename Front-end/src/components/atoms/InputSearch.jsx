import React from 'react';

const InputSearch = ({ placeholder, onChange }) => {
  return (
    <input
      className="border border-gray-300 rounded-md px-4 py-2"
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputSearch;
