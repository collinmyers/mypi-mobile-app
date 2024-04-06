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
import { appPrimaryColor, appQuarternaryColor, appSecondaryColor, appTertiaryColor, appTextColor } from "../../utils/colors/appColors";
import { StatusBar } from "expo-status-bar";
import { Entypo, Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import FoodTruckStackNavigator from "./FoodTruckStackNavigator";
import { useAuth } from "../context/AuthContext";
import { useNetwork } from "../context/NetworkContext";
import { Snackbar } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

    const { changeAuthState, isSignedIn, setIsSignedIn } = useAuth();
    const { isConnected, isInternetReachable } = useNetwork();
    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
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
    }, [changeAuthState]);

    const handleLogout = async () => {
        if (!isSigningOut) {
            try {
                setIsSigningOut(true);

                await account.deleteSessions("current");
                setIsSignedIn(false);

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
                        icon={({ focused }) => (
                            <Ionicons
                                name="person-circle"
                                size={24}
                                color={focused ? appPrimaryColor : appTertiaryColor}
                            />
                        )
                        }
                        onPress={handleLogout} />
                )}
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        );
    };

    useEffect(() => {
        //console.error(`Connected: ${isConnected} Internet Reachable: ${isInternetReachable}`);
        if (isConnected === false || isInternetReachable === false) {
            setErrorMessage("No internet connection, some app features may not be available until internet has been restored");
            setIsSnackbarVisible(true);
        } else if (isConnected === true && isInternetReachable === true) {
            setErrorMessage("");
            setIsSnackbarVisible(false);
        }
    }, [isInternetReachable]);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator
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
                            borderRightWidth: 2,
                            borderRightColor: appQuarternaryColor
                        }
                    }}
                >

                    {!isSignedIn && (
                        <Drawer.Screen
                            name="Sign In"
                            component={AuthStackNavigator}
                            options={{
                                header: () => { false; },
                                drawerIcon: ({ focused }) =>
                                    <Ionicons
                                        name="person-circle"
                                        size={24}
                                        color={focused ? appPrimaryColor : appTertiaryColor}
                                    />
                            }} />
                    )}

                    <Drawer.Screen
                        name="Home"
                        component={HomeTabNavigator}
                        options={{
                            headerShown: false,
                            drawerIcon: ({ focused }) => (
                                <Entypo
                                    name="home"
                                    size={24}
                                    color={focused ? appPrimaryColor : appTertiaryColor}
                                />
                            )
                        }}
                    />

                    <Drawer.Screen
                        name="Donate"
                        component={DonationsScreen}
                        options={{
                            header: () => <Menu />,
                            drawerIcon: ({ focused }) =>
                                <MaterialIcons
                                    name="volunteer-activism"
                                    size={24}
                                    color={focused ? appPrimaryColor : appTertiaryColor}
                                />
                        }}
                    />

                    <Drawer.Screen
                        name="FAQ"
                        component={FAQScreen}
                        options={{
                            header: () => <Menu />,
                            drawerIcon: ({ focused }) =>
                                <AntDesign
                                    name="infocirlce"
                                    size={24}
                                    color={focused ? appPrimaryColor : appTertiaryColor}
                                />
                        }}
                    />

                    <Drawer.Screen
                        name="Park Info"
                        component={ParkInfoScreen}
                        options={{
                            header: () => <Menu />,
                            drawerIcon: ({ focused }) =>
                                <MaterialIcons
                                    name="park"
                                    size={24}
                                    color={focused ? appPrimaryColor : appTertiaryColor}
                                />
                        }}
                    />

                    {isSignedIn && ((profileRole.role.includes("FoodTruck"))) ?
                        (<Drawer.Screen
                            name="Food Truck"
                            component={FoodTruckStackNavigator}
                            options={{
                                header: () => { false; },
                                drawerIcon: ({ focused }) =>
                                    <MaterialIcons
                                        name="fastfood"
                                        size={24}
                                        color={focused ? appPrimaryColor : appTertiaryColor}
                                    />
                            }}
                        />

                        ) :
                        null
                    }
                </Drawer.Navigator>
                {Platform.OS === "android" && useDrawerStatus === "open" ? null : <StatusBar style="dark" />}
                {Platform.OS === "ios" && <StatusBar style="dark" />}

                <Snackbar
                    visible={isSnackbarVisible}
                    maxFontSizeMultiplier={1}
                    style={AppStyle.snackBar}
                    onDismiss={() => {
                        setIsSnackbarVisible(false);
                        setErrorMessage(""); // Clear the error message
                    }}
                    action={{
                        textColor: appTextColor,
                        label: "Close",
                    }}
                    duration={10000}
                >
                    {errorMessage}
                </Snackbar>

            </NavigationContainer >
        </SafeAreaProvider>

    );

}

