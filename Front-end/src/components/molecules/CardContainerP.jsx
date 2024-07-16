import React, { useEffect, useState } from 'react';
import CardP from './CardP';
import Swal from 'sweetalert2';

const CardContainerP = ({ searchValue }) => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    fetch('https://restauranteapi.integrador.xyz/api/Proveedores')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los proveedores');
        }
        return response.json();
      })
      .then((data) => {
        setProveedores(data);
      })
      .catch((error) => {
        console.error('Error fetching proveedores:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al cargar los proveedores',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }, []);

  const handleUpdate = (ID_Proveedor) => {
    console.log(`Actualizar proveedor con ID: ${ID_Proveedor}`);
  };

  const handleDelete = (ID_Proveedor) => {
    fetch(`https://restauranteapi.integrador.xyz/api/Proveedores/${ID_Proveedor}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setProveedores(proveedores.filter((p) => p.ID_Proveedor !== ID_Proveedor));
          Swal.fire({
            title: 'Eliminado',
            text: 'El proveedor ha sido eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          throw new Error('Error al eliminar el proveedor');
        }
      })
      .catch((error) => {
        console.error('Error eliminando proveedor:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al eliminar el proveedor',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  };

  return (
    <div className="flex flex-wrap justify-center">
      {proveedores
        .filter((proveedor) =>
          proveedor.Nombre.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((proveedor) => (
          <CardP
            key={proveedor.ID_Proveedor}
            ID_Proveedor={proveedor.ID_Proveedor}
            Nombre={proveedor.Nombre}
            Contacto={proveedor.Contacto}
            Informacion={proveedor.Informacion}
            onDelete={() => handleDelete(proveedor.ID_Proveedor)}
            onUpdate={() => handleUpdate(proveedor.ID_Proveedor)}
          />
        ))}
    </div>
  );
};

export default CardContainerP;
