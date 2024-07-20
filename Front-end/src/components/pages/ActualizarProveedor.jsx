import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../molecules/Header';

const ActualizarProveedor = () => {
  const navigate = useNavigate();
  const { ID_Proveedor } = useParams();

  const [proveedor, setProveedor] = useState({
    Nombre: '',
    Contacto: '',
    Informacion: ''
  });

  useEffect(() => {
    console.log('ID capturado:', ID_Proveedor);

    if (ID_Proveedor) {
      fetch(`https://restauranteapi.integrador.xyz/api/Proveedores/${ID_Proveedor}`)
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

  const handleConfirmar = () => {
    fetch(`https://restauranteapi.integrador.xyz/api/Proveedores/${ID_Proveedor}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(proveedor)
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            title: 'Actualizado',
            text: 'El proveedor ha sido actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            navigate('/Proveedores');
          });
        } else {
          throw new Error('Error al actualizar el proveedor');
        }
      })
      .catch((error) => {
        console.error('Error updating proveedor:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al actualizar el proveedor',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  };

  const handleCancelar = () => {
    navigate('/Proveedores');
  };

  return (
    <>
      <Header/>
      <div className="p-4">
        <h2>Actualizar Proveedor</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre:</label>
            <input
              type="text"
              name="Nombre"
              value={proveedor.Nombre}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contacto:</label>
            <input
              type="text"
              name="Contacto"
              value={proveedor.Contacto}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Información:</label>
            <textarea
              name="Informacion"
              value={proveedor.Informacion}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <button type="button" onClick={handleConfirmar} className="bg-green-500 text-white px-4 py-2 mr-2">
              Confirmar
            </button>
            <button type="button" onClick={handleCancelar} className="bg-[#FF0000] text-white px-4 py-2">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ActualizarProveedor;


