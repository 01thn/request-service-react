import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const UserBoard = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("NO_SORT");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?page=${page - 1}&sortingOrder=${sort}`, config);
                console.log("Response data:", response.data);
                setUsers(response.data.content);
            } catch (error) {
                if (error.response.status === 403) {
                    navigate("/sign-in");
                }
                console.error(`Error fetching tickets: ${error}`);
                setErrorMessage(`${error}`)
            }
        };

        fetchUsers();

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
            <h2>User board</h2>
            <section>
                <label htmlFor="sortingOrder">Order by register date:</label>
                <select id="sortingOrder" value={sort} onChange={handleSortingChange}>
                    <option value="NO_SORT">No Sorting</option>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
                <table border="solid">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>username</th>
                        <th>email</th>
                        <th>name</th>
                        <th>roles</th>
                        <th>registeredAt</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <Link to={`/users/${user.id}`}>
                            <td>{user.id}</td>
                            </Link>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{`${user.firstName} ${user.lastName.charAt(0)}.`}</td>
                            <td>{user.roles.join(", ")}</td>
                            <td>{formatDate(user.registeredAt)}</td>
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

export default UserBoard;