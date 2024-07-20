import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../molecules/Header';
import CustomText from '../atoms/CustomText';
import InputM from '../atoms/Input';
import ButtonM from '../atoms/Button';
import Swal from 'sweetalert2';

function ActualizarMateriaPrima() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restauranteapi.integrador.xyz/api/Materia_Prima/${id}`)
      .then(response => response.json())
      .then(data => {
        setNombre(data.Nombre);
        setCantidad(data.Cantidad);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://restauranteapi.integrador.xyz/api/Materia_Prima/${id}`, {
      method: 'PUT',
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
      <div className="flex">
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Actualizar Materia Prima</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex space-x-4">
              <ButtonM type="submit" className="bg-[#66FF66] text-white">Confirmar</ButtonM>
              <ButtonM type="button" className="bg-[#FF0000] text-white" onClick={handleCancel}>Cancelar</ButtonM>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ActualizarMateriaPrima;
