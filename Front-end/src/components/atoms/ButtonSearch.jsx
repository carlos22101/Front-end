import React from 'react';

const ButtonSearch = ({ text, onClick }) => {
  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonSearch;
