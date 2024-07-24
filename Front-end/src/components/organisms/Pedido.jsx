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

    const fetchPedidos = () => {
        const token = sessionStorage.getItem('token');
        fetch(`https://restauranteapi.integrador.xyz/api/Pedidos`,{
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token 
              }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setPedido(data);
          });
    };

    useEffect(() => {
        fetchPedidos();
      }, []);

    const handleDeletePedido = (idpedido) => {
        setPedido(pedido.filter(p => p.IDPedido !== idpedido));
    };

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
                <div className= " p-4 overflow-y-auto max-h-[520px] border border-gray-300">
                    {Array.isArray(pedido) && pedido.map(p => (
                        <CardContainerPedido key={p.IDPedido} idpedido={p.IDPedido} IDMesa={p.IDMesa} Total={p.Total} StatusPedido={p.StatusPedido} onDelete={handleDeletePedido} onUpdate={fetchPedidos}/>
                    ))}
                </div>
            </div> 
        </div>
        </>
    )
}
export default Pedido;