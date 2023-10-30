import React, { useState, useEffect } from "react";
import HomeTabNavigator from "./components/navigation/HomeTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import AppHeader from "./components/navigation/AppHeader";
import ParkInfoScreen from "./sidebarScreens/ParkInfo";
import FAQScreen from "./sidebarScreens/FAQ";
import AuthStackNavigator from "./components/navigation/AuthStackNavigator";
// import HandleAuthState from "./components/navigation/AuthStateDrawer";
import { Client, Account } from "appwrite";
// import { AuthDrawer } from "./utils/drawer";

const Drawer = createDrawerNavigator();


export default function App() {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [drawerKey, setDrawerKey] = useState(0);

    const checkAuthState = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);

            await account.get();
            setIsSignedIn(true);

        } catch {
            setIsSignedIn(false);
        }
    };

    useEffect(() => {
        checkAuthState();
        console.log(isSignedIn);
    }, [drawerKey]);

    const handleLogout = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);

            await account.deleteSessions("current");

            setDrawerKey((prev) => prev + 1);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    {isSignedIn && (
                        <DrawerItem label="Sign Out" onPress={handleLogout} />
                    )}
                </DrawerContentScrollView>
            )}

            // screenOptions={{
            //     drawerLabelStyle: { color: "#134C77" },
            //     drawerStyle: {
            //         backgroundColor: "#8FA063",
            //     }
            // }}
            >
                <Drawer.Screen name="Home" component={HomeTabNavigator} options={{ header: () => <AppHeader /> }} />

                {!isSignedIn && (
                    <Drawer.Screen name="Sign In" component={AuthStackNavigator} options={{ header: () => <AppHeader /> }} />
                )}

                <Drawer.Screen name="FAQ" component={FAQScreen} options={{ header: () => <AppHeader /> }} />
                <Drawer.Screen name="Park Info" component={ParkInfoScreen} options={{ header: () => <AppHeader /> }} />

            </Drawer.Navigator>
        </NavigationContainer >
    );
}

