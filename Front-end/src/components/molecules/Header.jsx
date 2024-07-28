import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

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
      case '/Proveedores':
        return 'Proveedores';
      case '/Pedido':
        return 'Pedido';
      case '/AgregarMateriaPrima':
        return 'Agreagar Materia Prima';
      case '/agregar-proveedor':
        return 'Agregar Proveedor';
      case '/Ventas':
        return 'Ventas';
        case '/Usuario':
        return 'Usuario';
      default:
        if (location.pathname.startsWith('/Actualizar/')) {
          return 'Actualizar';
        }else if(location.pathname.startsWith('/ActualizarMateriaPrima/')){
        return 'Actualizar Materia Prima';
        }else if(location.pathname.startsWith('/actualizar-proveedor/')){
          return 'Actualizar Proveedor';
        }
        return 'LA TEHUANITA';
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Cerrar sesión',
      confirmButtonColor: '#66FF66',
      cancelButtonColor: '#FF0000',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <header className="bg-[#FF6600] flex items-center h-20 w-full">
      <div className="flex flex-grow items-center ml-4 ">
        <img src="/Logo.png" alt="Logo" className="w-16" />
        <div className="flex items-center ml-px mr-4">
          LA TEHUANITA
        </div>
        <div className="text-white text-2xl font-bold ml-[400px] right-9">
          {getPageTitle()}
        </div>
        <div className='ml-auto mr-4'>
          <button className='inline-flex items-center right-9'>
            <img src="./Proveedor.png" alt="" className='w-10 h-10' onClick={handleLogout}/>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;