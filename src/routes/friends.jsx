import {  useLoaderData, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getData } from "../functions/functions";
import "../css/friends_css.css";

export async function loader({params}) {
    const res = await getData(`data/${params.userId}/friends`);
    return res.data.friends
}

export default function Friends() {
    
    const friends = useLoaderData();
    const navigate = useNavigate();
    const userId = useParams().userId; 

    return (
        <div id="friends_div">
            <div id="friends_div_header">
                {
                    friends.length ?
                    <button onClick={()=>{navigate(`/${userId}/friends/addFriend`)}}
                    >Add Friends</button>
                    : null
                }
                <button onClick={()=>{navigate(`/${userId}/friendReqs`)}}>Requests</button>
            </div>
            <div id="friends_div_content">
                <div id="friends_div_title">All Friends </div>
                {
                    friends.length 
                            ?
                            <ul id="friends_div_list">{
                                friends.map(friend =>(<li onClick={()=>{navigate(`/friend/chat/${friend._id}`)}} className="friends_div_list_item" key={friend._id}>
                                    <div className="friends_list_item_name">{friend.user.userName}</div>
                                    <div className="friends_list_item_date">{friend.friendSince}</div>
                                </li>))}
                            </ul>    
                            :
                            <div id="no_friends_div">
                                <i id="no_friends_msg">No Friends</i>
                                <button onClick={()=>{navigate(`/${userId}/friends/addFriend`)}} >Add Friend</button>
                            </div> 
                }
            </div>
        </div>
    )
}