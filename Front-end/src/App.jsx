import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/organisms/Login';
import Menu from './components/organisms/Menu';
import Usuario from './components/organisms/Usuario';
import Ventas from './components/organisms/Ventas';
import Pedido from './components/organisms/Pedido';
import MateriaPrima from './components/organisms/MateriaPrima';
import Categoria from './components/organisms/Categoria';
import Proveedores from './components/organisms/Proveedores';
import Home from './components/pages/Home';
import AgregarPlatillo from './components/molecules/AgregarPlatillo';
import ActualizarPlatillo from './components/molecules/ActualizarPlatillo';
import AgregarMateriaPrima from './components/molecules/AgregarMateriaPrima';
import ActualizarMateriaPrima from './components/molecules/ActualizarMateriaPrima';
import AgregarProveedor from './components/pages/AgregarProveedor';
import ActualizarProveedor from './components/pages/ActualizarProveedor';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/Home' element={<Home/>}/>
        <Route path="/Menu" element={<Menu />} />
        <Route path='/Usuario' element={<Usuario/>}/>
        <Route path='/Ventas' element={<Ventas/>}/>
        <Route path='/Proveedores' element={<Proveedores/>}/>
        <Route path='/Categoria' element={<Categoria/>}/>
        <Route path='/Pedido' element={<Pedido/>}/>
        <Route path='/MateriaPrima' element={<MateriaPrima/>}/>
        <Route path='/AgregarPlatillo' element={<AgregarPlatillo/>}/>
        <Route path='/Actualizar/:id' element={<ActualizarPlatillo/>}/>
        <Route path='/AgregarMateriaPrima' element={<AgregarMateriaPrima/>}/>
        <Route path='/ActualizarMateriaPrima/:id' element={<ActualizarMateriaPrima/>}/>
        <Route path='/agregar-proveedor' element={<AgregarProveedor/>}/>
        <Route path='/actualizar-proveedor/:ID_Proveedor' element={<ActualizarProveedor/>}/>
      </Routes>
    </Router>
  );
};

export default App;