import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Helper: checks if a JWT token is expired
const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true; // malformed token = treat as expired
    }
};

// Helper: extracts the username (NetID) from a JWT payload
const getUsernameFromToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.username || null;
    } catch {
        return null;
    }
};


export const AuthProvider = ({ children }) => {
    const storedToken = sessionStorage.getItem("site-token");
    const validToken = storedToken && !isTokenExpired(storedToken) ? storedToken : null;

    const [token, setToken] = useState(validToken);
    // Holds the signed-in user's NetID; restored from JWT on page refresh
    const [user, setUser] = useState(validToken ? getUsernameFromToken(validToken) : null);

    // Sync token with sessionStorage (cleared automatically when tab/window closes)
    useEffect(() => {
        if (token) {
            sessionStorage.setItem("site-token", token);
        } else {
            sessionStorage.removeItem("site-token");
        }
    }, [token]);

    // Sets both the token and the username (NetID) on login
    const login = (newToken, username) => {
        setToken(newToken);
        setUser(username);
    };

    // Clears token and user on logout
    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

// --- Export for Unit testing ---
export { isTokenExpired, getUsernameFromToken};