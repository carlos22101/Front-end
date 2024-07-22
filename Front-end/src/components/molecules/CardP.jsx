import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

const CardP = ({ ID_Proveedor, Nombre, Contacto, Informacion, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [VerBtns, setVerBtns] = useState(false)

  const handlerClick = () =>{
    setVerBtns(!VerBtns);
  };

  const handleDelete = () => {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
      }
    });
  };

  const handleUpdate = () => {
    onUpdate();
    navigate(`/actualizar-proveedor/${ID_Proveedor}`);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 m-4 w-72 border border-gray-500">
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
      <div className="flex items-center mb-4">
        <img src="/Proveedor.png" alt="Proveedor" className="w-12 h-12 rounded-full bg-gray-300" />
        <div className="ml-4">
          <h3 className="text-lg font-bold">{Nombre}</h3>
          <p className="text-gray-600">{Contacto}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{Informacion}</p>
    </div>
  );
};

export default CardP;

