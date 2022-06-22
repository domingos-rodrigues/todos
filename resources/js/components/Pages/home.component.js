// import AuthUser from "./AuthUser";
//
import AuthUser from './AuthUser';
import React from "react";
import {Link} from "react-router-dom";
import Todos from "./TodosAuthenticated";


export default function Home() {
    const {token, getToken} = AuthUser();
    // console.log(token);
    if(token) {
        return (
            <div className='container' style={{height: '90vh'}}>
                <Todos/>
            </div>
        )
    }
    return (
        <div>
            <p>Welcome to the Home page.</p><p> You are not logged in. Please do a</p>
            <Link to={'/login'} className="nav-link">Login</Link>
            <p>or </p>
            <Link to={'/register'} className="nav-link">Register</Link>
        </div>
    )
}
