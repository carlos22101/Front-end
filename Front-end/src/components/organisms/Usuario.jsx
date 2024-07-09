import Header from "../molecules/Header";
import Sidebar from "../molecules/Sidebar";

function Usuario(){
    return (
        <>
        <Header></Header>
        <div className="flex">
            <Sidebar></Sidebar>
            <div ></div>
        </div>
        </>        
    )
}
export default Usuario;