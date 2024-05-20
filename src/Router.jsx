import {createBrowserRouter} from "react-router-dom";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import TicketBoard from "./pages/ticket_board/TicketBoard";
import TicketCreate from "./pages/ticket_create/TicketCreate";
import Ticket from "./pages/ticket/Ticket";
import TicketEdit from "./pages/ticket_edit/TicketEdit";
import React from "react";
import Landing from "./pages/landing/Landing";
import TicketLayout from "./layout/ticket/TicketLayout";
import AdminLayout from "./layout/admin/AdminLayout";
import UserBoard from "./pages/user_board/UserBoard";
import User from "./pages/user/User";

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
            { index: true, element: <TicketBoard/> },
            { path: 'create', element: <TicketCreate/> },
            {
                path: ':ticketId',
                element: <Ticket/>,
            },
            {
                path: ':ticketId/edit',
                element: <TicketEdit/>,
            },
        ]
    },
    {
        path: "/users",
        element: <AdminLayout/>,
        children: [
            {index: true, element: <UserBoard/>},
            {
                path: ':userId',
                element: <User/>,
            }
        ]
    },
]);

export default router;