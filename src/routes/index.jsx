import { Link, useOutletContext } from "react-router-dom"
import "../css/index_css.css"

export default function Index(){
    const user = useOutletContext();
    return (
        <div id="index_main_div">
            <div id="index_wlcm_msg">Welcome to the Messaging App</div>
            {
                (user === null) ? 
                <div id="index_auth_div">
                    <Link to={"auth/logIn"}>Log In</Link>
                    <span>Or</span>
                    <Link to={"auth/signUp"}>Sign Up</Link>
                </div> :
                <div id="index_userName">{user.userName}</div>
            }
        </div>
    )
}