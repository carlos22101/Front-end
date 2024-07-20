import Header from "../molecules/Header";
import Sidebar from "../molecules/Sidebar";
import ButtonP from "../atoms/ButtonP";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardContainerPedido from "../molecules/CardContainerPedido";


function Pedido(){
    const navigate = useNavigate();
    const [pedido, setPedido] = useState([]);

    const handleAddClick = () => {
        navigate('/SeleccionarPedido');
    };

    useEffect(() => {
        fetch(`https://restauranteapi.integrador.xyz/api/Pedidos`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setPedido(data);
          });
      }, []);


    return (
        <>
        <Header />
        <div className="flex">
            <Sidebar />  
            <div className="w-full">
                <div className="flex justify-between items-center p-4 bg-gray-100">
                    <h1 className="text-3xl font-bold">Pedido</h1>
                    <ButtonP onClick={handleAddClick} className="flex-shrink-0 ml-4 ">
                        Agregar
                    </ButtonP>        
                </div>
                <div>
                    {Array.isArray(pedido) && pedido.map(p => (
                        <CardContainerPedido id={p.IDMesa} total={p.Total} statuspedido={p.StatusPedido} />
                    ))}
                </div>
            </div> 
        </div>
        </>
    )
}
export default Pedido;