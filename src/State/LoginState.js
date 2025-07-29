// src/State/LoginState.js
import { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const savedToken = localStorage.getItem("accessToken");
    const savedId = localStorage.getItem("userId");

    const [login, setLogin] = useState({
        isLogin: !!savedToken,
        idx: savedId ? Number(savedId) : null,
        token: savedToken || null
    });

    return (
        <LoginContext.Provider value={{ login, setLogin }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
