import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../molecules/Header';
import CustomText from '../atoms/CustomText';
import InputM from '../atoms/Input';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';

function ActualizarMateriaPrima() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch(`https://restauranteapi.integrador.xyz/api/Materia_Prima/${id}`,{
      headers: {
        'x-access-token': token, 
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setNombre(data.Nombre);
        setCantidad(data.Cantidad);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleSubmit = (event) => {
    const token = sessionStorage.getItem('token');
    event.preventDefault();
    fetch(`https://restauranteapi.integrador.xyz/api/Materia_Prima/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({
        Nombre: nombre,
        Cantidad: parseInt(cantidad, 10)
      })
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        title: '¡Actualizado!',
        text: 'Materia Prima actualizada exitosamente',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/MateriaPrima');
      });
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire(
        'Error',
        'Hubo un problema al actualizar el elemento.',
        'error'
      );
    });
  };

  const handleCancel = () => {
    navigate('/MateriaPrima');
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
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
              />
            </div>
            <div>
              <CustomText className="block font-medium text-gray-700 mt-7">Cantidad:</CustomText>
              <InputM 
                type="number" 
                value={cantidad} 
                onChange={(e) => setCantidad(e.target.value)} 
                required 
              />
            </div>
            <div className="flex justify-between mt-7">
              <Button type="button" Style={"bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"} onClick={handleCancel}>Cancelar</Button>
              <Button type="submit" Style={"bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"}>Confirmar</Button>
            </div>
          </form>
      </div>
    </>
  );
}

export default ActualizarMateriaPrima;
