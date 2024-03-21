import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignInComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (submitEvent) => {
        submitEvent.preventDefault();
        console.log("Username:", username);

        try {
            const response = await axios.post("http://localhost:8080/auth/sign-in", {
                "username": username,
                "password": password
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
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
        </div>
    );
}

export default SignInComponent;