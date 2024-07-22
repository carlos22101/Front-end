import React from 'react';
import Form from '../molecules/Form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = ({ username, password }) => {
    const backendUrl = import.meta.env.VITE_URL_BACKEND;
    const url = `${backendUrl}/Usuario?Nombre=${encodeURIComponent(username)}&Contrasena=${encodeURIComponent(password)}`;
    console.log('Fetching URL:', url);
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(body => {
      console.log('Response body:', body);
      let userFound = false;
      
      for (let i = 0; i < body.length; i++) {
        const apiUsername = body[i].Nombre;
        const apiPassword = body[i].Contrasena;
  
        if (apiUsername == username && apiPassword == password) {
          userFound = true;
          Swal.fire('¡Éxito!', 'Has iniciado sesión correctamente', 'success')
          .then(() => {
            navigate('/Home');
          });
          break;
        }
      }
      
      if (!userFound) {
        Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
      }
    })
    .catch(error => {
      console.error('Error durante la autenticación:', error);
      Swal.fire('Error', 'Hubo un problema con la autenticación', 'error');
    });
  };
  

  return (
    <>
      <header className='bg-orange-600 flex items-center justify-between h-20 px-4'>
        <div className="flex items-center">
          <img src="./Logo.png" alt="Logo" className="h-12 mr-4" />
          <div>
            LA TEHUANITA
          </div>
        </div>
        <div className="text-white text-xl font-bold">
          Login
        </div>
      </header>
      <div className='flex justify-center pt-10 min-h-screen'>
        <div className="w-80 max-h-96 flex flex-col bg-gray-100 p-8 rounded-lg shadow-lg">
            <div >
              <img src="./Logo.png" alt="Imagen" className="h-32 pl-16"/>
            </div>
            <Form onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default Login;
