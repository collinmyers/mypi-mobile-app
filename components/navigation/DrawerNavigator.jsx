import React, { useState, useEffect } from "react";
import { Linking, Platform } from "react-native";
import HomeTabNavigator from "./HomeTabNavigator";
import { NavigationContainer, useDrawerStatus } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Menu from "./Headers/AppHeader";
import AboutScreen from "../../screens/Sidebar/About";
import FAQScreen from "../../screens/Sidebar/FAQ";
import DonationsScreen from "../../screens/Sidebar/Donation";
import AuthStackNavigator from "./Sidebar/AuthStackNavigator";
import { account, DONATIONS_PROVIDER_LINK, APPROVED_NON_PROFIT } from "../../utils/Config/config";
import { appPrimaryColor, appQuarternaryColor, appSecondaryColor, appTertiaryColor, appTextColor } from "../../utils/colors/appColors";
import { StatusBar } from "expo-status-bar";
import { Entypo, Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useNetwork } from "../context/NetworkContext";
import { useAppState } from "../context/AppStateContext";
import { Snackbar } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FoodTruckScreen from "../../screens/Sidebar/FoodTruck";
import PropTypes from "prop-types";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

    const { changeAuthState, isSignedIn, setIsSignedIn } = useAuth();
    const { isInternetReachable } = useNetwork();
    const { isAppActive, wasInBackground, setWasInBackground } = useAppState();
    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [profileRole, setProfileRole] = useState({ role: "", });

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


    const CustomDrawerItems = (props) => {
        const { navigation } = props;

        return (
            <DrawerContentScrollView {...props}>
                {/* Sign In/Sign Out */}
                {!isSignedIn ? (
                    <DrawerItem
                        label="Sign In"
                        onPress={() => navigation.navigate("Sign In")}
                        icon={({ focused }) => (
                            <Ionicons
                                name="person-circle"
                                size={24}
                                color={focused ? appPrimaryColor : appTertiaryColor}
                            />
                        )}
                        labelStyle={{ color: appTextColor, fontSize: 20 }}
                    />
                ) : (
                    <DrawerItem
                        label="Sign Out"
                        onPress={handleLogout}
                        icon={({ focused }) => (
                            <Ionicons
                                name="person-circle"
                                size={24}
                                color={focused ? appPrimaryColor : appTertiaryColor}
                            />
                        )}
                        labelStyle={{ color: appTextColor, fontSize: 20 }}
                    />
                )}

                {/* Home */}
                <DrawerItem
                    label="Home"
                    onPress={() => navigation.navigate("Home")}
                    icon={({ focused }) => (
                        <Entypo
                            name="home"
                            size={24}
                            color={focused ? appPrimaryColor : appTertiaryColor}
                        />
                    )}
                    labelStyle={{ color: appTextColor, fontSize: 20 }}
                />

                {/* Donate */}
                {APPROVED_NON_PROFIT.toLowerCase() === "true" ? (
                    <DrawerItem
                        label="Donate"
                        onPress={() => navigation.navigate("Donate")}
                        icon={({ focused }) => (
                            <MaterialIcons
                                name="volunteer-activism"
                                size={24}
                                color={focused ? appPrimaryColor : appTertiaryColor}
                            />
                        )}
                        labelStyle={{ color: appTextColor, fontSize: 20 }}
                    />
                ) : (
                    <DrawerItem
                        label="Donate"
                        onPress={() => handlePress(DONATIONS_PROVIDER_LINK)}
                        icon={({ focused }) => (
                            <MaterialIcons
                                name="volunteer-activism"
                                size={24}
                                color={focused ? appPrimaryColor : appTertiaryColor}
                            />
                        )}
                        labelStyle={{ color: appTextColor, fontSize: 20 }}
                    />
                )}

                {/* FAQ */}
                <DrawerItem
                    label="FAQ"
                    onPress={() => navigation.navigate("FAQ")}
                    icon={({ focused }) => (
                        <MaterialCommunityIcons
                            name="frequently-asked-questions"
                            size={24}
                            color={focused ? appPrimaryColor : appTertiaryColor}
                        />
                    )}
                    labelStyle={{ color: appTextColor, fontSize: 20 }}
                />

                {/* About */}
                <DrawerItem
                    label="About"
                    onPress={() => navigation.navigate("About")}
                    icon={({ focused }) => (
                        <FontAwesome6
                            name="circle-info"
                            size={24}
                            color={focused ? appPrimaryColor : appTertiaryColor}
                        />
                    )}
                    labelStyle={{ color: appTextColor, fontSize: 20 }}
                />

                {/* Food Truck */}
                {isSignedIn && profileRole.role.includes("FoodTruck") && (
                    <DrawerItem
                        label="Food Truck"
                        onPress={() => navigation.navigate("Food Truck")}
                        icon={({ focused }) => (
                            <MaterialIcons
                                name="fastfood"
                                size={24}
                                color={focused ? appPrimaryColor : appTertiaryColor}
                            />
                        )}
                        labelStyle={{ color: appTextColor, fontSize: 20 }}
                    />
                )}
            </DrawerContentScrollView>
        );
    };

    CustomDrawerItems.propTypes = {
        navigation: PropTypes.object.isRequired, // Validate the navigation prop
    };


    const handlePress = (url) => {
        Linking.openURL(url)
            .catch(err => console.error("An error occurred", err));
    };

    useEffect(() => {
        if (isInternetReachable === false && isAppActive && !wasInBackground) {
            setErrorMessage("No internet connection, some app features may not be available until internet has been restored.");
            setIsSnackbarVisible(true);
        } else if (isAppActive && wasInBackground) {
            setWasInBackground(false); // Reset the flag when app becomes active again
        }

    }, [isInternetReachable, isAppActive]);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    drawerContent={(props) => <CustomDrawerItems {...props} />}
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
                                <MaterialCommunityIcons
                                    name="frequently-asked-questions"
                                    size={24}
                                    color={focused ? appPrimaryColor : appTertiaryColor}
                                />
                        }}
                    />

                    <Drawer.Screen
                        name="About"
                        component={AboutScreen}
                        options={{
                            header: () => <Menu />,
                            drawerIcon: ({ focused }) =>
                                <FontAwesome6
                                    name="circle-info"
                                    size={24}
                                    color={focused ? appPrimaryColor : appTertiaryColor}
                                />
                        }}
                    />

                    {isSignedIn && ((profileRole.role.includes("FoodTruck"))) ?
                        (<Drawer.Screen
                            name="Food Truck"
                            component={FoodTruckScreen}
                            options={{
                                header: () => <Menu />,
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
                    style={[AppStyle.snackBar, { marginBottom: "12%" }]}
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

