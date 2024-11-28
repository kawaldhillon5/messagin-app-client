import { Form, redirect, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { getData, postMsg } from "../functions/functions"
import "../css/chat_css.css"
import { useEffect, useState } from "react";

// export async function action({request,params}) {
//     const formData = await request.formData();
//     const res = await postMsg(formData.get("message"),params.friendId);
//     return redirect(`/friend/chat/${params.friendId}`);
// }

export async function loader({request, params}) {

    const friend = await (await getData(`data/friend/chat/${params.friendId}`)).data;
    // let chat = {msgs:[]};
    // if(friend.chat.msgs.length){
    //     chat = (await getData(`data/chat/${friend.chat._id.toString()}`)).data;
    // }
    return {friend}
}

export default function ChatDetail() {

    const {friend} = useLoaderData();
    const user = useOutletContext();
    const navigate = useNavigate();

    useEffect(()=>{
        document.querySelector("#chat_content_input").value = "";
    });
    
    return (
        <div id="chat_div">
            <div id="chat_header_div">
                <div id="chat_header_username">{friend.user.userName}</div>
                <div id="chat_header_avatar"><img src={`https://robohash.org/${friend.user._id}.png?`} alt="" /></div>
            </div>
            <div id="chat_content_div">
                <div id="chat_content_title">Messages</div>
                {/* <ul id="chat_content_list">
                    {chat.msgs.length ?
                        chat.msgs.map(msg=>(
                            <li className="chat_item_div" key={msg._id}><div className={msg.sentBy === user.userId ? "chat_item_right chat_item": "chat_item_left chat_item"}
                            >{msg.message}</div></li>
                        )) :
                        <div className="chat_no_msg">No Messages</div>
                    }
                </ul> */}
                <ChatComponent user={user} friend={friend} ></ChatComponent>
            </div>
        </div>
    )
}

function ChatComponent({user, friend}) {
    const [chat, setChat] = useState([]);
    const [sockt, setSocket] = useState(null);

    useEffect(()=>{
        const func = async function(){
            if(friend.chat.msgs.length){
            const res = (await getData(`data/chat/${friend.chat._id.toString()}`)).data;
            setChat(res);
            } 
        }
        func();
        const socket = new WebSocket(`ws://10.0.0.17:8080/${user.userId}`);
        setSocket(socket);
        socket.addEventListener('open', () => {
        console.log('Connected to WebSocket server.');
        });
        socket.addEventListener('message', (event) => {
            console.log(JSON.parse(event.data.toString()))
            console.log(JSON.parse(event.data.toString()));
            setChat((chat)=>([...chat,JSON.parse(event.data.toString())]));
        });
        return ()=>{
            socket.close();
        }   
    },[]);

    useEffect(()=>{
        const elm = document.querySelector("#chat_content_list");
        elm.scrollTop = elm.scrollHeight;   
    },[chat]);


    async function sendMsg(input, friend) {
        sockt.send(JSON.stringify({id:friend._id, msg:input, userWsId:friend.user._id}));
        document.querySelector("#chat_content_input").value ="";
    }

    return(
        <>
            <ul id="chat_content_list">
                        {chat.length ?
                            chat.map(msg=>(
                                <li className="chat_item_div" key={msg._id}><div className={msg.sentBy === user.userId ? "chat_item_right chat_item": "chat_item_left chat_item"}
                                >{msg.message}</div></li>
                            )) :
                            <div className="chat_no_msg">No Messages</div>
                        }
            </ul>
            <form onSubmit={(e)=>{e.preventDefault()}} id="chat_content_form" method="post">
                    <input id="chat_content_input" type="text" name="message" placeholder="Type Your Message Here" />
                    <button type="submit" onClick={()=>{sendMsg(document.querySelector("#chat_content_input").value,friend)}} >{`>`}</button>
            </form>
        </>
    )

}