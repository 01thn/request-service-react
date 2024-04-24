import React from "react";
import TicketNavBarComponent from "../nav/TicketNavBar";
import {Outlet} from "react-router-dom";

const TicketLayout = () => {
    return (
        <div>
            <TicketNavBarComponent/>
            <Outlet/>
        </div>
    )
}

export default TicketLayout;