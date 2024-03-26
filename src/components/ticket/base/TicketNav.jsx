import React from "react";
import {NavLink} from "react-router-dom";

const TicketNavComponent = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/tickets">Ticket Board</NavLink></li>
                <li><NavLink to="/tickets/create">Create new ticket</NavLink></li>
            </ul>
        </nav>
    );
}

export default TicketNavComponent;
