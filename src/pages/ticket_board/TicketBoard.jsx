import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const TicketBoard = () => {
    const [tickets, setTickets] = useState([]);
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
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tickets?page=${page - 1}&sortingOrder=${sort}`, config);
                console.log("Response data:", response.data);
                setTickets(response.data.content);
            } catch (error) {
                if (error.response.status === 403) {
                    navigate("/sign-in");
                }
                console.error(`Error fetching tickets: ${error}`);
                setErrorMessage(`${error}`)
            }
        };

        fetchTickets();

    }, [navigate, page, sort]);

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
            <h2 className="mt-4 mb-3">Ticket board</h2>
            <section>
                <label htmlFor="sortingOrder" className="mr-2">Order by updating date:</label>
                <select id="sortingOrder" value={sort} onChange={handleSortingChange} className="form-select mb-3">
                    <option value="NO_SORT">No Sorting</option>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Author</th>
                        <th>Operator</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td>
                                <Link to={`/tickets/${ticket.id}`} className="text-decoration-none text-dark">
                                    {ticket.title}
                                </Link>
                            </td>
                            <td>{ticket.description}</td>
                            <td>{ticket.status}</td>
                            <td>{ticket.author.username}</td>
                            <td>{ticket.operator != null ? ticket.operator.username : "-"}</td>
                            <td>{formatDate(ticket.createdAt)}</td>
                            <td>{formatDate(ticket.updatedAt)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between align-items-center">
                    <button onClick={handlePrevPage} className="btn btn-secondary">Previous Page</button>
                    <span>Page: {page}</span>
                    <button onClick={handleNextPage} className="btn btn-secondary">Next Page</button>
                </div>
                <p className="mt-3">{errorMessage}</p>
            </section>
        </>
    );
}

export default TicketBoard;
