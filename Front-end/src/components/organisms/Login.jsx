import React from 'react';
import Form from '../molecules/Form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext';
import { useContext } from 'react';
const Login = () => {
  const navigate = useNavigate();
  const value = useContext(UserContext)
  const handleSubmit = ({ username, password }) => {
    const url = 'https://restauranteapi.integrador.xyz/api/auth/Login';
    console.log('Fetching URL:', url);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username, 
        password: password  
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`¡Error HTTP! estado: ${response.status}`);
      }
      return response.json();
    })
    .then(body => {
      console.log('Cuerpo de la respuesta:', body);
      const { token } = body;
      value.setUser({"name": body.username})
      if (token) {
        sessionStorage.setItem('token', token); 
        Swal.fire('¡Éxito!', 'Has iniciado sesión correctamente', 'success')
        .then(() => {
          
          navigate('/Home');
        });
      } else {
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
            <div>
              <img src="./Logo.png" alt="Imagen" className="h-32 pl-16"/>
            </div>
            <Form onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default Login;
