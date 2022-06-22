import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Unregistered extends Component{

    render() {
        return (
            <nav className='navbar navbar-expand navbar-light fixed-top'>
                <div className="container border-b-2 border-black">
                    <Link to={'/'} className="navbar-brand bg-blue-100 p-1">Home</Link>

                    <div className=" ">
                        <ul className="flex justify-self-end">
                            <li className="mr-6">
                                <Link to={'/login'} className="nav-link">Login</Link>
                            </li>
                            <li className="mr-6">
                                <Link to={'/register'} className="nav-link">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
