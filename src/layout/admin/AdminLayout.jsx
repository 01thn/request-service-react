import React from "react";
import {Outlet} from "react-router-dom";
import AdminNavBarComponent from "../../components/nav/admin/AdminNavBar";

const AdminLayout = () => {
    return (
        <div>
            <AdminNavBarComponent/>
            <Outlet/>
        </div>
    );
}

export default AdminLayout;