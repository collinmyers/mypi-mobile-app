import React from "react";
import DrawerNavigator from "./components/navigation/DrawerNavigator";
import { setupURLPolyfill } from "react-native-url-polyfill";
import storage from "local-storage-fallback";
import { AuthProvider } from "./components/context/AuthContext";
import { NetworkProvider } from "./components/context/NetworkContext";

export default function App() {
    setupURLPolyfill();
    if (!("localStorage" in window)) window.localStorage = storage;

   

    return (
        <NetworkProvider>
            <AuthProvider>
                <DrawerNavigator />
            </AuthProvider>
        </NetworkProvider>
    );
}
