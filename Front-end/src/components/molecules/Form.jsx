import React, { useState } from 'react';
import Inputlogin from '../atoms/InputLogin';
import ButtonLogin from '../atoms/ButtonLogin';

const Form = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}  className='items-center'>
      <h2 className='text-center text-2xl mb-4'>Sign In</h2>
      <div className='mb-4 rounded'>
        <Inputlogin
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <Inputlogin
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='text-center'>
        <ButtonLogin type='submit'>Login</ButtonLogin>
      </div>
    </form>
  );
};

export default Form;