import Swal from "sweetalert2";
import Button from "../atoms/Button";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CardSelecPedido() {
    const navigate = useNavigate();

    const mesas = [
        { id: 1, nombre: 'Mesa 1' },
        { id: 2, nombre: 'Mesa 2' },
        { id: 3, nombre: 'Mesa 3' },
        { id: 4, nombre: 'Mesa 4' },
        { id: 5, nombre: 'Mesa 5' },
        { id: 6, nombre: 'Mesa 6' },
        { id: 7, nombre: 'Mesa 7' },
        { id: 8, nombre: 'Mesa 8' },
    ];

    const [mesasOcupadas, setMesasOcupadas] = useState([]);

    useEffect(() => {
        const fetchMesasOcupadas = async () => {
            const token = sessionStorage.getItem('token'); 
            
            try {
                const response = await fetch('https://restauranteapi.integrador.xyz/api/Pedidos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token 
                    }
                });

                if (!response.ok) {
                    throw new Error(`¡Error HTTP! estado: ${response.status}`);
                }

                const data = await response.json();
                const mesasOcupadas = data.filter(pedido => pedido.IDMesa !== null).map(pedido => pedido.IDMesa);
                setMesasOcupadas(mesasOcupadas);
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
              
            }
        };

        fetchMesasOcupadas();
    }, []);

    const handlerClick = (id) => {
        if (mesasOcupadas.includes(id)) {
            Swal.fire({
                title: `Mesa ${id} está ocupada`,
                text: "La mesa que seleccionaste ya está siendo utilizada.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: '#66FF66'
            }).then(() => {
                navigate('/pedido');
            });
        } else {
            Swal.fire({
                title: `Mesa ${id}`,
                text: "¿Estás seguro de seleccionar esta mesa?",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
                preConfirm: () => {
                    return new Promise((resolve) => {
                        navigate(`/AgregarPedido`, { state: { id } });
                        resolve();
                    });
                }
            });
        }
    };

    return (
        <>
            <Header />
            <div className="flex bg-gray-100 justify-center">
                <h1 className="text-2xl font-bold">Seleccione una Mesa</h1>
            </div>
            <div className="flex flex-wrap justify-around ml-36 mr-36">
                {mesas.map((mesa) => (
                    <div key={mesa.id} className="rounded-xl border-2 border-solid border-black w-36 h-36 ml-10 mr-10 flex justify-around mt-8">
                        <Button Style={"bg-yellow-300 w-full rounded-xl"} onClick={() => handlerClick(mesa.id)}>{mesa.nombre}</Button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CardSelecPedido;
