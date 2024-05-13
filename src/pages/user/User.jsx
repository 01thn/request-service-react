import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const User = () => {
    const {userId} = useParams();
    const [user, setUser] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, config);
                setUser(response.data);
                setSelectedRoles(response.data.roles);
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    navigate("/sign-in");
                } else {
                    console.error("Error fetching user_board details:", error);
                }
            }
        };

        fetchUserDetails();
    }, [userId, navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };


    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${userId}/roles`, {
                roles: selectedRoles
            }, config);
        } catch (error) {
            console.error("Error updating user roles:", error);
        }
    }

    const handleRoleChange = (event) => {
        const options = event.target.options;
        const selectedRoles = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedRoles.push(options[i].value);
            }
        }
        setSelectedRoles(selectedRoles);
    };

    return (
        <>
            <section className="mt-4">
                <h2>{user.username}</h2>
                <p>Roles: {user.role}</p>
                <p>{user.firstName}</p>
                <p>{user.lastName}</p>
                <p>{user.email}</p>
                <p>
                    <data>Registered at: {formatDate(user.registeredAt)}</data>
                </p>
                <p>
                    <data>{user.updatedAt != null ? "Last updated at: " + formatDate(user.updatedAt) : ""}</data>
                </p>
                <div className="mt-3">
                    <label htmlFor="role" className="form-label">Select Role:</label>
                    <select
                        multiple
                        id="role"
                        value={selectedRoles}
                        onChange={handleRoleChange}
                        className="form-select"
                    >
                        <option value="ROLE_ADMIN">Admin</option>
                        <option value="ROLE_OPERATOR">Operator</option>
                        <option value="ROLE_USER">User</option>
                    </select>
                    <button onClick={handleSubmit} className="btn btn-primary mt-2">Update Role</button>
                </div>
            </section>
        </>
    );
};

export default User;