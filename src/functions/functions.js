import axios from "axios";
// 192.168.16.30:5173
const baseURL = "http://10.0.0.17:3000/";

axios.defaults.withCredentials = true;

export async function getUser(){
    return axios.get(`${baseURL}auth/user`)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        console.log(error.data);
    });
}


export async function logIn(username, password) {
    
    return await axios.post(`${baseURL}auth/logIn`,{username: username, password:password})
    .then((res) =>{
        return res;
    }).catch((err)=>{
        if(err.response){return err.response.data}
        return err.message;
    });
}


export async function signUp(data) {
    return await axios.post(`${baseURL}auth/signUp`, {data:data})
    .then((res) =>{
        return res;
    }).catch((err)=>{
        if(err.response){return err.response.data}
        return err.message;
    });
}

export async function logOut() {
    return await axios.post(`${baseURL}auth/logOut`);
}

export async function getData(path) {
    return await axios.get(`${baseURL}${path}`);
}

export async function sendFriendReq(id) {
    return await axios.post(`${baseURL}data/addFriend/user/sendReq/${id}`);
}

export async function postFriendReqChoice(id, choice) {
    return await axios.post(`${baseURL}data/addFriend/friendReq/choice`,{data:{id:id,choice:choice}});
}

export async function postMsg(message, friendId) {
    return await axios.post(`${baseURL}data/friend/${friendId}/message`,{data: message});
}