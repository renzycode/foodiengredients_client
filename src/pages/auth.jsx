import { React, useState } from "react";
import axios from "axios";
import {MySwal} from "../components/myswal";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import { getCurrentServer } from "../hooks/getCurrentServer";

const server = getCurrentServer();

export const Auth = () => {
    return (
        <div className="row pt-5 my-5 mx-0">
            <Login />
            <Register />
        </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [cookies,setCookies] = useCookies(["access_token"]);

    const onSubmit = async (event) => {
        event.preventDefault();

        if(username!='' && password!=''){
            try {
                const login = await axios.post(
                    `${server}/auth/login`,
                    {
                        username,
                        password,
                    }
                );
                const result = login.data['result'];
                if(result=="username-not-found"){
                    MySwal.fire({
                        icon: 'error',
                        title: 'Login',
                        text: "Username not found",
                    })
                }else if(result=="wrong-password"){
                    MySwal.fire({
                        icon: 'error',
                        title: 'Login',
                        text: "Wrong password",
                    })
                }else{
                    setCookies("access_token", login.data['token']);
                    window.localStorage.setItem("userId", login.data['userId']);
                    navigate("/");
                }
            } catch (err) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Login',
                    text: "Error Please try again later",
                })
            }
        }
    }

    return (
        <div className="d-flex justify-content-end col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="mt-5 col-12 col-lg-6 col-xl-6 col-md-8 col-sm-12 col-xs-12">
                <div className="auth-container text-light border border-light rounded p-4">
                    <form onSubmit={onSubmit}>
                        <h2 className="ms-1">Login</h2>

                        <div className="row mx-0 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="mb-3 col-12 px-1">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input className="form-control"
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => {setUsername(e.target.value)} } />
                            </div>
                            <div className="mb-3 col-12 px-1">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input className="form-control"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                setPassword(e.target.value);
                                }} />
                            </div>
                        </div> 
                        
                        <button className="btn btn-dark border-light ms-1" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Register = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const register = await axios.post(
                `${server}/auth/register`,
                {
                    username,
                    password,
                }
            );
            const result = register.data['result'];
            if(result==='user-already-exists'){
                MySwal.fire({
                    icon: 'error',
                    title: 'Register',
                    text: "Username already exist",
                })
            }else{
                MySwal.fire({
                    icon: 'success',
                    title: 'Register',
                    text: "Registered successfully",
                })
                setFname('');
                setLname('');
                setEmail('');
                setUsername('');
                setPassword('');
            }
        } catch (err) {
            MySwal.fire({
                icon: 'error',
                title: 'Register',
                text: "Error Please try again later",
            })
        }
    }

    return (
        <div className="d-flex justify-content-start col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="mt-5 col-12 col-lg-6 col-xl-6 col-md-8 col-sm-12 col-xs-12">
                <div className="auth-container text-light border border-light rounded p-4">
                    <form onSubmit={onSubmit}>
                        <h2 className="ms-1">Register</h2>
                        <div className="row mx-0 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="mb-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 px-1">
                                <label htmlFor="fname" className="form-label">First Name</label>
                                <input className="form-control" type="text"
                                id="fname"
                                value={fname}
                                onChange={(e) => {
                                setFname(e.target.value);
                                }} />
                            </div>
                            <div className="mb-3 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 px-1">
                                <label htmlFor="lname" className="form-label">Last Name</label>
                                <input className="form-control" type="text"
                                id="lname"
                                value={lname}
                                onChange={(e) => {
                                setLname(e.target.value);
                                }} />
                            </div>
                        </div>  

                        <div className="row mx-0 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="mb-3 col-12 px-1">
                                <label htmlFor="email" className="form-label">Email (Optional)</label>
                                <input className="form-control" type="text"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                setEmail(e.target.value);
                                }} />
                            </div>
                            <div className="mb-3 col-12 px-1">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input className="form-control" type="text"
                                id="username"
                                value={username}
                                onChange={(e) => {
                                setUsername(e.target.value);
                                }} />
                            </div>
                        </div> 

                        <div className="row mx-0 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="mb-3 col-12 px-1">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input className="form-control"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                setPassword(e.target.value);
                                }} />
                            </div>
                        </div> 
                        
                        <button className="btn btn-dark border-light ms-1" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
