import React, { useState, useEffect } from 'react';
import Sidebar from "../molecules/Sidebar";
import Header from "../molecules/Header";
import SearchBar from '../molecules/SearchBar';
import VentaList from '../molecules/VentaList';

function Ventas() {
    const [searchTerm, setSearchTerm] = useState('');
    const [ventas, setVentas] = useState([]);
  
    useEffect(() => {
      fetchVentas();
    }, []);
  
    const fetchVentas = async () => {
      try {
        const response = await fetch('https://restauranteapi.integrador.xyz/api/Ventas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVentas(data);
      } catch (error) {
        console.error('Error fetching ventas:', error);
      }
    };
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleAddClick = () => {

    };
  
    const filteredVentas = ventas.filter((venta) => {
      if (!venta.Monto) {
        return false;
      }
      return venta.Monto.toString().includes(searchTerm);
    });
  
    return (
      <>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="p-4 w-full">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              onAdd={handleAddClick}
            />
            <VentaList ventas={filteredVentas} />
          </div>
        </div>
      </>
    );
  }
  
  export default Ventas;