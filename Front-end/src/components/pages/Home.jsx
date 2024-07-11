import Header from "../molecules/Header";
import Sidebar from "../molecules/Sidebar";

function Home(){
    return(
        <>  
        <Header></Header>
            <div className="flex">
                <Sidebar></Sidebar>
                <div className="h-screen w-screen flex items-center justify-center">
                    <img src="Logo.png" alt="" className="w-96 h-96"/>
            </div>
        </div>
        </>
    )
}
export default Home;