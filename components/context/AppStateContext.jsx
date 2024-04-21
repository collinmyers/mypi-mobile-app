import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import PropTypes from "prop-types";

export const AppStateContext = createContext();

export const AppStateProvider = ({ children, handleAppStateChange }) => {
  const [isAppActive, setIsAppActive] = useState(true);
  const [wasInBackground, setWasInBackground] = useState(false);

  useEffect(() => {
    const handleAppStateChangeInternal = (nextAppState) => {
      if (nextAppState === "active") {
        setIsAppActive(true);
        if (wasInBackground && handleAppStateChange) {
          handleAppStateChange();
        }
        setWasInBackground(false); // Reset the flag when app becomes active again
      } else {
        setIsAppActive(false);
        if (nextAppState === "background") {
          setWasInBackground(true); // Set flag when app becomes background
        }
      }
    };

    // Subscribe to app state changes
    const unsubscribeAppState = AppState.addEventListener("change", handleAppStateChangeInternal);

    return () => {
      unsubscribeAppState.remove(); // Unsubscribe from app state changes
    };
  }, [handleAppStateChange, wasInBackground]);

  return (
    <AppStateContext.Provider value={{ isAppActive, wasInBackground, setWasInBackground }}>
      {children}
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  handleAppStateChange: PropTypes.func, // Add prop type validation for handleAppStateChange
};

export const useAppState = () => useContext(AppStateContext);
