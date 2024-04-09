import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const LogOutComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        navigate("/");
    }, [navigate]);

}

export default LogOutComponent;