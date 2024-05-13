import React from "react";
import {Link} from "react-router-dom";

const Landing = () => {
    return (
        <div className="container mt-5">
            <h1 className="display-4">Welcome to the request service</h1>
            <nav className="mb-4">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/sign-in" className="nav-link">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sign-up" className="nav-link">Sign Up</Link>
                    </li>
                </ul>
            </nav>
            <section>
                <p className="lead">Perform your request management</p>
                <Link to="/tickets" className="btn btn-primary">Get started</Link>
            </section>
        </div>
    );

}

export default Landing;
