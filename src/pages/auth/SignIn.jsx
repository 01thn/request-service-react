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
        <div>
            <h1>Sign In</h1>
            <section>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username}
                               onChange={(changeEvent) => setUsername(changeEvent.target.value)} required/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password}
                               onChange={(changeEvent) => setPassword(changeEvent.target.value)} required/>
                    </div>
                    <button type="submit">Sign In</button>
                    <p className="error-msg">{errorMessage}</p>
                </form>
            </section>
            <section>
                <p>Don't have an account? Let's <button onClick={() => navigate("/sign-up")}>Sign Up</button></p>
            </section>
        </div>
    );
}

export default SignIn;