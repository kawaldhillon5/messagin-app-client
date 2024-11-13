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
            {
                friends.length 
                        ?
                        friends.map(friend =>(<p>{friend}</p>))
                        :
                        <div id="no_friends_div">
                            <i id="no_friends_msg">No Friends</i>
                            <button onClick={()=>{navigate(`/${userId}/friends/addFriend`)}} >Add Friend</button>
                        </div> 
            }
        </div>
    )
}