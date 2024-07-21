import React, { useState } from 'react';

function CardSelectlatillo() {
  const [cantidad, setCantidad] = useState(0);

  const manejarCambio = (operacion) => {
    setCantidad((prevCantidad) => {
      if (operacion === '1') {
        return prevCantidad + 1;
      } else if (operacion === '0') {
        return prevCantidad - 1;
      }
      return prevCantidad;
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={(e) => { e.stopPropagation(); manejarCambio('0');}} className="px-2 py-1 bg-gray-300 rounded">-</button>
      <input type="text" style={{ textAlign: 'center', width: '30px' }} value={cantidad} readOnly/>
      <button onClick={(e) => { e.stopPropagation(); manejarCambio('1'); }} className="px-2 py-1 bg-gray-300 rounded">+</button>
    </div>
  );
}

export default CardSelectlatillo;
