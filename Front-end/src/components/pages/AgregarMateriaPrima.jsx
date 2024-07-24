import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../molecules/Header';
import CustomText from '../atoms/CustomText';
import InputM from '../atoms/Input';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';

function AgregarMateriaPrima() {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://restauranteapi.integrador.xyz/api/Materia_Prima', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          Nombre: nombre,
          Cantidad: parseInt(cantidad, 10),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          title: '¡Agregado!',
          text: 'Materia Prima agregada exitosamente',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/MateriaPrima');
        });
      } else {
        console.error('Error al agregar materia prima:', response.status);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo agregar la materia prima',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#FF0000',
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error en la solicitud',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FF0000',
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-4xl mt-5 h-72">
          <div>
            <CustomText className="block font-medium text-gray-700 mt-5">Nombre:</CustomText>
            <InputM 
              type="text" 
              placeholder="Ingresa el nombre"
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </div>
          <div>
            <CustomText className="block font-medium text-gray-700 mt-7">Cantidad:</CustomText>
            <InputM 
              type="number" 
              placeholder="Ingresa la cantidad"
              value={cantidad} 
              onChange={(e) => setCantidad(e.target.value)} 
              required 
            />
          </div>
          <div className="flex justify-between mt-7">
            <Button 
              type="button" 
              Style="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700" 
              onClick={() => navigate('/MateriaPrima')}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              Style="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Agregar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AgregarMateriaPrima;
