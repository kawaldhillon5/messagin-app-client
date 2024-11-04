import { useEffect } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

export default function AuthChecker() {
    const user = useOutletContext();
    const navigate = useNavigate();

    useEffect(()=>{
        function check() {
            if(!user){
                navigate('/',{replace: true});
            }
        } check();
    },[user, navigate]);
    
    
    
    return <Outlet context={user}></Outlet>
}