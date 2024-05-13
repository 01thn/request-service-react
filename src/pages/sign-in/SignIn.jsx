import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (submitEvent) => {
        submitEvent.preventDefault();
        console.log("Username:", username);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/sign-in`, {
                "username": username,
                "password": password
            });
            const token = response.data.token;
            const userRoles = jwtDecode(token).roles
            localStorage.setItem("token", token);
            localStorage.setItem("roles", userRoles);
            navigate("/");
        } catch (error) {
            setErrorMessage("Something went wrong. Please, try again");
        }
    };

    return (
        <div className="container">
            <h1 className="mt-5 mb-4">Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username}
                           onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
                {errorMessage && <p className="error-msg mt-3">{errorMessage}</p>}
            </form>
            <div className="mt-3">
                <p>Don't have an account? Let's <button className="btn btn-link"
                                                        onClick={() => navigate("/sign-up")}>Sign Up</button></p>
            </div>
        </div>
    );
}

export default SignIn;