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
                required />
            </div>
            <div className="flex justify-between mt-7">
              <Button type="button" Style={'bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700'} onClick={() => navigate('/MAteriaPrima')}>Cancelar</Button>
              <Button type="submit" Style={"bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"}>Agregar</Button>
            </div>
          </form>
        </div>
    </>
  );
}

export default AgregarMateriaPrima;
