import { createContext, useContext, useState, useEffect, use } from "react";

const AuthContext = createContext();
const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true; // malformed token = treat as expired
    }
};


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