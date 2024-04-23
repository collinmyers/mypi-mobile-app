// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { account } from "../../utils/Config/config";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ changeAuthState, setChangeAuthState ] = useState(false);
    const [ isSignedIn, setIsSignedIn ] = useState(false);
    const [ changeMade, setChangeMade ] = useState(false);

    const getAuthState = async () => {
        try {
            await account.get().then((response) => {
                if (response.email === "" || response.name === "" || response.passwordUpdate === "") {
                    throw new Error("Not a registered user");
                }
                setIsSignedIn(true);
            });
        } catch (error) {
            setIsSignedIn(false);
        }
    };

    useEffect(() => {
        getAuthState();
    }, []);

    return (
        <AuthContext.Provider value={{ changeAuthState, setChangeAuthState, isSignedIn, setIsSignedIn, changeMade, setChangeMade }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);




