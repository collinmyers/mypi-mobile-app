import React, { createContext, useContext, useState, useEffect } from "react";
import { addEventListener, fetch } from "@react-native-community/netinfo";
import PropTypes from "prop-types";

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => { // provide status of if device is connected and internet is reachable 
    const [isConnected, setIsConnected] = useState(true); 
    const [isInternetReachable, setIsInternetReachable] = useState(true); 

    useEffect(() => {
        const handleConnectivityChange = (state) => {
            setIsConnected(state.isConnected);
            setIsInternetReachable(state.isInternetReachable);
        };

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
