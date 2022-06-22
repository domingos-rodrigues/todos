import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function AuthUser(){
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('accessToken');
        const userToken = JSON.parse(tokenString);
        // console.log(userToken);
        return userToken;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }



    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user, token) =>{

        // console.log(token);
        sessionStorage.setItem('accessToken',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/dashboard');
    }

    const logout = async () => {
        const logout = await http.get('/api/logout');
        sessionStorage.clear();
        navigate('/login');
    }

    const http = axios.create({
        baseURL:"http://127.0.0.1:8000", // /api
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        withCredentials: true,
    });
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}
