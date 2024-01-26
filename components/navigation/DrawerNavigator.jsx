import React, { useState, useEffect } from "react";
import HomeTabNavigator from "../navigation/HomeTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import Menu from "../../components/navigation/AppHeader";
import ParkInfoScreen from "../../screens/Sidebar/ParkInfo";
import FAQScreen from "../../screens/Sidebar/FAQ";
import DonationsScreen from "../../screens/Sidebar/Donation";
import AuthStackNavigator from "./AuthStackNavigator";
import { Client, Account } from "appwrite";

import { Entypo, Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [refreshDrawer, setRefreshDrawer] = useState(0);

    const appBlue = "#134C77";
    const appGreen = "#8FA063";
    const appWhite = "#FFFFFF";

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
        if (!isSigningOut) {
            try {
                setIsSigningOut(true);
                const client = new Client()
                    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

                const account = new Account(client);

                await account.deleteSessions("current");

                setRefreshDrawer((prev) => prev + 1);

            } catch (error) {
                console.error(error);
            } finally {
                setIsSigningOut(false);
            }
        }
    };





    const SignOutDrawerItem = (props) => {
        return (
            <DrawerContentScrollView {...props}>

                {isSignedIn && (
                    <DrawerItem
                        label="Sign Out"
                        labelStyle={{
                            color: appWhite,
                            fontSize: 20,
                        }}
                        icon={() => (<Ionicons name="person-circle" size={24} color={appBlue} />)}

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
                        color: appWhite,
                        fontSize: 20,
                    },
                    drawerActiveBackgroundColor: "none",
                    drawerStyle: {
                        backgroundColor: appGreen,
                    }
                }}
            >

                {!isSignedIn && (
                    <Drawer.Screen
                        name="Sign In"
                        component={AuthStackWithLoginSuccess}
                        options={{
                            header: () => {false;},
                            drawerIcon: () => <Ionicons name="person-circle" size={24} color={appBlue} />
                        }} />
                )}
                <Drawer.Screen name="Home" component={HomeTabNavigator} options={{ header: () => false, drawerIcon: () => <Entypo name="home" size={24} color={appBlue} /> }} />
                <Drawer.Screen name="Donate" component={DonationsScreen} options={{ header: () => <Menu />, drawerIcon: () => <MaterialIcons name="volunteer-activism" size={24} color={appBlue} /> }} />
                <Drawer.Screen name="FAQ" component={FAQScreen} options={{ header: () => <Menu />, drawerIcon: () => <AntDesign name="infocirlce" size={24} color={appBlue} /> }} />
                <Drawer.Screen name="Park Info" component={ParkInfoScreen} options={{ header: () => <Menu />, drawerIcon: () => <MaterialIcons name="park" size={24} color={appBlue} /> }} />
            </Drawer.Navigator>
        </NavigationContainer >
    );

}