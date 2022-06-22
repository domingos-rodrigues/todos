import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import AuthUser from '../AuthUser';
import {Link} from "react-router-dom";


export default function ProjectSelect(props) {

    console.log('props = ',props);
    const {http, getToken} = AuthUser();
    // console.log();
    // console.log('sessionStorage',JSON.parse(sessionStorage.getItem('projects')));
    const [projects, setProjects] = useState(JSON.parse(sessionStorage.getItem('projects')));
    const {valueOption, setValueOption} = useState('');

        // this.handleProject = this.handleProject.bind(this);
        // console.log('projects = ', this.state.projects);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

    useEffect(()=>{
        // fetchUserDetail();
    },[]);

    const fetchUserDetail = async () =>{

        const projResp = await http.post('/api/dashboard');
        console.log('da saida ', projResp);
        const pData = projResp.data.user[0].projects;
        console.log('do p data ',pData);
        setProjects(pData);

        // console.log('ppppp ', projects.state);

        // console.log('pData',pData);
        // setProjects(pData);
        // console.log(projects);
        // const projects = this.props.projects;
        // //this.handleProject(data => {
        //     this.setState({project: projects});
        //     console.log('this pro', this.state);
        // //})
        //
        // this.state.projects = http.post('/api/dashboard' , data); //+ userdetail.id
        // if(!(projectCreate.status < 200 && projectCreate.status >= 250)){
        //     // console.log(projectCreate);
        //     const data = JSON.parse(projectCreate.data.substring(projectCreate.data.indexOf("{")).trim());
        //
        //     console.log('data = ', data);
        //     setUserdetail(projectCreate.data.user[0]);
        //     console.log('userdetail = ',userdetail);
        //     navigate('/dashboard');
        // }
    }

    // handleProject(e) { this.setState({projects: 'fff'})}
    // const handleChange =  {    this.setState({value: event.target.value});  }
    // handleSubmit(event) {
    //     alert('Your favorite flavor is: ' + this.state.value);
    //     event.preventDefault();
    // }
    //<form onSubmit={this.handleSubmit}>  </form>
    // onChange={projectState => (){
    //
    // }}

    function renderSelect() {
        //const projects = userdetail.projects;
        //  console.log(projects);
        return (
            <select className='form-select mt-4 border-0 hover:border-0 text-blue-500'
                    value={valueOption}
            >
                <option >Todos</option>
                    {projects.map(
                        project => <option key={project.id} value={project.id}>
                            {project.project_name}
                            </option>)}
            </select>
        )
    }

    return (
        <div>
            {renderSelect()}
        </div>
    );

}
