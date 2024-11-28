import { Form, Link, Outlet, redirect, useLoaderData } from "react-router-dom";
import "../css/root_css.css";
import { getUser, logOut } from "../functions/functions";
import { useState } from "react";
import ChatNavbar from "../components/navbar";

export async function action() {
    await logOut();
    return redirect('/');
}

export async function loader() {
    
    let user = null;

    try{
        const res = await getUser();
        if(res){
            if(res.status === 200){
                user = res.user
                return user; 
            } else if(res.status === 401) {
                return user;
            } else {
                throw new Error("Cannot get user");
            }
        } throw new Error("Server Error");
    } catch(error){
        console.log(error.message);
        throw error
        
    }

}

export default function Root(){

    const user = useLoaderData();

    return (
        <>
            <header>
                <Link className="header_title header_link">Messaging App</Link>
                <div className="header_links">
                    { user 
                        ?
                        <Link to={`${user.userId}/friends`} className="header_link">Friends</Link> 
                        :
                        null
                    }
                    <Link className="header_link">About</Link>
                    {   user ? 
                            <Form className="header_link" method="post"><button type="submit" >LogOut</button></Form>
                            : 
                            <Link to={"auth/logIn"} className="header_link">LogIn</Link>
                    }
                    {
                        user ? 
                            <Link ><img className="header_link" id="header_link_user_avatar" src={`https://robohash.org/${user.userId}.png?size=40x40`} alt="" /></Link> 
                            :
                            null
                    }
                </div>
            </header>
            <div id="root_content">
                {/* <div id="root_navbar"><ChatNavbar></ChatNavbar></div> */}
                <div id="root_outlet"><Outlet context={user}></Outlet></div>
            </div>
            <footer>
                <span>By</span>
                <a href="https://github.com/kawaldhillon5" target="_blank" >Kawal dhillon</a>
            </footer>
        </>
    )
}