import React, { useEffect, useState } from 'react';
import Header from '../molecules/Header';
import Sidebar from '../molecules/Sidebar';
import Card from '../molecules/Card';
import SearchBar from '../molecules/SearchBar';
import CardContainer from '../molecules/CardContainer';

const Menu = () => {
  const [platillos, setPlatillos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`https://restauranteapi.integrador.xyz/api/Platillos`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPlatillos(data);
      });
  }, []);

  const handleDelete = (id) => {
    setPlatillos(platillos.filter(platillo => platillo.IDPlatillo !== id));
  };

  const filteredPlatillos = platillos.filter(platillo =>
    platillo.Nombre.toLowerCase().includes(search.toLowerCase())
  );


  const groupByCategoria = filteredPlatillos.reduce((acc, platillo) => {
    const categoria = platillo.Categoria || 'Otro';
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(platillo);
    return acc;
  }, {});


  const categorias = Object.keys(groupByCategoria);

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full overflow-x-hidden">
          <div>
            <SearchBar setSearch={setSearch} />
          </div>
          <div className="p-4 overflow-y-auto max-h-[520px] border border-gray-300 ">
            {categorias.map((categoria, index) => (
              <CardContainer key={index} category={categoria}>
                {groupByCategoria[categoria].map(platillo => (
                  <Card
                    key={platillo.IDPlatillo}
                    id={platillo.IDPlatillo}
                    nombre={platillo.Nombre}
                    descripcion={platillo.Descripcion}
                    precio={platillo.Precio}
                    Categoria={platillo.Categoria}
                    onDelete={handleDelete}
                  />
                ))}
              </CardContainer>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
