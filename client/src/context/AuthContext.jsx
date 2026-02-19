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
    const storedToken = sessionStorage.getItem("site-token");
    const [token, setToken] = useState(storedToken && !isTokenExpired(storedToken) ? storedToken : null);

    // Sync token with sessionStorage (cleared automatically when tab/window closes)
    useEffect(() => {
        if (token) {
            sessionStorage.setItem("site-token", token);
        } else {
            sessionStorage.removeItem("site-token");
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