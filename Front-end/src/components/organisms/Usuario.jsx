import React, { useState, useEffect } from "react";
import Sidebar from "../molecules/Sidebar";
import Header from "../molecules/Header";
import Swal from "sweetalert2";

function Usuario() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://restauranteapi.integrador.xyz/api/Usuario");
        const data = await response.json();
        console.log("Datos del usuario:", data);
        setUser(data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Cambiar contraseña',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nueva contraseña">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Confirmar nueva contraseña">',
      focusConfirm: false,
      preConfirm: () => {
        const newPassword = document.getElementById('swal-input1').value;
        const confirmPassword = document.getElementById('swal-input2').value;

        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage('Las contraseñas no coinciden');
          return false;
        }

        return { newPassword };
      }
    });

    if (formValues) {
      try {
        const response = await fetch(`https://restauranteapi.integrador.xyz/api/Usuario/${user?.ID_Usuario}/password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: formValues.newPassword }),
        });

        if (response.ok) {
          Swal.fire('¡Contraseña actualizada!', '', 'success');
        } else {
          Swal.fire('Error al actualizar la contraseña', '', 'error');
        }
      } catch (error) {
        Swal.fire('Error al actualizar la contraseña', '', 'error');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="p-4">
          {user ? (
            <>
              <h1>Bienvenido, {user[0].Nombre}</h1>
              <p>ID de usuario: {user[0].ID_Usuario}</p>
              <button onClick={handleChangePassword} className="bg-blue-500 text-white px-4 py-2 rounded">
                Cambiar contraseña
              </button>
            </>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Usuario;
