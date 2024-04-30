import React from "react";
import TicketNavBarComponent from "../../components/nav/ticket/TicketNavBar";
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