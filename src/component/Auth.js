import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('username')) || null;
    });

    const login = (user) => {
        setUser(user);
        localStorage.setItem('username', JSON.stringify(user));
        navigate('/home', { replace: true });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('username');
        navigate('/', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
