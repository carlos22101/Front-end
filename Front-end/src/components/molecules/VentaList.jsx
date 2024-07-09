import React from 'react'
import Card from './Card';
const VentaList = ({ ventas }) => (
    <div>
      {ventas.map((venta) => (
        <Card key={venta.ID} venta={venta} />
      ))}
    </div>
  );
  
  export default VentaList;
