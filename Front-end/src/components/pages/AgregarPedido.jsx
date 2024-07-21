import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../molecules/Header';
import Button from '../atoms/Button';
import CardSelectlatillo from '../molecules/CardSelectPlatillo';

const AgregarPedido = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: IDMesa } = location.state || {};
  const [verAgregar, setVerAgregar] = useState(false);
  const [Total] = useState(0); 
  const [StatusPedido] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://restauranteapi.integrador.xyz/api/Pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          IDMesa,
          Total,
          StatusPedido,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Pedido agregado:', data);
        Swal.fire({
          title: '¡Éxito!',
          text: 'Pedido agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#10B981',
        }).then(() => {
          navigate('/pedido');
        });
      } else {
        console.error('Error al agregar el pedido:', response.status);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo agregar el pedido',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#FF0000',
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error en la solicitud',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#FF0000',
      });
    }
  };

  const hanlderVerAgregar = (e) =>{
    e.preventDefault()
    setVerAgregar(!verAgregar)
  }

  return (
    <>
      <div>
        <Header />
        <div className="flex flex-col items-center justify-center bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
            <div className="grid grid-cols-1 gap-6">
              <div className="mb-4">
                <label htmlFor="IDMesa" className="block font-medium text-gray-700">
                  Mesa: {IDMesa}
                </label>
              </div>
              <div className="mb-4">
                  <Button type="button" onClick={hanlderVerAgregar}>Agregar Platillo +</Button>
                  {verAgregar && (
                  <div className=" left-full top-0 ml-2 bg-white border border-gray-300 rounded shadow-lg p-2">
                    <CardSelectlatillo></CardSelectlatillo>
                  </div>
                  )}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={() => navigate('/Pedido')}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AgregarPedido;
