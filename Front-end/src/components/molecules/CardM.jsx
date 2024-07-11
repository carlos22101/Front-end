
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonM from '../atoms/Button';
import CustomText from '../atoms/CustomText';
import Swal from 'sweetalert2';

const CardM = ({ item, onDelete }) => {
  const navigate = useNavigate();

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
        fetch(`https://restauranteapi.integrador.xyz/api/Materia_Prima/${item.ID}`, {
          method: 'DELETE',
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
    <div className="border p-4 rounded shadow-md">
      <CustomText className="font-bold text-lg mt-2">{item.Nombre}</CustomText>
      <CustomText>En el inventario existen</CustomText>
      <CustomText className="font-semibold">{item.Cantidad} unidades</CustomText>
      <div className="flex justify-between mt-4">
        <ButtonM className="bg-blue-500 text-white" onClick={handleUpdate}>Actualizar</ButtonM>
        <ButtonM className="bg-red-500 text-white" onClick={handleDelete}>Eliminar</ButtonM>
      </div>
    </div>
  );
};

export default CardM;
