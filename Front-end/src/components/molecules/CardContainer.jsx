import React from 'react';

const CardContainer = ({ category, children }) => {
  return (
    <div className="mb-8 w-4/5 flex-wrap">
      <h2 className="text-2xl font-bold mb-4">{category}</h2>
      <div className="flex flex-wrap">
        {children}
      </div>
    </div>
  );
};

export default CardContainer;

