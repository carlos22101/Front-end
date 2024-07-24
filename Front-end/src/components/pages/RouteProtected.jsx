import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../context/userContext";

function RouteProtected (){
    const value = useContext(UserContext)
    return( value.user.name? <Outlet/> : <Navigate to="/"/>)
}
 export default RouteProtected;
