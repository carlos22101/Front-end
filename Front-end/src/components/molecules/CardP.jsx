import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CardP = ({ ID_Proveedor, Nombre, Contacto, Informacion, onDelete, onUpdate }) => {
  const navigate = useNavigate();

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
    <div className="bg-white shadow-md rounded p-4 m-4 w-64">
      <div className="flex items-center mb-4">
        <img src="/Proveedor.png" alt="Proveedor" className="w-12 h-12 rounded-full bg-gray-300" />
        <div className="ml-4">
          <h3 className="text-lg font-bold">{Nombre}</h3>
          <p className="text-gray-600">{Contacto}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{Informacion}</p>
      <div className="flex justify-between">
        <button onClick={handleUpdate} className="text-white-500 hover:text-blue-700">
          Actualizar
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CardP;

