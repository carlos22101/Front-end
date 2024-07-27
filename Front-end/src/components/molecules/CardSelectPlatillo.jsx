/*import React, { useState, useEffect } from 'react';

function CardSelectPlatillo() {
  const [platillos, setPlatillos] = useState([]);
  const [clasificados, setClasificados] = useState({});
  const [cantidad, setCantidad] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch('https://restauranteapi.integrador.xyz/api/Platillos',{
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token 
      }
    })
      .then(response => response.json())
      .then(data => {
        setPlatillos(data);
        clasificarPlatillos(data);
      })
      .catch(error => console.error('Error al obtener los platillos:', error));
  }, []);

  const clasificarPlatillos = (platillos) => {
    const clasificados = platillos.reduce((acc, platillo) => {
      const { Categoria } = platillo;
      if (!acc[Categoria]) {
        acc[Categoria] = [];
      }
      acc[Categoria].push(platillo);
      return acc;
    }, {});
    setClasificados(clasificados);
  };

  const manejarCambio = (id, operacion) => {
    setCantidad((prevCantidad) => {
      const nuevaCantidad = { ...prevCantidad };
      if (!nuevaCantidad[id]) nuevaCantidad[id] = 0;
      if (operacion === '1') {
        nuevaCantidad[id] += 1;
      } else if (operacion === '0' && nuevaCantidad[id] > 0) {
        nuevaCantidad[id] -= 1;
      }
      console.log(cantidad);
      return nuevaCantidad;
    });
    
  };

  return (
    <div className="p-4">
      {Object.keys(clasificados).map((categoria) => (
        <div key={categoria} className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{categoria}</h1>
          <div className="md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clasificados[categoria].map((platillo) => (
              <div key={platillo.IDPlatillo} className=" flex border p-4 rounded shadow-md">
                <h2 className="mt-[10px] text-lg font-bold mr-2">{platillo.Nombre}</h2>
                <p className='mt-3 mr-2'>{platillo.Descripcion}</p>
                <p className='mt-3 mr-2'>Precio: ${platillo.Precio}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button 
                    type="button" 
                    onClick={() => manejarCambio(platillo.IDPlatillo, '0')} 
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    style={{ textAlign: 'center', width: '30px' }} 
                    value={cantidad[platillo.IDPlatillo] || 0} 
                    readOnly
                  />
                  <button 
                    type="button" 
                    onClick={() => manejarCambio(platillo.IDPlatillo, '1')} 
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={()=>{
        let a = Object.keys(cantidad)
        let b = Object.values(cantidad)
        let c = []
        console.log(JSON.stringify(a));
        console.log(JSON.stringify(b));
        a.forEach((item,index) => {
          c.push({"id":item, "c": b[index] })
        })
        console.log(c);
      }}>Mostrar</button>
    </div>
  );
}
export default CardSelectPlatillo;*/