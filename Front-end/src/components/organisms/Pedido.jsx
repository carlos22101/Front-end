import Header from "../molecules/Header";
import Sidebar from "../molecules/Sidebar";
import CardContainerPedido from "../molecules/CardContainerPedido";

function Pedido(){
    return (
        <>
        <Header />
        <div className="flex">
            <Sidebar />
            <div className="w-full ml-[20px] mr-16 mt-8">
            <CardContainerPedido></CardContainerPedido>
            </div>
        </div>
        </>
    )
}
export default Pedido;