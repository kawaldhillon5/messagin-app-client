import { Link } from "react-router-dom";

export default function ChatNavbar(){
    return (
        <>
            <div id="chatNavbar_title">Chats</div>
            <ul id="chatNavbar_chat_div">
                <li className="chatNavbar_chat_item" ><Link>Chat 1</Link></li>
                <li className="chatNavbar_chat_item"><Link>Chat 2</Link></li>
                <li className="chatNavbar_chat_item"><Link>Chat 3</Link></li>
                <li className="chatNavbar_chat_item"><Link>Chat 4</Link></li>
            </ul>
        </>
    )
}