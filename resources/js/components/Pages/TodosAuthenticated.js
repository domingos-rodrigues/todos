import React, { useEffect, useState, useRef, createContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthUser from './AuthUser';
import Todos from './Project/ProjectSelect';
import TodosFromProject from './Todo/TodosFromProject';
import { TiUser } from "react-icons/ti";
import { ImBin } from "react-icons/im";
import { BsPencilFill } from "react-icons/bs";

export const TodosAuth = createContext(null);

function TodosAuthenticated() {
    const navigate = useNavigate();
    const {http, token, logout, getToken, user} = AuthUser();
    const newProjectRef = useRef (null);
    const [projects, setProjects] = useState({})
    const [userdetail, setUserdetail] = useState({
        user,
        projectSel1: 0,
        projectSel2: 0,
        minSel: 0,
        maxSel: 0,
    });

    useEffect(()=>{
        fetchUserDetail();
    },[]);

    const fetchUserDetail = async () =>{
        const res = await http.post('/api/dashboard');
        const userProjects = res.data.user[0].projects.reduce((obj, v, i) => {
                return {...obj, [v.id]: v};
            }, {}
        );
        // console.log( 'user = ', userProjects);
        let firstSel = null, secondSel = null;
        if( userProjects
            && Object.keys(userProjects)[0].length > 0
            && userProjects.constructor === Object
        ){
            setProjects(userProjects);
            firstSel = Object.keys(userProjects)[0]
            secondSel = Object.keys(userProjects)[1];
            setUser(`projectSel1`, firstSel);
            if(secondSel) {
                setUser(`projectSel2`, secondSel);
            }
        }
        delete res.data.user[0].projects;
        setUser(`user`, res.data.user);
        // console.log('use detail -= ', userdetail);
    }


    function setUser(key, val) {
        setUserdetail(
            (prevState) => ({
                ...prevState,
        [key]: val
            }));
        // console.log('... actual = ',userdetail)
    }

    function setProj(val){
        setProjects(
            (oldProj) => ({
                ...oldProj,
                val
            }));
    }

    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(!newProjectRef.current.value){
            return;
        }
        let user_id = userdetail.user[0].id;
        let data = {user_id: user_id, projectName: newProjectRef.current.value};

        const projectCreate = await http.post(`/api/project/` + user_id + `/create` , data); //+ userdetail.id

        if(!(projectCreate.status < 200 && projectCreate.status >= 250)){
            setProj(projectCreate.data);
        }
     }

    const projectInBox1 = () => {
        // e.preventDefault();
        const projInBox = projects[userdetail.projectSel1];
        // console.log(projInBox);
        return projects[userdetail.projectSel1].id;
    }

    const handleEditProj = (e) => {
        e.preventDefault();
        console.log('estou na edição')
        console.log('projets = ', projects[userdetail.projectSel1].id);
    }

    const handleDeleteProj = (e) => {
        e.preventDefault();
        console.log('estou no apaga')
    }

    const valueSel = (v) => {
        if(userdetail.minSel > v) {
            setUser(`minSel`, v);
        }
        if(userdetail.maxSel < v){
            setUser(`maxSel`,v);
        }

    }

    const grabProject = (e) => {
        e.preventDefault();
        const vSel = parseInt(document.getElementById('projectSel01').value);
        // console.log('projectSel01 = ', vSel);
        valueSel(vSel);
        setUser(`projectSel1`,  vSel);
        // console.log('userdetail = ', userdetail);
    }

    function grabTodos(e) {
        e.preventDefault();
        const proj = parseInt(document.getElementById('projectSel01').value);
        setUserdetail(
            (prevState) => ({
                ...prevState,
                [`projectSel1`]: proj
            }));
        // console.log('userdetail = ', userdetail);

    }

    function renderElement(proj){
        if(projects){
            const projSel = proj === 1? userdetail.projectSel1 : userdetail.projectSel2;
            const projEdit = projects[projSel];
            if(projEdit && projEdit.id !== undefined) {
                // console.log('projEdit = ... ',projEdit.id)
                return (
                    <div className='flex justify-items-stretch '>
                        <div className='flex-1 mx-2 border-1 border-gray-300 '>
                            <div className='flex font-bold capitalize m-2'>
                                <div className={`flex-auto`}>
                                    <div className='font-bold text-sm text-gray-700'>{projEdit.project_name} </div>
                                    <div className='hidden'>
                                        <input
                                            type="text"
                                            name={`${projSel}`}
                                            id={`editProject${projSel}`}
                                            className="focus:ring-indigo-500 border-0 rounded-md"
                                            value={`${projEdit.project_name}`}
                                            onChange={handleEditProj}
                                        />
                                    </div>
                                </div>
                                <div className={`justify-end`}>
                                    <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                                             role="group">
                                        <button
                                            type='button'
                                            className='rounded-2 py-2 px-2 hover:bg-blue-700 bg-blue-500 text-white
                                            focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-900'
                                            onClick={handleEditProj}
                                        >
                                            <BsPencilFill/>
                                        </button>
                                        <button
                                            type='button'
                                            className="rounded-2 py-2 px-2 hover:bg-red-700 bg-red-500 text-white
                                            focus:bg-red-700 focus:outline-none focus:ring-0 active:bg-red-900"
                                            onClick={handleDeleteProj}
                                        >
                                            <ImBin/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='m-2 min-h-fit'>
                                <TodosFromProject project={projEdit.id} editProj={proj} userdetail={userdetail} http={http} onChange={grabTodos} />
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return <p>Waiting for projects .....</p>
    }

    return(
        <div className='-mt-4'>
            <div className='-mx-8 border-b-2 border-gray-300'>
                <div className="flex flex-row text-2xl font-bold">
                    <div className='flex-auto mx-auto'>
                        <center>
                            <button
                                className="hover:bg-blue-100 text-blue-500 font-semi-bold hover:text-white py-2 px-4 border-0 border-blue-500 hover:border-transparent">
                                TODOS.List
                            </button>
                        </center>
                    </div>
                    <div className='-mt-4'>

                        <div className='flex flex-row'>
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className='flex-auto'>
                                    <label htmlFor="newProject" className="mx-2 text-sm font-bold text-gray-700">
                                    NEW PROJECT
                                    </label>
                                    <input
                                          type="text"
                                          name="newProject"
                                          id="newProject"
                                          ref={newProjectRef}
                                          className="mt-4 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                      />
                                    <button
                                        type={`submit`}
                                        className="mx-2 px-6 py-2 text-sm font-bold text-white bg-blue-500 rounded"
                                    >
                                    CREATE
                                    </button>
                                </div>
                            </form>
                            <div className='mt-4 text-blue-500 '>
                                <div className="flex justify-center">
                                    <div className="dropdown relative">
                                        <button className="font-medium text-xs
                                                      hover:shadow-lg
                                                      focus:shadow-lg focus:outline-none focus:ring-0
                                                      active:shadow-lg active:text-white
                                                      transition duration-150 ease-in-out
                                                      flex items-center whitespace-nowrap"
                                                type="button"
                                                id="dropdownMenuButton1"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                        >
                                            <TiUser className={`text-4xl`} />
                                        </button>
                                        <ul className="dropdown-menu min-w-max
                                                      absolute hidden
                                                      bg-white text-base
                                                      z-50 float-left
                                                      py-2
                                                      list-none text-left
                                                      rounded-lg
                                                      shadow-lg
                                                      mt-1  hidden m-0
                                                      bg-clip-padding
                                                      border-none"
                                            aria-labelledby="dropdownMenuButton1"
                                        >
                                            <li>
                                                <span role="button" className="nav-link" onClick={logoutUser}>Logout</span>
                                            </li>
                                            <li>
                                                <Link to={'/dashboard'} className="nav-link">Dashboard</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <Todos projects={projects} userdetail={userdetail} onChange={(e) => grabProject(e)} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div style={{height: '87vh !important'}}>
                <div className='container'>
                    <h2 className='my-3 text-center text-3xl text-gray-700 font-semibold uppercase'>PROJECTS</h2>
                </div>
                <div className='mx-2'>
                    <div className={`flex flex-row justify-evenly`}>
                        <div className="w-1/2 flex-1 mx-2">
                            { renderElement(1) }
                        </div>
                        <div className="w-1/2 flex-1 mx-2">
                            { renderElement(2) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodosAuthenticated;
