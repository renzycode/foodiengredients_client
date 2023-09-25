import { Link } from "react-router-dom";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import { List } from 'react-bootstrap-icons';
import {MySwal} from "../components/myswal";
import { useEffect } from "react";

export const Navbar = () => {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["access_token"]);
    const logout = async () => {
        await setCookies("access_token","");
        await window.localStorage.removeItem("userId");
        navigate("/auth");
    };

    const notLoggedIn = () => {
        MySwal.fire({
            icon: 'info',
            title: 'Error',
            text: "Please login first.",
        });
    }

    return (
        <div>
            <nav className="navbar navbar-dark navbar-expand-lg navbar-expand-md fixed-top my-navbar">
                <div className="container-fluid">
                    <a className="navbar-brand text-light font-quitcher f-35" href="#">Foodiengredients</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {
                                !cookies['access_token'] ? (
                                    <> 
                                        <li className="nav-item">
                                            <Link className={window.location.pathname=="/" ? "nav-link active border-bottom py-2" : "nav-link active"} to="/">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={() => {notLoggedIn()}}>Saved Recipe</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={() => {notLoggedIn()}}>Create Recipe</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={window.location.pathname=="/auth" ? "nav-link active border-bottom py-2" : "nav-link active"} to="/auth">Login/Register</Link>
                                        </li>
                                    </>
                                ) : (
                                    <> 
                                        <li className="nav-item">
                                            <Link className={window.location.pathname=="/" ? "nav-link active border-bottom py-2" : "nav-link active"} to="/">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={window.location.pathname=="/saved-recipes" ? "nav-link active border-bottom py-2" : "nav-link active"} to="/saved-recipes">Saved Recipe</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={window.location.pathname=="/create-recipe" ? "nav-link active border-bottom py-2" : "nav-link active"} to="/create-recipe">Create Recipe</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active cursor-pointer" onClick={() => {logout()}}>Logout</Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                    </div>
                </div>
            </nav>



            {/* <nav className="navbar fixed-top my-navbar my-0 py-0" >
                <div className="container-fluid">
                    <a className="navbar-brand text-light font-quitcher f-35" href="#">Foodiengredients</a>
                    {
                        !cookies['access_token'] ? (
                            <>  
                                <div className="d-flex">
                                    <div className="mx-3">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </div>
                                    <div className="mx-3">
                                        <Link className="nav-link" to="/saved-recipes">Saved Recipe</Link>
                                    </div>
                                    <div className="mx-3">
                                        <Link className="nav-link" to="/create-recipe">Create Recipe</Link>
                                    </div>
                                    <div className="mx-3">
                                        <Link className="nav-link" to="/auth">Login / Register</Link>
                                    </div>
                                </div>
                                
                            </>
                        ) : (
                            <>
                                <button className="navbar-toggler text-dark bg-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon text-light bg-light"></span>
                                </button>
                                <div className="offcanvas offcanvas-end h-100" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Renzy John Minerva</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body h-100">
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/">Home</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/create-recipe">Create Recipe</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/saved-recipes">Saved Recipe</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link cursor-pointer" to="/auth" onClick={() => {logout()}}>Logout</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </nav> */}
        </div>
        
    );
}
