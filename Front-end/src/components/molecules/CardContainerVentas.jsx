

function CardContainerVentas({idpedido, IDMesa, FechaVenta, Total}){
    return(
        <>
        <div className="w-[525px] rounded-lg overflow-hidden shadow-lg m-2">
            <div className="flex pl-4 pb-2 bg-[#cccccc]">
                <h3 className="mt-2 mr-2">Mesa:{IDMesa}</h3>
                <p className="mt-2 mr-2">Peido:{idpedido}</p>
                <p className="mt-2 mr-2">Fecha:{FechaVenta}</p>
                <p className="mt-2 mr-2">Total:{Total}</p>
            </div>
        </div>
        </>
    )
}

export default CardContainerVentas