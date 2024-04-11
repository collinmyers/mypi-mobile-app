// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { account } from "../../utils/Config/config";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [changeAuthState, setChangeAuthState] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const getNameAndEmail = async () => {
        try {
            await account.get(); // fails if user is not authenticated
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




