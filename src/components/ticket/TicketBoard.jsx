import React, {useEffect, useState} from "react";
import axios from "axios";
import TicketNavComponent from "./base/TicketNav";
import {useNavigate} from "react-router-dom";

const TicketBoardComponent = () => {
    const [tickets, setTickets] = useState([])
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("NO_SORT");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(`http://localhost:8080/tickets?page=${page - 1}&sortingOrder=${sort}`, config);
                console.log("Response data:", response.data);
                setTickets(response.data.content);
            } catch (error) {
                if (error.response.status === 403){
                    navigate("/sign-in");
                }
                console.error(`Error fetching tickets: ${error}`);
                setErrorMessage(`${error}`)
            }
        };

        fetchTickets();

    }, [page, sort]);

    const handleSortingChange = (event) => {
        setSort(event.target.value);
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

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
            <TicketNavComponent/>
            <h2>Ticket board</h2>
            <section>
                <label htmlFor="sortingOrder">Order by updating date:</label>
                <select id="sortingOrder" value={sort} onChange={handleSortingChange}>
                    <option value="NO_SORT">No Sorting</option>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
                <table border="solid">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Author</th>
                        <th>Email</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.title}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.status}</td>
                            <td>{ticket.author.username}</td>
                            <td>{ticket.author.email}</td>
                            <td>{formatDate(ticket.createdAt)}</td>
                            <td>{formatDate(ticket.updatedAt)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <button onClick={handlePrevPage}>Previous Page</button>
                    <span>Page: {page}</span>
                    <button onClick={handleNextPage}>Next Page</button>
                </div>
                <p>{errorMessage}</p>
            </section>
        </>
    );
}

export default TicketBoardComponent;
