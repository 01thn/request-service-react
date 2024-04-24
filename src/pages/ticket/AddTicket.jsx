import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddTicket = () => {

    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (submitEvent) => {
        try {
            submitEvent.preventDefault();
            console.log(`ticket with title: ${ticketTitle} description ${ticketDescription}`);
            const token = localStorage.getItem("token");
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/tickets`, {
                "title": ticketTitle,
                "description": ticketDescription
            }, config);
            navigate("/tickets");
        } catch (error) {
            if (error.response.status === 403) {
                navigate("/sign-in");
            }
            console.error(`Error fetching tickets: ${error}`);
            setErrorMessage(`${error}`)
        }

    }

    return (
        <>
            <h2>Create new ticket</h2>
            <section>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={ticketTitle}
                               onChange={(changeEvent) => setTicketTitle(changeEvent.target.value)} required/>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" value={ticketDescription}
                                  onChange={(changeEvent) => setTicketDescription(changeEvent.target.value)} required/>
                    </div>
                    <button type="submit">Create</button>
                    <p>{errorMessage}</p>
                </form>
            </section>
        </>
    );

}

export default AddTicket;
