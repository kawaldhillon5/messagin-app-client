import { Form, useFetcher, useLoaderData, useOutletContext } from "react-router-dom";
import { getData, sendFriendReq } from "../functions/functions";

export async function action({request,params}) {
    const formData = await request.formData();
    const res = await sendFriendReq(params.userId);
    return {reqSent: true}
}

export async function loader({params}) {
    const [friends, reqsSent] = await Promise.all([
        getData(`data/${params.userId}/friends`), getData(`data/${params.userId}/friendReqsSent`)
        ]);
    let client = null;
    try{
        const res = await getData(`data/addFriend/user/${params.userId}`);
        if(res){
            client = res.data.user;
        } 
    } catch(error) {
        console.log(error);
    }
    return {client, friends, reqsSent};
}

export default function FriendDetail(){
    const fetcher = useFetcher();
    const {client, friends, reqsSent} = useLoaderData();

    let isFriend = false; 
    let reqSent = false;
    if(friends){friends.data.friends.map((friend)=>(friend.user._id === client._id? isFriend = true : null));
        if(!(isFriend)){
            if(reqsSent.data.reqsSent){
                reqsSent.data.reqsSent.map((req) =>( req.to._id = client._id ? reqSent = true : null))
            }
        }
    }
    console.log(`is Friend: ${isFriend}`);
    console.log(`reqSent: ${reqSent}`);
    return(
        <>
            <div id="add_friend_detail_div">
                <div id="add_friend_detail_img_div">
                    <img id="detail_user_avatar" src={`https://robohash.org/${client._id}.png?`} alt="" />  
                </div>
                <div id="add_friends_detail_name_div">
                    <div id="add_friend_detail_name">{client.userName}</div>
                    {   isFriend 
                        ? <button>Already Friends</button> 
                        : reqSent ? <button>Request Sent</button>
                        :<fetcher.Form method="post">
                            <button name="request">Add Friend</button>
                        </fetcher.Form>
                    }
                </div>
            </div>
        </>
    )
}