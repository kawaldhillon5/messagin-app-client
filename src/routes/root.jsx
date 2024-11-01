import { Link, Outlet, useLoaderData } from "react-router-dom";
import "../css/root_css.css";
import { getUser } from "../functions/functions";
import { useState } from "react";

export async function loader() {
    
    let user = null;

    try{
        const res = await getUser();
        if(res){
            if(res.status === 200){
                user = res
                return user; 
            } else if(res.status === 404) {
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
    console.log(user);

    return (
        <>
            <header>
                <Link className="header_title header_link">Messaging App</Link>
                <div className="header_links">
                    <Link className="header_link">Chats</Link>
                    <Link className="header_link">Friends</Link>
                    <Link className="header_link">About</Link>
                    <div className="header_user header_link">
                    {   user.isLoged ? 
                        <Link className="header_link" >LogOut</Link> : 
                        <Link className="header_link">LogIn</Link>
                    }
                </div>
                </div>
            </header>
            <div id="root_content">
                <Outlet></Outlet>
            </div>
            <footer>
                <span>By</span>
                <a href="https://github.com/kawaldhillon5" target="_blank" >Kawal dhillon</a>
            </footer>
        </>
    )
}