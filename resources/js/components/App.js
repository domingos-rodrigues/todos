import React, {lazy, useState} from 'react';
import '../../css/app.css';
import ReactDOM from 'react-dom';
// import Guest from './navbar/guest';
// import Auth from './navbar/auth';
import AuthUser from './Pages/AuthUser';
import {
    Routes,
    Route,
    Link,
    useNavigate,
    withRouter
} from "react-router-dom";
import Nav from './navbar/navigationAuth.conponent';
import Unregistered from './navbar/navigateUnregistered.component';
import Home from './Pages/home.component';
import Login from "./Pages/login.component";
import Register from "./Pages/register.component";
import Dashboard from "./Pages/dashboard.component";
import Project from "./Pages/Project/Create";
import Button from "../Components/Button";

export default function App() {
    const {token, getToken} = AuthUser();
    const navigation = (!getToken())? <Unregistered /> : <Nav />;

    return (

            <div className="container mx-auto bg-gray-100 shadow p-8 m-10 " style={{height: '90vh'}}>
                {/*<div className={`container`}>{navigation}</div>*/}
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/login" element={<Login/>} />
                            <Route path="/register" element={<Register/>} />
                            <Route path="/dashboard" element={<Dashboard/>} />
                            <Route path="/createProject" element={<Project/>} />

                        </Routes>
                    </div>
                </div>
            </div>
    );
}

  // <Button type="primary" onClick={() => { history.replace('/') }}>Voltar</Button>
