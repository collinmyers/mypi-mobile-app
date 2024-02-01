import React from "react";
import DrawerNavigator from "./components/navigation/DrawerNavigator";
import { setupURLPolyfill } from "react-native-url-polyfill";
import storage from "local-storage-fallback";
import { StatusBar } from "expo-status-bar";

export default function App() {
    setupURLPolyfill();
    if (!("localStorage" in window)) window.localStorage = storage;

    return (
        <DrawerNavigator >
            <StatusBar />
        </DrawerNavigator>
    );
}
