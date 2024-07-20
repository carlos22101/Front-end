import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

function CardContainerPedido({id, total, statuspedido}) {
    const [VerBtns, setVerBtns] = useState(false);
    const navigate = useNavigate();

    const handlerClick = () => {
        setVerBtns(!VerBtns);
      };

    const handleDelete = () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: "No podrás revertir esta acción",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#66FF66',
          cancelButtonColor: '#ff0000',
          confirmButtonText: 'Sí, eliminarlo',
          cancelButtonText: 'No, cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`https://restauranteapi.integrador.xyz/api/Platillos/${id}`, {
              method: 'DELETE',
            })
              .then(response => {
                if (response.ok) {
                  Swal.fire(
                    '¡Eliminado!',
                    'El platillo ha sido eliminado.',
                    'success'
                  ).then(() => {
                    onDelete(id); 
                  });
                } else {
                  Swal.fire(
                    'Error',
                    'No se pudo eliminar el platillo.',
                    'error'
                  );
                }
              })
              .catch(error => {
                Swal.fire(
                  'Error',
                  'Error en la solicitud.',
                  'error'
                );
              });
          }
        });
      };

  return (
    <>
    <div className="border rounded-lg overflow-hidden shadow-lg m-2 w-64">
      <div className='border-2 border-solid border-black h-10 '>
        <img src="" alt="" />
      </div>
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
        <h3 className="font-bold text-lg">{id}</h3>
        <p className="text-gray-600">{total}</p>
        <p className="font-bold mt-2">${statuspedido}</p>
      </div>
    </div>
    </>
  );
}

export default CardContainerPedido;
