import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const DirectionContext = createContext();

export const DirectionProvider = ({ children }) => {
    const [directionsPreference, setDirectionsPreference] = useState("walk");

    return (
        <DirectionContext.Provider value={{ directionsPreference, setDirectionsPreference }}>
            {children}
        </DirectionContext.Provider>
    );
};

DirectionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useDirections = () => {
    return useContext(DirectionContext);
};
