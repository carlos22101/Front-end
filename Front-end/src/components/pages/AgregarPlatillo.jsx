import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../atoms/Input';
import Swal from 'sweetalert2';
import Header from '../molecules/Header';

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
        confirmButtonColor: '#FF0000',
      });
      return;
    }
    if (parseFloat(Precio) <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'El precio debe ser mayor a 0',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#FF0000',
      });
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://restauranteapi.integrador.xyz/api/Platillos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          Nombre,
          Descripcion,
          Precio: parseFloat(Precio),
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
      <Header />
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-4xl mt-2">
          <div className="grid grid-cols-1 gap-6">
            <div>
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
            <div>
              <label htmlFor="informacion" className="block font-medium text-gray-700">
                Información del platillo
              </label>
              <textarea
                id="informacion"
                value={Descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
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
            <div>
              <label className="block font-medium text-gray-700">Categoría</label>
              <div className="flex space-x-4">
                {['Desayunos', 'Comidas', 'Cenas', 'Bebidas'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`py-2 px-4 rounded ${
                      Categoria === cat ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setCategoria(cat)}
                  >
                    {cat}
                  </button>
                ))}
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
