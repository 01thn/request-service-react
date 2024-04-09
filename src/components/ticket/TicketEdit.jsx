import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import NavBarComponent from "../nav/NavBar";

const TicketEditComponent = () => {
    const {ticketId} = useParams();
    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(`http://localhost:8080/tickets/${ticketId}`, config);
                setTicketTitle(response.data.title);
                setTicketDescription(response.data.description);
            } catch (error) {
                console.error("Error fetching ticket details:", error);
            }
        };

        fetchTicketDetails();
    }, [ticketId]);

    const handleSubmit = async (submitEvent) => {
        submitEvent.preventDefault();
        try {
            submitEvent.preventDefault();
            const token = localStorage.getItem("token");
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            await axios.put(`http://localhost:8080/tickets/${ticketId}`, {
                "title": ticketTitle,
                "description": ticketDescription
            }, config);
            navigate("/tickets");
        } catch (error) {
            setErrorMessage("Something went wrong. Please, try again");
        }
    };

    return (
        <>
            <NavBarComponent/>
            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={ticketTitle}
                           onChange={(changeEvent) => setTicketTitle(changeEvent.target.value)} required/>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={ticketDescription}
                              onChange={(changeEvent) => setTicketDescription(changeEvent.target.value)} required/>
                    <button type="submit">Save</button>
                    <p>{errorMessage}</p>
                </form>
            </section>
        </>
    );
}

export default TicketEditComponent;