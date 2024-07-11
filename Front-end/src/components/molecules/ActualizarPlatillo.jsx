import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../atoms/Input';
import Swal from 'sweetalert2';
import Header from './Header';

const categorias = ['Desayunos', 'Comidas', 'Cenas'];

const ActualizarPlatillo = () => {
  const { id } = useParams();
  const [Nombre, setNombre] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Precio, setPrecio] = useState('');
  const [Categoria, setCategoria] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restauranteapi.integrador.xyz/api/Platillos/${id}`)
      .then(response => response.json())
      .then(data => {
        setNombre(data.Nombre);
        setDescripcion(data.Descripcion);
        setPrecio(data.Precio);
        setCategoria(data.Categoria); 
      });
  }, [id]);

  const handleSubmit = (e) => {
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

    fetch(`https://restauranteapi.integrador.xyz/api/Platillos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nombre,
        Descripcion,
        Precio,
        Categoria,
      }),
    })
      .then(response => {
        if (response.ok) {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Platillo actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#66FF66',
          }).then(() => {
            navigate('/menu');
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el platillo',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#FF0000',
          });
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: 'Error en la solicitud',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#FF0000',
        });
      });
  };

  return (
    <>
    <Header/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-[#FFFFFF] p-8 rounded shadow-md w-full max-w-4xl">
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
              <label className="block font-medium text-gray-700">
                Categoría
              </label>
              <div className="flex space-x-4">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`py-2 px-4 rounded ${Categoria === cat ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setCategoria(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button type="button" className="bg-[#FF0000] text-white py-2 px-4 rounded hover:bg-red-700" onClick={() => navigate('/menu')}>
              Cancelar
            </button>
            <button type="submit" className="bg-[#66FF66] text-white py-2 px-4 rounded hover:bg-green-700">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ActualizarPlatillo;
