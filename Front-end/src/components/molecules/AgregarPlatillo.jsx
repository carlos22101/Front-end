import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import Swal from 'sweetalert2';
import Header from './Header';

const AgregarPlatillo = () => {
  const [Nombre, setNombre] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Precio, setPrecio] = useState('');
  const [Categoria, setCategoria] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Nombre || !Descripcion || !Precio || !Categoria) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llene todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#EF4444',
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
          Nombre,
          Descripcion,
          Precio,
          Categoria,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Platillo agregado:', data);
        Swal.fire({
          title: '¡Éxito!',
          text: 'Platillo agregado correctamente',
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
          confirmButtonColor: '#EF4444',
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error en la solicitud',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#EF4444',
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-6">
            <div className="mb-4">
              <label htmlFor="nombre" className="block font-medium text-gray-700">
                Nombre del platillo
              </label>
              <Input
                type="text"
                placeholder="Ingresa el nombre"
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="informacion" className="block font-medium text-gray-700">
                Información del platillo
              </label>
              <textarea
                id="informacion"
                value={Descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
                rows="4"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="precio" className="block font-medium text-gray-700">
                Precio
              </label>
              <Input
                type="number"
                placeholder="Ingresa el precio"
                value={Precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Categoría</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`py-2 px-4 rounded ${Categoria === 'Desayunos' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setCategoria('Desayunos')}
                >
                  Desayunos
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded ${Categoria === 'Comidas' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setCategoria('Comidas')}
                >
                  Comidas
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded ${Categoria === 'Cenas' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setCategoria('Cenas')}
                >
                  Cenas
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              onClick={() => navigate('/menu')}
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
    </>
  );
};

export default AgregarPlatillo;

