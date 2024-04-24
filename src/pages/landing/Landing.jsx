import React from "react";
import {Link} from "react-router-dom";

const Landing = () => {
    return (
        <>
            <h1>Welcome to the request service</h1>
            <nav>
                <ul>
                    <li><Link to="/sign-in">Sign In</Link></li>
                    <li><Link to="/sign-up">Sign Up</Link></li>
                </ul>
            </nav>
            <section>
                <p>Perform your request management</p>
                <Link to="/tickets">Get started</Link>
            </section>
        </>
    );

}

export default Landing;
