import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

const TicketNavBarComponent = () => {
    const [userRoles, setUserRoles] = useState([]);

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
    return (
        <nav>
            <ul>
                <li><NavLink to="/tickets">Ticket Board</NavLink></li>
                <li><NavLink to="/tickets/create">Create new ticket</NavLink></li>
                {userListButtonForAuthorized()}
                <li><NavLink to="/logout">Logout</NavLink></li>
            </ul>
        </nav>
    );
}

export default TicketNavBarComponent;
