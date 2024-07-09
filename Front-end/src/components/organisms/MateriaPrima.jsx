import React, { useEffect, useState } from 'react';
import Header from '../molecules/Header';
import Sidebar from '../molecules/Sidebar';
import SearchBarM from '../molecules/SearchBarM';
import CardM from '../molecules/CardM';
import CardContainerM from '../molecules/CardContainerM';

function MateriaPrima() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetch('https://restauranteapi.integrador.xyz/api/Materia_Prima')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => 
        item.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  };

  const handleAdd = () => {
    console.log('Agregar nuevo item');
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.ID !== id));
    setFilteredItems(filteredItems.filter(item => item.ID !== id));
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Materia Prima</h1>
          <SearchBarM onSearch={handleSearch} onAdd={handleAdd} />
          <CardContainerM>
            {filteredItems.map(item => (
              <CardM key={item.ID} item={item} onDelete={handleDelete} />
            ))}
          </CardContainerM>
        </div>
      </div>
    </>
  );
}

export default MateriaPrima;
