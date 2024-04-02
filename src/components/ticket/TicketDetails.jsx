import React, {useEffect, useState} from "react";
import TicketNavComponent from "./base/TicketNav";
import axios from "axios";
import {useParams} from "react-router-dom";

const TicketDetailsComponent = () => {
    const {ticketId} = useParams();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(`http://localhost:8080/tickets/${ticketId}`, config);
                setTicket(response.data);
            } catch (error) {
                console.error("Error fetching ticket details:", error);
            }
        };

        fetchTicketDetails();
    }, [ticketId]);

    if (!ticket) {
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

    const changeStatus = async (newStatus) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            const response = await axios.patch(
                `http://localhost:8080/tickets/${ticketId}?status=${newStatus}`,
                {},
                config
            );
            setTicket(response.data);
        } catch (error) {
            console.error('Error updating ticket status:', error);
        }
    };

    const getAvailableAction = () => {
        switch (ticket.status) {
            case "DRAFT":
                return (
                    <button onClick={() => changeStatus("SENT")}>Send</button>
                );
            case "SENT":
                return (
                    <button onClick={() => changeStatus("DRAFT")}>Cancel sending</button>
                );
            default:
                return (
                    <button disabled>Cancel sending</button>
                );
        }
    };

    return (
        <>
            <TicketNavComponent/>
            {getAvailableAction()}
            <h2>{ticket.title}</h2>
            <p>Status: {ticket.status}</p>
            <p>{ticket.description}</p>
            <p>Operator: {ticket.operator != null ? ticket.operator.name : "No operator"}</p>
            <p>{ticket.operator != null ? "Operator email: " + ticket.operator.email : ""}</p>
            <data>Created at: {formatDate(ticket.createdAt)}</data>
            <data>{ticket.updatedAt != null ? "Last updated at: " + formatDate(ticket.updatedAt) : ""}</data>
        </>
    );
};

export default TicketDetailsComponent;