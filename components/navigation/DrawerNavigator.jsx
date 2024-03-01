import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import HomeTabNavigator from "../navigation/HomeTabNavigator";
import { NavigationContainer, useDrawerStatus } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import Menu from "../../components/navigation/AppHeader";
import ParkInfoScreen from "../../screens/Sidebar/ParkInfo";
import FAQScreen from "../../screens/Sidebar/FAQ";
import DonationsScreen from "../../screens/Sidebar/Donation";
import AuthStackNavigator from "./AuthStackNavigator";
import { account } from "../../utils/Config/appwriteConfig";
import { appSecondaryColor, appTertiaryColor, appTextColor } from "../../utils/colors/appColors";
import { StatusBar } from "expo-status-bar";

import { Entypo, Ionicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import FoodTruckStackNavigator from "./FoodTruckStackNavigator";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [refreshDrawer, setRefreshDrawer] = useState(0);
    const [profileRole, setProfileRole] = useState({
        role: "",
    });

    const checkAuthState = async () => {
        try {
            const response = await account.get();

            if (response.email === "") throw new Error("Not a email user (guest)");

            setProfileRole({
                role: response.labels,
            });

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
                            color: appTextColor,
                            fontSize: 20,
                        }}
                        icon={() => (<Ionicons name="person-circle" size={24} color={appTertiaryColor} />)}

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
                        color: appTextColor,
                        fontSize: 20,
                    },
                    drawerActiveBackgroundColor: "none",
                    drawerStyle: {
                        backgroundColor: appSecondaryColor,
                    }
                }}
            >

                {!isSignedIn && (
                    <Drawer.Screen
                        name="Sign In"
                        component={AuthStackWithLoginSuccess}
                        options={{
                            header: () => { false; },
                            drawerIcon: () => <Ionicons name="person-circle" size={24} color={appTertiaryColor} />
                        }} />
                )}
                <Drawer.Screen name="Home" component={HomeTabNavigator} options={{ header: () => false, drawerIcon: () => <Entypo name="home" size={24} color={appTertiaryColor} /> }} />
                <Drawer.Screen name="Donate" component={DonationsScreen} options={{ header: () => <Menu />, drawerIcon: () => <MaterialIcons name="volunteer-activism" size={24} color={appTertiaryColor} /> }} />
                <Drawer.Screen name="FAQ" component={FAQScreen} options={{ header: () => <Menu />, drawerIcon: () => <AntDesign name="infocirlce" size={24} color={appTertiaryColor} /> }} />
                <Drawer.Screen name="Park Info" component={ParkInfoScreen} options={{ header: () => <Menu />, drawerIcon: () => <MaterialIcons name="park" size={24} color={appTertiaryColor} /> }} />

                {isSignedIn && ((profileRole.role == "admin") || (profileRole.role == "foodtruck")) ?
                    (<Drawer.Screen
                        name="Food Truck"
                        component={FoodTruckStackNavigator}
                        options={{
                            header: () => { false; },
                            drawerIcon: () => <MaterialCommunityIcons name="food-hot-dog" size={24} color={appTertiaryColor} />
                        }} />

                    ) :
                    null
                }
            </Drawer.Navigator>
            {Platform.OS === "android" && useDrawerStatus === "open" ? null : <StatusBar style="dark" />}
            {Platform.OS === "ios" && <StatusBar style="dark" />}
        </NavigationContainer >
    );

}