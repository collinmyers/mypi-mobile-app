import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import PropTypes from "prop-types";

export const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => { // provide current state of whether app is in foreground or background
  const [isAppActive, setIsAppActive] = useState(true);

  useEffect(() => {
    const handleAppStateChangeInternal = (nextAppState) => {
      if (nextAppState === "active") {
        setIsAppActive(true);
        
      } else {
        setIsAppActive(false);
      }
    };

    // Subscribe to app state changes
    const unsubscribeAppState = AppState.addEventListener("change", handleAppStateChangeInternal);

    return () => {
      unsubscribeAppState.remove(); // Unsubscribe from app state changes
    };
  }, []);

  return (
    <AppStateContext.Provider value={{ isAppActive }}>
      {children}
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  handleAppStateChange: PropTypes.func,
};

export const useAppState = () => useContext(AppStateContext);
