import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getData, postFriendReqChoice } from "../functions/functions";
import AcceptReject from "../components/acceptRejectComponent";
import { useEffect, useState } from "react";

export async function loader({params}) {
    const reqs = await getData(`data/${params.userId}/friendReqs`);
    return reqs;
}



export default function FriendReqs() {
    const reqs = useLoaderData().data.reqs;
    const userId = useParams().userId; 
    const navigate = useNavigate();

    async function submitFunc(id, choice){
        const res = await postFriendReqChoice(id, choice);
        console.log(res);
        res.status === 200 ? navigate(`/${userId}/friendReqs`): null
        return;
    }

    return (
        
        <div id="friend_req_div">
            <div id="friend_req_div_header">Friend Requests</div>
            <ul id="friend_req_list_div">
                {
                    reqs.length ?
                            reqs.map(req =>(
                                <li className="friend_req_list_item" key={req._id}>
                                    <ListItem req={req} submitFunc={submitFunc} ></ListItem>
                                </li>
                            ))
                    : <li className="friend_req_list_item">No Request</li>
                }
            </ul>
        </div>
    )
}

function ListItem({req ,submitFunc}) {
    const [options, setOptions] = useState(false);

    useEffect(()=>{
        options ? document.querySelector("#accept_label").classList.add("labelActive"): null; 
    },[options])

    const onClickFunc = ()=> {
        options ? setOptions(false) : setOptions(true)
    }

    return(
        <>
            <div className="req_top">
                <div className="req_top_info">
                    <div className="friend_req_item_userName">{req.from.userName}</div>
                    <div className="friend_req_item_date">{req.dateCreated}</div>
                </div>
                <button className="editor_req_options_button" onClick={onClickFunc} >⫶</button>
            </div>
            {
                options ? 
                <AcceptReject req = {req._id} submitFunc={submitFunc} />
                :
                null
            }
        </>
           
    )
}