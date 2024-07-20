import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../molecules/Header';
import Button from '../atoms/Button';

const AgregarPedido = () => {
  const [IDMesa, setIDMesa] = useState('');
  const [Total, setTotal] = useState('');
  const [StatusPedido, setStatusPedido] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!IDMesa || !Total || !StatusPedido) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llene todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#FF0000',
      });
      return;
    }

    try {
      const response = await fetch('https://restauranteapi.integrador.xyz/api/Platillos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          IDMesa,
          Descripcion,
          Precio:parseFloat(Precio),
          Categoria,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Platillo agregado:', data);
        Swal.fire({
          title: '¡Éxito!',
          text: 'Pedido agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#10B981',
        }).then(() => {
          navigate('/menu');
        });
      } else {
        console.error('Error al agregar el platillo:', response.status);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo agregar el platillo',
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

  return (
<>      
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-6">
            <div className="mb-4">
              <label htmlFor="nombre" className="block font-medium text-gray-700">
                Mesa
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="informacion" className="block font-medium text-gray-700">
              <Button>Agregar Platillo +</Button>
            </label>
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