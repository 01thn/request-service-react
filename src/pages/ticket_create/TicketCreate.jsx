import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const TicketCreate = () => {

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
            <h2 className="mt-4 mb-3">Create new ticket</h2>
            <section>
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
                    <button type="submit" className="btn btn-primary">Create</button>
                    <p className="mt-2">{errorMessage}</p>
                </form>
            </section>
        </>
    );

}

export default TicketCreate;
