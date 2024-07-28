import React, { useState, useEffect } from "react";
import Sidebar from "../molecules/Sidebar";
import Header from "../molecules/Header";
import Swal from "sweetalert2";

function Usuario() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://restauranteapi.integrador.xyz/api/auth/me", {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token 
          }
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        console.log("Datos del usuario:", data);

        if (data) {
          setUser(data); 
        } else {
          throw new Error("Usuario no encontrado en la respuesta de la API");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        Swal.fire("Error", "No se pudieron obtener los datos del usuario. Por favor, intenta nuevamente.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Cambiar contraseña',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nueva contraseña" type="password">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Confirmar nueva contraseña" type="password">',
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
        const token = sessionStorage.getItem('token');
        const response = await fetch("https://restauranteapi.integrador.xyz/api/auth/update-password", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify({ newPassword: formValues.newPassword }),
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
        <div className="p-4 flex flex-col items-center w-full">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          ) : user ? (
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
              <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.username}</h1>
              <p className="text-gray-700 mb-4">ID de usuario: {user.id}</p>
              <button onClick={handleChangePassword} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Cambiar contraseña
              </button>
            </div>
          ) : (
            <p>No se encontró el usuario</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Usuario;
