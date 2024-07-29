import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../molecules/Header';
import Button from '../atoms/Button';
import { Helmet } from 'react-helmet-async';

const ActualizarProveedor = () => {
  const navigate = useNavigate();
  const { ID_Proveedor } = useParams();

  const [proveedor, setProveedor] = useState({
    Nombre: '',
    Contacto: '',
    Informacion: ''
  });
  if (!Nombre || !Contacto || !Informacion) {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, llene todos los campos',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#FF0000',
    });
    return;
  }

  useEffect(() => {
    if (ID_Proveedor) {
      const token = sessionStorage.getItem('token');
      fetch(`https://restauranteapi.integrador.xyz/api/Proveedores/${ID_Proveedor}`,{
        headers: {
        'x-access-token': token, 
        'Content-Type': 'application/json'
      }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener el proveedor');
          }
          return response.json();
        })
        .then((data) => {
          setProveedor(data);
        })
        .catch((error) => {
          console.error('Error fetching proveedor:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al cargar el proveedor',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
    }
  }, [ID_Proveedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor((prevProveedor) => ({
      ...prevProveedor,
      [name]: value
    }));
  };

  const handleConfirmar = async () => {
    try {
      const token = sessionStorage.getItem('token');  
      const response = await fetch(`https://restauranteapi.integrador.xyz/api/Proveedores/${ID_Proveedor}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(proveedor),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      Swal.fire({
        title: 'Actualizado',
        text: 'El proveedor ha sido actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        navigate('/Proveedores');
      });
    } catch (error) {
      console.error('Error updating proveedor:', error);
      Swal.fire({
        title: 'Error',
        text: `Hubo un error al actualizar el proveedor: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleCancelar = () => {
    navigate('/Proveedores');
  };

  return (
    <>
      <Helmet>
        <title>Actualizar</title>
      </Helmet>
      <Header />
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <form className="bg-white p-8 rounded shadow-md w-full max-w-4xl mt-5">
          <div>
            <label className="block font-medium text-gray-700 mt-5">Nombre:</label>
            <input
              type="text"
              name="Nombre"
              value={proveedor.Nombre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mt-5">Contacto:</label>
            <input
              type="text"
              name="Contacto"
              value={proveedor.Contacto}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mt-5">Información:</label>
            <textarea
              name="Informacion"
              value={proveedor.Informacion}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-between mt-7">
            <Button
              type="button"
              onClick={handleCancelar}
              Style="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirmar}
              Style="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Confirmar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ActualizarProveedor;