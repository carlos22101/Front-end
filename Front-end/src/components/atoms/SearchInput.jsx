import React from 'react';

const SearchInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border rounded px-4 py-2"
  />
);

export default SearchInput;
