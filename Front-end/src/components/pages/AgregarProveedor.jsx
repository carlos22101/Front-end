import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import InputP from '../atoms/InputP';
import ButtonP from '../atoms/ButtonP';
import Header from '../molecules/Header';
import { Helmet } from 'react-helmet-async';

const AgregarProveedor = () => {
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [informacion, setInformacion] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(contacto)) {
      setError('El contacto debe ser un número de 10 dígitos');
      return;
    }

    const nuevoProveedor = { Nombre: nombre, Contacto: contacto, Informacion: informacion };
    const token = sessionStorage.getItem('token');

    fetch('https://restauranteapi.integrador.xyz/api/Proveedores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(nuevoProveedor),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: 'Proveedor agregado',
          text: 'Se ha agregado el proveedor correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          navigate('/proveedores');
        });
      })
      .catch((error) => console.error('Error al agregar proveedor:', error));
  };

  const handleCancel = () => {
    navigate('/proveedores');
  };

  return (
    <>
      <Helmet>
        <title>Agregar</title>
      </Helmet>
      <Header />
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-4xl mt-5">
          <div>
            <label className="block font-medium text-gray-700 mt-5">Nombre:</label>
            <InputP
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mt-5">Contacto:</label>
            <InputP
              value={contacto}
              onChange={(e) => {
                setContacto(e.target.value);
                setError(''); // Clear error on change
              }}
              placeholder="Contacto"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700 mt-5">Informacion:</label>
            <InputP
              value={informacion}
              onChange={(e) => setInformacion(e.target.value)}
              placeholder="Informacion"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="flex justify-between mt-7">
            <ButtonP type="button" onClick={handleCancel} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cancelar
            </ButtonP>
            <ButtonP type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Aceptar y Agregar
            </ButtonP>
          </div>
        </form>
      </div>
    </>
  );
};

export default AgregarProveedor;
