
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../atoms/SearchInput';
import Button from '../atoms/Button';

const SearchBarM = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleAdd = () => {
    navigate('/AgregarMateriaPrima');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold">MATERIA PRIMA</h1>
      <div className="flex items-center space-x-2">
      <SearchInput value={searchTerm} onChange={handleSearchChange} placeholder="Search" />
      <Button onClick={handleAdd} className="bg-green-500 text-white">Agregar</Button>
    </div>
    </div>
  );
};

export default SearchBarM;

