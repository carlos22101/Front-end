import React from 'react';

const ButtonAgregar = ({ onClick, children }) => (
  <button onClick={onClick} className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
    {children}
  </button>
);

export default ButtonAgregar;
