import React from "react";
import {NavLink} from "react-router-dom";

const AdminNavBarComponent = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/tickets">Request Service</NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeclassname="active" to="/tickets">Ticket Board</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavBarComponent;