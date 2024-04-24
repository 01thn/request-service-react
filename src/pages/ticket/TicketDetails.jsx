import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const TicketDetails = () => {
    const {ticketId} = useParams();
    const [ticket, setTicket] = useState(null);
    const [userRoles, setUserRoles] = useState(null);

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                setUserRoles(localStorage.getItem("roles"));
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tickets/${ticketId}`, config);
                setTicket(response.data);
            } catch (error) {
                console.error("Error fetching layout details:", error);
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
                `${process.env.REACT_APP_SERVER_URL}/tickets/${ticketId}?status=${newStatus}`,
                {},
                config
            );
            setTicket(response.data);
        } catch (error) {
            console.error('Error updating layout status:', error);
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
                    <>
                        {(userRoles != null) && (userRoles.includes("ROLE_USER")) ?
                            <button onClick={() => changeStatus("DRAFT")}>Cancel sending</button> :
                            <button disabled onClick={() => changeStatus("DRAFT")}>Cancel sending</button>
                        }

                        {(userRoles != null) && (userRoles.includes("ROLE_OPERATOR") || userRoles.includes("ROLE_ADMIN")) && (
                            <>
                                <button onClick={() => changeStatus("ACCEPTED")}>Accept</button>
                                <button onClick={() => changeStatus("REJECTED")}>Reject</button>
                            </>
                        )}
                    </>
                );
            default:
                return (
                    <button disabled>Cancel sending</button>
                );
        }
    };

    const getEditButton = () => {
        return (
            <>
                {
                    (userRoles != null) && (userRoles.includes("ROLE_USER") && (ticket.status === "DRAFT") && (
                        <>
                            <Link to={`/tickets/${ticket.id}/edit`}>Edit ticket</Link>
                        </>
                    ))
                }
            </>
        );
    }

    return (
        <>
            <div>
                {getEditButton()}
                {getAvailableAction()}
            </div>
            <section>
                <h2>{ticket.title}</h2>
                <p>Status: {ticket.status}</p>
                <p>{ticket.description}</p>
                <p>Operator: {ticket.operator != null ? `${ticket.operator.firstName} ${ticket.operator.lastName}` : "No operator"}</p>
                <p>{ticket.operator != null ? "Operator email: " + ticket.operator.email : ""}</p>
                <p>
                    <data>Created at: {formatDate(ticket.createdAt)}</data>
                </p>
                <p>
                    <data>{ticket.updatedAt != null ? "Last updated at: " + formatDate(ticket.updatedAt) : ""}</data>
                </p>
            </section>
        </>
    );
};

export default TicketDetails;