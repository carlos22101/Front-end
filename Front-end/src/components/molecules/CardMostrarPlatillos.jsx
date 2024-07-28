
import { useEffect, useState } from "react"

function CardMostarPlatillos({IDMesa}){
    const [platillos, setPlatillos] = useState([]);

    const fetchPedidos = () => {
        const token = sessionStorage.getItem('token');
        fetch(`https://restauranteapi.integrador.xyz/api/DetallePedido/mesa/${IDMesa}`,{
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token 
              }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setPlatillos(data);
          });
    };

    useEffect(() => {
        fetchPedidos();
      }, []);   

    return(
        <>
        <div className="mt-2 p-1 border-2 border-gray-700 rounded-lg">
            {Array.isArray(platillos) && platillos.map(pl=>(
                <div>Nombre:{pl.NombrePlatillo} Precio:{pl.Precio} Cantidad:{pl.Cantidad} Subtotal:{pl.Subtotal}</div>
            ))}
        </div>
        </>
    )
}

export default CardMostarPlatillos