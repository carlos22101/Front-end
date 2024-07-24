
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonM from '../atoms/ButtonM';
import CustomText from '../atoms/CustomText';
import Swal from 'sweetalert2';
import Button from '../atoms/Button';

const CardM = ({ item, onDelete }) => {
  const [VerBtns, setVerBtns] = useState(false)
  const navigate = useNavigate();

  const handlerClick = () => {
    setVerBtns(!VerBtns);
  };

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#66FF66',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = sessionStorage.getItem('token');
        fetch(`https://restauranteapi.integrador.xyz/api/Materia_Prima/${item.ID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token 
          }
        })
        .then(response => {
          if (response.ok) {
            onDelete(item.ID);
            Swal.fire(
              '¡Borrado!',
              'El elemento ha sido borrado.',
              'success'
            );
          } else {
            throw new Error('Error al borrar el elemento');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al borrar el elemento.',
            'error'
          );
        });
      }
    });
  };

  const handleUpdate = () => {
    navigate(`/ActualizarMateriaPrima/${item.ID}`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg m-2 w-64">
      <div className='pl-56 relative inline-block '>
        <Button onClick={handlerClick}>
          •••
        </Button>

        {VerBtns && (
          <div className='absolute right-9 top-1 translate-x-4 bg-white flex flex-col w-20'>
            <Button onClick={handleDelete}>Eliminar</Button>
            <Button onClick={handleUpdate}>Actualizar</Button>
          </div>
        )}
      </div>
      <div className="pl-4 pb-4 pr-4 bg-[#cccccc]">
        <CustomText className="font-bold text-lg mt-2">{item.Nombre}</CustomText>
        <CustomText>En el inventario existen</CustomText>
        <CustomText className="font-semibold">{item.Cantidad} unidades</CustomText>
      </div>
    </div>
  );
};

export default CardM;
