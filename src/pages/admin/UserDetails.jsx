import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const UserDetails = () => {
    const {userId} = useParams();
    const [user, setUser] = useState(null);
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
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    navigate("/sign-in");
                } else {
                    console.error("Error fetching user details:", error);
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

    return (
        <>
            {/*<div>*/}
            {/*    <button onClick={() => navigate(`/users/${user.id}/change-roles`)}>Change roles</button>*/}
            {/*</div>*/}
            <section>
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
            </section>
        </>
    );
};

export default UserDetails;