import axios from "axios";
const baseURL = "http://10.0.0.17:3000/";

axios.defaults.withCredentials = true;

export async function getUser(){
    // return axios.get(`${baseURL}authenticate/user`)
    // .then((response) =>{
    //     return response.data;
    // })
    // .catch((error) =>{
    //     console.log(error.data);
    // });

    return {userName: "kawal", status: 200, userId: 1116, isLoged: true};
}