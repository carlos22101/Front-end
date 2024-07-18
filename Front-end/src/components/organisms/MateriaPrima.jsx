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
        <div className="flex flex-col w-full overflow-x-hidden">
          <div>
            <SearchBarM onSearch={handleSearch} onAdd={handleAdd} />
          </div>
          <div className="p-4 overflow-y-auto max-h-[520px] border border-gray-300 ">
          <CardContainerM>
            {filteredItems.map(item => (
              <CardM key={item.ID} item={item} onDelete={handleDelete} />
            ))}
          </CardContainerM>
          </div>
        </div>
      </div>
    </>
  );
}

export default MateriaPrima;