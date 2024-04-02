
import React, { createContext, useContext, useState, useEffect } from "react";
import { addEventListener, fetch } from "@react-native-community/netinfo";
import PropTypes from "prop-types";

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true); // Default to true assuming initial connection
    const [isInternetReachable, setIsInternetReachable] = useState(true); // Default to true assuming initial connection

    useEffect(() => {
        const handleConnectivityChange = (state) => {
            setIsConnected(state.isConnected);
            setIsInternetReachable(state.isInternetReachable);
        };

        // Subscribe to network state changes
        const unsubscribe = addEventListener(handleConnectivityChange);

        // Fetch initial network state
        fetch().then(handleConnectivityChange);

        return () => {
            // Unsubscribe from network state changes when the component unmounts
            unsubscribe();
        };
    }, []);

    return (
        <NetworkContext.Provider value={{ isConnected, isInternetReachable }}>
            {children}
        </NetworkContext.Provider>
    );
};

NetworkProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useNetwork = () => useContext(NetworkContext);
