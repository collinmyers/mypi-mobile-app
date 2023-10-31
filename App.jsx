import React, { useState, useEffect } from "react";
import HomeTabNavigator from "./components/navigation/HomeTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import AppHeader from "./components/navigation/AppHeader";
import ParkInfoScreen from "./sidebarScreens/ParkInfo";
import FAQScreen from "./sidebarScreens/FAQ";
import AuthStackNavigator from "./components/navigation/AuthStackNavigator";
import { Client, Account } from "appwrite";

const Drawer = createDrawerNavigator();

export default function App() {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [refreshDrawer, setRefreshDrawer] = useState(0);

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
    }, [refreshDrawer]);

    const handleLoginSuccess = () => {
        setIsSignedIn(true);
        setRefreshDrawer((prev) => prev + 1);
    };

    const handleLogout = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);

            await account.deleteSessions("current");

            setRefreshDrawer((prev) => prev + 1);

        } catch (error) {
            console.error(error);
        }
    };

    const SignOutDrawerItem = (props) => {
        return (
            <DrawerContentScrollView {...props}>

                {isSignedIn && (
                    <DrawerItem
                        label="Sign Out"
                        labelStyle={{
                            color: "#134C77",
                            fontSize: 20,
                        }}

                        onPress={handleLogout} />

                )}
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        );
    };

    const AuthStackWithLoginSuccess = () => <AuthStackNavigator handleLoginSuccess={handleLoginSuccess} />;

    return (
        <NavigationContainer>
            <Drawer.Navigator
                key={refreshDrawer}
                initialRouteName="Home"
                drawerContent={(props) => <SignOutDrawerItem {...props} />}
                screenOptions={{
                    overlayColor: "transparent",
                    drawerLabelStyle: {
                        color: "#134C77",
                        fontSize: 20,
                    },
                    drawerActiveBackgroundColor: "none",
                    drawerStyle: {
                        backgroundColor: "#8FA063",
                    }
                }}
            >

                {!isSignedIn && (
                    <Drawer.Screen
                        name="Sign In"
                        component={AuthStackWithLoginSuccess}
                        options={{ header: () => <AppHeader /> }}
                    />
                )}
                <Drawer.Screen name="Home" component={HomeTabNavigator} options={{ header: () => <AppHeader /> }} />
                <Drawer.Screen name="FAQ" component={FAQScreen} options={{ header: () => <AppHeader /> }} />
                <Drawer.Screen name="Park Info" component={ParkInfoScreen} options={{ header: () => <AppHeader /> }} />

            </Drawer.Navigator>
        </NavigationContainer >
    );
}

