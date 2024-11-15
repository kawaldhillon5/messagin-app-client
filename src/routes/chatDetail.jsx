import { Form, redirect, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { getData, postMsg } from "../functions/functions"
import "../css/chat_css.css"
import { useEffect } from "react";

export async function action({request,params}) {
    const formData = await request.formData();
    const res = await postMsg(formData.get("message"),params.friendId);
    return redirect(`/friend/chat/${params.friendId}`);
}

export async function loader({request, params}) {

    const friend = await (await getData(`data/friend/chat/${params.friendId}`)).data;
    let chat = {}
    if(friend.chat.msgs.length){
        chat = (await getData(`data/chat/${friend.chat._id.toString()}`)).data;
    }
    return {friend, chat}
}

export default function ChatDetail() {

    const {friend, chat} = useLoaderData();
    const user = useOutletContext();
    const navigate = useNavigate();

    console.log(chat);
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
                <ul id="chat_content_list">
                    {chat.msgs.length ?
                        chat.msgs.map(msg=>(
                            <li className="chat_item_div" key={msg._id}><div className={msg.sentBy === user.userId ? "chat_item_right chat_item": "chat_item_left chat_item"}
                            >{msg.message}</div></li>
                        )) :
                        <div className="chat_no_msg">No Messages</div>
                    }
                </ul>
                <Form id="chat_content_form" method="post">
                    <input id="chat_content_input" type="text" name="message" placeholder="Type Your Message Here" />
                    <button type="submit">{`>`}</button>
                </Form>
            </div>
        </div>
    )
}