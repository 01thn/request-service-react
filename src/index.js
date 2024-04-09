import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignInComponent from "./components/auth/SignIn";
import SignUpComponent from "./components/auth/SignUp";
import App from "./App";
import TicketBoardComponent from "./components/ticket/TicketBoard";
import AddTicketComponent from "./components/ticket/AddTicket";
import TicketDetailsComponent from "./components/ticket/TicketDetails";
import TicketEditComponent from "./components/ticket/TicketEdit";
import LogOutComponent from "./components/auth/LogOut";
import UserPanelComponent from "./components/users/UserPanel";

const router = createBrowserRouter([
    {
        path: "*",
        element: <App/>,
    },
    {
        path: "/sign-in",
        element: <SignInComponent/>,
    },
    {
        path: "/sign-up",
        element: <SignUpComponent/>,
    },
    {
        path: "/tickets",
        element: <TicketBoardComponent/>,
    },
    {
        path: "/tickets/create",
        element: <AddTicketComponent/>,
    },
    {
        path: "/tickets/:ticketId",
        element: <TicketDetailsComponent/>,
    },
    {
        path: "/tickets/:ticketId/edit",
        element: <TicketEditComponent/>,
    },
    {
        path: "/logout",
        element: <LogOutComponent/>,
    },
    {
        path: "/users",
        element: <UserPanelComponent/>,
    },
    // TODO gonna implement page with details in the future
    // {
    //     path: "/users/:userId",
    //     element: <UserDetailsComponent/>,
    // },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
