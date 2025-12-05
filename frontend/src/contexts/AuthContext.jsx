import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/user",
});

export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            const request = await client.post("/register", {
                name,
                username,
                password,
            });

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            const request = await client.post("/login", {
                username,
                password,
            });

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                setUserData(request.data.user);
                navigate("/home");
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{ userData, setUserData, handleRegister, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
