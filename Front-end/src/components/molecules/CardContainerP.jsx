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

  const handleUpdate = (id) => {
    console.log(`Actualizar proveedor con ID: ${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {proveedores
        .filter((proveedor) =>
          proveedor.Nombre.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((proveedor) => (
          <CardP
            key={proveedor.ID}
            ID={proveedor.ID}
            Nombre={proveedor.Nombre}
            Contacto={proveedor.Contacto}
            Informacion={proveedor.Informacion}
            onDelete={(id) => {
              setProveedores(proveedores.filter((p) => p.ID !== id));
            }}
            onUpdate={handleUpdate}
          />
        ))}
    </div>
  );
};

export default CardContainerP;