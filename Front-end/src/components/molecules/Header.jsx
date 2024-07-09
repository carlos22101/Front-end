import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/Home':
        return 'Menú Principal';
      case '/Menu':
        return 'Menú';
      case '/AgregarPlatillo':
        return 'Agregar Platillo';
      case '/MateriaPrima':
        return 'Materia Prima';
      default:
        if (location.pathname.startsWith('/Actualizar/')) {
          return 'Actualizar';
        }
        return 'LA TEHUANITA';
    }
  };

  return (
    <>
      <header className="bg-orange-600 flex items-center h-20">
        <div className="flex items-center ml-4">
          <img src="/Logo.png" alt="Logo" className="w-16" />
          <div className="flex items-center ml-auto mr-4">
          LA TEHUANITA
        </div>
          <div className="text-white text-2xl font-bold ml-4">
            {getPageTitle()}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
