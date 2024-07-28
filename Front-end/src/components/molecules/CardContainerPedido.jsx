import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

function CardContainerPedido({ idpedido, IDMesa, Total, StatusPedido, onDelete, onUpdate }) {
  const [VerBtns, setVerBtns] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (StatusPedido === 1) {
      setStatus('Vendido');
    } else if (StatusPedido === 0) {
      setStatus('No vendido');
    }
  }, [StatusPedido]);

  const handlerClick = () => {
    setVerBtns(!VerBtns);
  };

  const handleDelete = () => {
    console.log(idpedido);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#66FF66',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const token = sessionStorage.getItem('token');
        fetch(`https://restauranteapi.integrador.xyz/api/Pedidos/${idpedido}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire('¡Eliminado!', 'El pedido ha sido eliminado.', 'success');
              onDelete(idpedido);
            } else {
              Swal.fire('Error', 'No se pudo eliminar el pedido.', 'error');
            }
          })
          .catch((error) => {
            Swal.fire('Error', 'Error en la solicitud.', 'error');
          });
      }
    });
  };

  const handleUpdate = () => {
    navigate('/agregarmaspedidos', { state: { id: IDMesa, IDPedido: idpedido } });
  };

  const handlerVenta = () => {
    const token = sessionStorage.getItem('token');
    const StatusPedido = true;

    fetch(`https://restauranteapi.integrador.xyz/api/Pedidos/${idpedido}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({
        IDMesa,
        Total,
        StatusPedido,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo actualizar el pedido');
        }
        return fetch('https://restauranteapi.integrador.xyz/api/Ventas/procesarPedido', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify({
            pedidoID: idpedido,
          }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo procesar el pedido');
        }
        return response.json(); // Procesa la respuesta como JSON si es necesario
      })
      .then((data) => {
        // Mostrar mensaje de éxito y realizar acciones adicionales
        Swal.fire({
          title: '¡Éxito!',
          text: 'Pedido actualizado y procesado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#66FF66',
        }).then(() => {
          onUpdate();
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#FF0000',
        });
      });
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden shadow-lg m-2 w-64">
        <div className="pl-56 relative inline-block">
          <Button onClick={handlerClick}>•••</Button>
          {VerBtns && (
            <div className="rounded-lg absolute right-9 top-1 translate-x-4 bg-white flex flex-col w-20">
              <Button Style={'bg-[#ff0000]'} onClick={handleDelete}>Eliminar</Button>
              <Button Style={'bg-[#66FF66]'} onClick={handleUpdate}>Actualizar</Button>
              <Button Style={'bg-[#f7ff02]'} onClick={handlerVenta}>Vendido</Button>
            </div>
          )}
        </div>
        <div className="flex pl-4 pb-4 pr-4 bg-[#cccccc]">
          <h3 className="mt-2 mr-2">Mesa: {IDMesa}</h3>
          <p className="mt-2 mr-2">Total: {Total}</p>
          <p className="mt-2 mr-2">Status: {status}</p>
        </div>
      </div>
    </>
  );
}

export default CardContainerPedido;
