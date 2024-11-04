import { Form, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import { getData } from "../functions/functions";
import { useEffect } from "react";

export async function loader({request}) {
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
                            submit(event.currentTarget.form);
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
                                    { users.users.map((user) =>(
                                        <li className="add_friend_list_item" key={user._id} >
                                            {user.userName}
                                        </li>
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