import React, {useEffect, useState} from "react";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";

const TicketNavBarComponent = () => {
    const [userRoles, setUserRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            setUserRoles(localStorage.getItem("roles"));
        } catch (error) {
            console.log(error);
        }
    }, []);

    const userListButtonForAuthorized = () => {
        return (
            <>
                {
                    (userRoles != null) && (userRoles.includes("ROLE_ADMIN")) && (<li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeclassname="active" to="/users">Users panel</NavLink>
                        </li>
                    </li>)
                }
            </>
        )
    }

    const logout = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/logout`, config);
            localStorage.removeItem("token");
            localStorage.removeItem("roles");
            navigate("/sign-in");
        } catch (error) {

        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/tickets">Request Service</NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeclassname="active" to="/tickets">Ticket Board</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeclassname="active" to="/tickets/create">Create new
                                ticket</NavLink>
                        </li>
                        {userListButtonForAuthorized()}
                    </ul>
                    <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default TicketNavBarComponent;
