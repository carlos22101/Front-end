import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../molecules/Header';
import { Helmet } from 'react-helmet-async';

const AgregarmasPedidos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: IDMesa, IDPedido } = location.state || {}; 
  const [platillos, setPlatillos] = useState([]);
  const [clasificados, setClasificados] = useState({});
  const [cantidad, setCantidad] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch('https://restauranteapi.integrador.xyz/api/Platillos', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
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
      return nuevaCantidad;
    });
  };

  const handleFinishOrder = async () => {
    try {
      const token = sessionStorage.getItem('token');

      const detalles = Object.keys(cantidad).map(id => {
        const platillo = platillos.find(p => p.IDPlatillo === Number(id));
        return platillo ? {
          IDMesa,
          IDPlatillo: platillo.IDPlatillo,
          Nombre: platillo.Nombre,
          Cantidad: cantidad[id],
          Precio: platillo.Precio
        } : null;
      }).filter(detalle => detalle !== null);

      console.log('Detalles a enviar:', detalles);

      for (const detalle of detalles) {
        const detalleResponse = await fetch('https://restauranteapi.integrador.xyz/api/DetallePedido', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify(detalle),
        });

        if (!detalleResponse.ok) {
          throw new Error('Error al agregar los detalles del pedido');
        }
      }

      Swal.fire({
        title: '¡Éxito!',
        text: 'Detalles del pedido agregados correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#10B981',
      }).then(() => {
        navigate('/pedido');
      });
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo agregar los detalles del pedido',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#FF0000',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Agregar</title>
      </Helmet>
      <Header />
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-6">
            <div className="mb-4">
              <label htmlFor="IDMesa" className="block font-medium text-gray-700">
                Mesa: {IDMesa}
              </label>
            </div>
            <div className="mb-4">
              <div className="overflow-y-auto max-h-[320px] left-full top-0 ml-2 bg-white border border-gray-300 rounded shadow-lg p-2">
                {Object.keys(clasificados).map(categoria => (
                  <div key={categoria} className="mb-8">
                    <h1 className="text-2xl font-bold mb-4">{categoria}</h1>
                    <div className="grid md:cols-2 lg:cols-3 gap-4">
                      {clasificados[categoria].map(platillo => (
                        <div key={platillo.IDPlatillo} className="flex border p-4 rounded shadow-md">
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
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              onClick={() => navigate('/pedido')}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={handleFinishOrder}
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgregarmasPedidos;