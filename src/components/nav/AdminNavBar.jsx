import React from "react";
import {NavLink} from "react-router-dom";

const AdminNavBarComponent = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/tickets">Ticket Board</NavLink></li>
            </ul>
        </nav>
    );
}

export default AdminNavBarComponent;
