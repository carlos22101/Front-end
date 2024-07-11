import ButtonHome from "../atoms/ButtonHome";
import { Link } from "react-router-dom";

function Sidebar(){
return(
    <div className='w-40 h-screen border-solid bg-[#cccccc]'>
        <ButtonHome/>
        <ul className='pl-4'>
            <li className='mb-4'>
                <Link to="/Menu"> Platillo</Link>
            </li>
            <li className='mb-4'>
                <Link to="/MateriaPrima">Matria Prima</Link>
            </li>
            <li className='mb-4'>
                <Link to="/Usuario">Usuarios</Link>
            </li>
            <li className='mb-4'>
                <Link to="/Proveedores">Proveedores</Link>
            </li>
            <li className='mb-4'>
                <Link to="/Pedido">Pedido</Link>
            </li>
            <li className='mb-4'>
                <Link to="/Ventas">ventas</Link>
            </li>
        </ul>
    </div>
)
}
export default Sidebar;
