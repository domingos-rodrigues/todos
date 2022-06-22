import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthUser from './AuthUser';
// import React from "@types/react";



export default function Dashboard() {
    const {http, getToken} = AuthUser();
    const [userdetail,setUserdetail] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        fetchUserDetail();
    },[]);


    const fetchUserDetail = () =>{
        const data = {'id':3};
        http.post('/api/dashboard', data)
            .then((res)=>{
            setUserdetail(res.data.user[0]);
        });
    }

    function renderProject() {
        const projects = userdetail.projects;
        // console.log(projects);
        return (
            <div>
                <div>
                    {projects.map(project => <div key={project.id}> {project.project_name} <Link to={'/createProject'} className='px-3 font-bold text-white bg-green-500 rounded'>View</Link></div>)}
                </div>
                <div>

                    <div className='mt-4'>
                        <Link to={'/createProject'} className="navbar-brand bg-blue-100 p-1">Create New Project</Link>

                    </div>
                </div>
            </div>
        )

    }



    function renderElement(){
        if(userdetail){
            const date = userdetail.created_at.split('T');
            return (
                <div className='flex flex-row justify-evenly'>
                    <div className=''>
                        <h3 className='text-lg font-bold'>User</h3>
                        <div>
                            <label className='font-bold'>Name</label>
                            <p>{userdetail.name}</p>
                        </div>
                        <div>
                            <label className='font-bold'>Email</label>
                            <p>{userdetail.email}</p>
                        </div>
                        {/*<div><label className='font-bold'>Since</label>*/}
                        {/*    <p>{date[0]}</p>*/}
                        {/*</div>*/}
                    </div>
                    <div className=''>
                        <h3 className='text-lg font-bold'>Projects</h3>
                        <div>{renderProject()}</div>

                    </div>

                </div>
            )
        }

        return <p>Loading.....</p>

    }

    return(
        <div>
            <h1 className='mb-4 mt-4 text-lg font-bold'>This user has the following Projetcs</h1>
            { renderElement() }
        </div>
    )
}
