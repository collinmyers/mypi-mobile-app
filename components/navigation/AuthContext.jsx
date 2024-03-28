// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { account } from "../../utils/Config/appwriteConfig";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [changeAuthState, setChangeAuthState] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const getNameAndEmail = async () => {
        try {
            const response = await account.get();

            setIsSignedIn(true);
        } catch {
            setIsSignedIn(false);
        }
    };

    useEffect(() => {
        getNameAndEmail();
    }, []);

    return (
        <AuthContext.Provider value={{ changeAuthState, setChangeAuthState, isSignedIn, setIsSignedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);




