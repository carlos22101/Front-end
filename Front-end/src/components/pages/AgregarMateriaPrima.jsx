import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../molecules/Header';
import CustomText from '../atoms/CustomText';
import InputM from '../atoms/Input';
import ButtonM from '../atoms/Button';
import Swal from 'sweetalert2';

function AgregarMateriaPrima() {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://restauranteapi.integrador.xyz/api/Materia_Prima', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Nombre: nombre,
        Cantidad: parseInt(cantidad, 10)
      })
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        title: '¡Agregado!',
        text: 'Materia Prima agregada exitosamente',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/MateriaPrima');
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  const handleCancel = () => {
    navigate('/MateriaPrima')
  }

  return (
    <>
      <Header />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Agregar Materia Prima</h1>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
            <div>
              <CustomText className="block mb-2">Nombre:</CustomText>
              <InputM 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
              />
            </div>
            <div>
              <CustomText className="block mb-2">Cantidad:</CustomText>
              <InputM 
                type="number" 
                value={cantidad} 
                onChange={(e) => setCantidad(e.target.value)} 
                required 
              />
            </div>
            <div><ButtonM type="button" onClick={handleCancel} style="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cancelar
          </ButtonM ></div>
            <ButtonM style='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' type="submit">Agregar</ButtonM>
          </form>
        </div>
    </>
  );
}

export default AgregarMateriaPrima;
