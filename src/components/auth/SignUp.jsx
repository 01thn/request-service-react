import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const SignUpComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (submitEvent) => {
        submitEvent.preventDefault();
        console.log("Username:", username);

        try {
            const response = await axios.post("http://localhost:8080/auth/sign-up", {
                "username": username,
                "password": password,
                "email": email,
                "phone": phone,
                "firstName": firstName,
                "lastName": lastName
            });
            const token = response.data.token;
            const userRoles = jwtDecode(token).roles
            localStorage.setItem("token", token);
            localStorage.setItem("roles", userRoles);
            navigate("/");
        } catch (error) {
            setErrorMessage(error.response.data);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <section>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username}
                               onChange={(changeEvent) => setUsername(changeEvent.target.value)} required/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password}
                               onChange={(changeEvent) => setPassword(changeEvent.target.value)} required/>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email}
                               onChange={(changeEvent) => setEmail(changeEvent.target.value)} required/>
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" value={phone}
                               onChange={(changeEvent) => setPhone(changeEvent.target.value)} required/>
                        <label htmlFor="firstName">First name</label>
                        <input type="text" id="firstName" value={firstName}
                               onChange={(changeEvent) => setFirstName(changeEvent.target.value)} required/>
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" id="lastName" value={lastName}
                               onChange={(changeEvent) => setLastName(changeEvent.target.value)} required/>
                    </div>
                    <button type="submit">Sign Up</button>
                    <p className="error-msg">{errorMessage}</p>
                </form>
            </section>
        </div>
    );
}

export default SignUpComponent;