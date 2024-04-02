import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignInComponent from "./components/auth/SignIn";
import SignUpComponent from "./components/auth/SignUp";
import App from "./App";
import TicketBoardComponent from "./components/ticket/TicketBoard";
import AddTicketComponent from "./components/ticket/AddTicket";
import TicketDetailsComponent from "./components/ticket/TicketDetails";

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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
