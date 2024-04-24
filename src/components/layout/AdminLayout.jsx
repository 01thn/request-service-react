import React from "react";
import {Outlet} from "react-router-dom";
import AdminNavBarComponent from "../nav/AdminNavBar";

const AdminLayout = () => {
    return (
        <div>
            <AdminNavBarComponent/>
            <Outlet/>
        </div>
    );
}

export default AdminLayout;