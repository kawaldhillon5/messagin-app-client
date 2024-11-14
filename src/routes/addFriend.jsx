import { Form, Link, useLoaderData, useNavigation, useOutletContext, useSubmit } from "react-router-dom";
import { getData } from "../functions/functions";
import { useEffect } from "react";

export async function loader({request, params}) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    let users = [];
    try{
        const res = await getData(`data/users/${q}`);
        if(res){
            users = res.data;
        }
    } catch(error){
        console.log(error);
    } 
    return {users, q};
}

export default function AddFriend() {
    const {users, q}= useLoaderData();
    const submit = useSubmit();
    const navigation = useNavigation();
    const mainUser = useOutletContext();

    const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

    useEffect(() => {
        document.getElementById("add_friend_search_in").value = q;
      }, [q]);

    return (
        <div id="add_friend_div">
            <div id="add_friend_search_div">
                <Form>
                    <label htmlFor="q">Search </label>
                    <input 
                        type="search" 
                        name="q" id="add_friend_search_in" 
                        placeholder="Search Users here" 
                        defaultValue={q}
                        onChange={(event) => {
                            const isFirstSearch = q == null;
                            submit(event.currentTarget.form, {
                                replace: !isFirstSearch,
                              });
                          }}
                    />
                    <div id="search-spinner-div"> <div id="search-spinner" aria-hidden hidden={!searching}/></div>
                </Form>
            </div>
            <div id="add_friend_list_div">
                {
                    q 
                        ?
                        users.users.length 
                                ? 
                                <ul id="add_friend_list">
                                    <div id="add_friend_list_title">User(s)</div>
                                    { users.users.map((user) =>(
                                            (user._id != mainUser.userId) ?
                                            <li className="add_friend_list_item" key={user._id} >
                                                <Link to={`/addFriend/user/${user._id}`}>{user.userName}</Link>
                                            </li> : null
                                        ))
                                    }
                                </ul>
                                : <i className="no_user_found_msg">No Users Found</i>
                        : <i className="search_user_msg">Search Users to Add</i> 
                }
            </div>
        </div>
    )
}

// function AddUser(friends, reqsSent, user){
//     return (
//         <>
//             {   friends.length 
//                 ? friends.map((friend) =>{
//                     user._id === friend._id ? retur : <>
//                 }) 


//             }
//         </>
        
//     )
// }
