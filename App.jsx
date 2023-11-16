import React from "react";
import DrawerNavigator from "./components/navigation/DrawerNavigator";
import { setupURLPolyfill } from "react-native-url-polyfill";
import storage from "local-storage-fallback";
import { DirectionProvider } from "./components/Contexts/DirectionProvider";

export default function App() {
    setupURLPolyfill();
    if (!("localStorage" in window)) window.localStorage = storage;

    return (
        <DirectionProvider>
            <DrawerNavigator />
        </DirectionProvider>


    );
}
