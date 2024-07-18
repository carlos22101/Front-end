import Swal from "sweetalert2";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

function CardContainerPedido() {
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

    const handlerClick = (id) => {
        switch(id) {
            case 1:
                return Swal.fire({
                    title: `Mesa ${id}`,
                    text: "¿Estas seguro de seleccionar esta mesa?",
                    showConfirmButton: true,
                    preConfirm: () => navigate('/AgregarPlatillo')
                });                  
            case 2:
                return Swal.fire({
                    title: "The Internet?",
                    text: "That thing is still around?",
                    icon: "warning"
                });
            case 3:
                return Swal.fire({
                    title: "The Internet?",
                    text: "That thing is still around?",
                    icon: "question"
                });                  
            case 4:
                return Swal.fire({
                    title: "The Internet?",
                    text: "That thing is still around?",
                    icon: "warning"
                });
            case 5:
                return Swal.fire({
                    title: "The Internet?",
                    text: "That thing is still around?",
                    icon: "question"
                });                  
            case 6:
                return Swal.fire({
                    title: "The Internet?",
                    text: "That thing is still around?",
                    icon: "warning"
                });
            case 7:
                return Swal.fire({
                    title: "The Internet?",
                    text: "That thing is still around?",
                    icon: "question"
                });                  
            case 8:
                return Swal.fire({
                    title: "The Internet?",
                    text: "That thing is still around?",
                    icon: "success"
                });
        }
    }

    return (
        <div className="flex flex-wrap justify-around">
            {mesas.map((mesa) => (
                <div key={mesa.id} className="rounded-xl border-2 border-solid border-black w-36 h-36 ml-10 mr-10 flex justify-around mt-8">
                    <Button Style={"bg-yellow-300 w-full rounded-xl"} onClick={() => handlerClick(mesa.id)}>{mesa.nombre}</Button>
                </div>
            ))}
        </div>
    );
}

export default CardContainerPedido;
