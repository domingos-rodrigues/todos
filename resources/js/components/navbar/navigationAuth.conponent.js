import React, {useState, Component} from "react";
import {Link, useNavigate} from "react-router-dom";

import AuthUser from "../Pages/AuthUser";


export default function Nav() {
    // state = {};


       const navigate = useNavigate();
       const {token, logout} = AuthUser();


    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }

    // render() {
        return (
            <header>
             <nav className='navbar navbar-expand navbar-light fixed-top'>
                <div className="container h-fit ">
                     <Link to={'/'} className="navbar-brand p-1">Home</Link>
                     <div className=" ">
                         <ul className="flex justify-self-end">
                             <li className="mr-6">


                                 <span role="button" className="nav-link" onClick={logoutUser}>Logout</span>

                             </li>
                             <li className="mr-6">
                                 <Link to={'/dashboard'} className="nav-link">Dashboard</Link>
                             </li>
                         </ul>
                     </div>
                </div>
            </nav>
            </header>
        )
    // }
}
