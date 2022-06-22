import React, {useState} from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import AuthUser from "../AuthUser";
import {Link} from "react-router-dom";


const Create = () => {
    const { data, setData, errors, post } = useForm({
        category_id: "1",
        projectName: "",
        description: "",
    });
    const {http, getToken} = AuthUser();
    const [userdetail,setUserdetail] = useState('');
    const [projectCategoriy, setProjectCategoriy] = useState();

    async function handleSubmit(e) {
        e.preventDefault();

        const projectCreate = await http.post('/api/project/{1}/create' , data); //+ userdetail.id
        if(projectCreate.status >= 200 || login.status < 250){
            console.log(projectCreate);
            const data = JSON.parse(projectCreate.data.substring(projectCreate.data.indexOf("{")).trim());

            console.log(data);
            setUserdetail(projectCreate.data.user[0]);
            navigate('/dashboard');
        }
            // n((res)=>{
            //     setUserdetail(res.data.user[0]);
            // });
        // post(route("pages.project.store"));
    }

    // <Link
    //     href={route("project.index")}
    //     className="text-indigo-600 hover:text-indigo-700"
    // >

    return (
        <div className="mt-20">
            <div className="container flex flex-col justify-center mx-auto">
                <div>
                    <h1 className="mb-8 text-3xl font-bold">
                        <Link to={'/project'} className="anav-link border-2 ">Project</Link><span className="font-medium text-indigo-600"> / </span>
                            Create




                    </h1>
                </div>
                <div className="max-w-6xl p-8 bg-white rounded shadow">
                    <form name="createForm" onSubmit={handleSubmit}>
                        <div className="flex flex-col">

                            <div className="mb-4">
                                <label className="">Category</label>
                                <select>
                                    <option></option>
                                </select>
                                <span className='justify-end'>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Create Category
                                    </button>
                                </span>
                            </div>
                            <div className="mb-4">
                                <label className="">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="category_id"
                                    name="category_id"
                                    value={data.projectName}
                                    onChange={(e) =>
                                        setData("projectName", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.category_id}
                                </span>
                            </div>
                            <div className="mb-4">
                                <label className="">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="projectName"
                                    name="projectName"
                                    value={data.projectName}
                                    onChange={(e) =>
                                        setData("projectName", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.projectName}
                                </span>
                            </div>
                            <div className="mb-0">
                                <label className="">Description</label>
                                <textarea
                                    type="text"
                                    className="w-full rounded"
                                    label="description"
                                    name="description"
                                    errors={errors.description}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.description}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;
