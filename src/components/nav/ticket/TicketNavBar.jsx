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
                        <li><NavLink to="/users">Users panel</NavLink></li>
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
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/logout`, config);
            localStorage.removeItem("token");
            localStorage.removeItem("roles");
            navigate("/sign-in");
        } catch (error){

        }
    };

    return (
        <nav>
            <ul>
                <li><NavLink to="/tickets">Ticket Board</NavLink></li>
                <li><NavLink to="/tickets/create">Create new ticket</NavLink></li>
                {userListButtonForAuthorized()}
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default TicketNavBarComponent;
