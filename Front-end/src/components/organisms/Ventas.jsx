import React, { useState, useEffect } from 'react';
import Sidebar from "../molecules/Sidebar";
import Header from "../molecules/Header";
import CardContainerVentas from '../molecules/CardContainerVentas';
import { Helmet } from 'react-helmet-async';

function Ventas() {
  const [venta, setVenta] = useState([]);

    useEffect(() => {
      const token = sessionStorage.getItem('token');
      fetch(`https://restauranteapi.integrador.xyz/api/Ventas`,{
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token 
        }
      })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setVenta(data);
          });
      }, []);
  
    return (
      <>
            <Helmet>
        <title>Ventas</title>
      </Helmet>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            <div className= " p-4 overflow-y-auto max-h-[520px] border border-gray-300">
              {Array.isArray(venta) && venta.map(v => {
                const fecha = v.FechaVenta.split('T')[0]
                return( <CardContainerVentas key={v.IDVenta} idpedido={v.IDPedido} IDMesa={v.IDMesa} FechaVenta={fecha} Total={v.Total}/>);
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Ventas;