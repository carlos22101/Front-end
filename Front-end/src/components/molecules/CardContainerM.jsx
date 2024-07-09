import React from 'react';

const CardContainerM = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {children}
    </div>
  );
};

export default CardContainerM;
