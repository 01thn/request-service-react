import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignInComponent from "./components/auth/SignInComponents";
import SignUpComponent from "./components/auth/SignUpComponents";
import App from "./App";

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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
