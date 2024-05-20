import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const TicketEdit = () => {
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
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tickets/${ticketId}`, config);
                setTicketTitle(response.data.title);
                setTicketDescription(response.data.description);
            } catch (error) {
                console.error("Error fetching layout details:", error);
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
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/tickets/${ticketId}`, {
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
            <section className="mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" id="title" value={ticketTitle}
                               onChange={(changeEvent) => setTicketTitle(changeEvent.target.value)} className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea id="description" value={ticketDescription}
                                  onChange={(changeEvent) => setTicketDescription(changeEvent.target.value)} className="form-control" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <p className="mt-2">{errorMessage}</p>
                </form>
            </section>
        </>
    );
}

export default TicketEdit;