import { createContext, useContext, useState, useEffect, use } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("site-token") || null);

    // Sync token with localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem("site-token", token);
        } else {
            localStorage.removeItem("site-token");
        }
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };  

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);