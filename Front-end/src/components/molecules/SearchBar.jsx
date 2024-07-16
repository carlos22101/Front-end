import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonSearch from '../atoms/ButtonSearch';
import InputSearch from '../atoms/InputSearch';

const SearchBar = ({ setSearch }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold">PLATILLOS</h1>
      <div className="flex items-center space-x-2">
        <InputSearch placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        <ButtonSearch text="Agregar" onClick={() => navigate('/AgregarPlatillo')} />
      </div>
    </div>
  );
};

export default SearchBar;