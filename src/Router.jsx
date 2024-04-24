import {createBrowserRouter} from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import TicketBoard from "./pages/ticket/TicketBoard";
import AddTicket from "./pages/ticket/AddTicket";
import TicketDetails from "./pages/ticket/TicketDetails";
import TicketEdit from "./pages/ticket/TicketEdit";
import LogOut from "./pages/auth/LogOut";
import React from "react";
import Landing from "./pages/landing/Landing";
import TicketLayout from "./components/layout/TicketLayout";
import AdminLayout from "./components/layout/AdminLayout";
import UserBoard from "./pages/admin/UserBoard";
import UserDetails from "./pages/admin/UserDetails";

const router = createBrowserRouter([
    {
        path: "*",
        element: <Landing/>,
    },
    {
        path: "/sign-in",
        element: <SignIn/>,
    },
    {
        path: "/sign-up",
        element: <SignUp/>,
    },
    {
        path: "/tickets",
        element: <TicketLayout/>,
        children: [
            {index: true, element: <TicketBoard/>},
            {path: 'create', element: <AddTicket/>},
            {
                path: ':ticketId',
                element: <TicketDetails/>,
                children: [
                    {path: 'edit', element: <TicketEdit/>},
                ]
            }
        ]
    },
    {
        path: "/logout",
        element: <LogOut/>,
    },
    {
        path: "/users",
        element: <AdminLayout/>,
        children: [
            {index: true, element: <UserBoard/>},
            {
                path: ':userId',
                element: <UserDetails/>,
                // children: [
                //     {path: 'change-roles', element: <UserEdit/>},
                // ]
            }
        ]
    },
]);

export default router;