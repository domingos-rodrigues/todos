import { useState } from "react"
import AuthUser from './AuthUser';
import {Link, useNavigate} from "react-router-dom";



export default function Login() {
    const {http,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    const submitForm = async () =>{
        // api call
        const csrf = await http.get('/sanctum/csrf-cookie');
        // console.log(http, ' csrf= ', csrf);
        const login = await http.post('/api/login',{'email':email,'password':password});

        if(login.status >= 200 || login.status < 250){
            const data = JSON.parse(login.data.substring(login.data.indexOf("{")).trim());

            // console.log(data.user,' - ',data.data.access_token);
            setToken(data.user, data.data.access_token);
            navigate('/');
        }

    }

     return(
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                               onChange={e=>setEmail(e.target.value)}
                               id="email" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                               onChange={e => setPassword(e.target.value)}
                               id="pwd" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
                </div>
            </div>
        </div>
    )
}
