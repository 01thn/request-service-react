import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const SignUp = () => {
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
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/sign-up`, {
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
        <div className="container">
            <h1 className="mt-5 mb-4">Sign Up</h1>
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
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email}
                           onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" value={phone}
                           onChange={(e) => setPhone(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" value={firstName}
                           onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" value={lastName}
                           onChange={(e) => setLastName(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                {errorMessage && <p className="error-msg mt-3">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default SignUp;