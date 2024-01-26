import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Fontisto, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

import DashboardScreen from "../../screens/Central/Dashboard";
import AlertsScreen from "../../screens/Central/Alerts";
import SettingsStackNavigator from "./SettingsStackNavigator";
import EventsStackNavigator from "./EventsStackNavigator";
import MapStackNavigator from "./MapStackNavigator";

import Menu from "./AppHeader";

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {

    const appPrimaryColor = "#134C77";
    const appSecondaryColor = "#8FA063";
    const appTextColor = "#FFFFFF";

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: appSecondaryColor,
                tabBarInactiveTintColor: appTextColor,
                tabBarStyle: {
                    backgroundColor: appPrimaryColor,
                    borderTopColor: appSecondaryColor,
                    borderTopWidth: 1,
                },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: "Dashboard",
                    header: () => <Menu/>,
                    tabBarIcon: () => (
                        <Entypo name="home" size={24} color={appSecondaryColor} />
                    )
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapStackNavigator}
                options={{
                    tabBarLabel: "Map",
                    header: () => <Menu/>,
                    tabBarIcon: () => (
                        <Entypo name="map" size={24} color={appSecondaryColor} />
                    )
                }}
            />
            <Tab.Screen
                name="EventList"
                component={EventsStackNavigator}
                options={{
                    tabBarLabel: "Events",
                    header: () => false,
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="calendar-month-outline" size={24} color={appSecondaryColor} />
                    )
                }}
            />
            <Tab.Screen
                name="Alerts"
                component={AlertsScreen}
                options={{
                    tabBarLabel: "Alerts",
                    header: () => <Menu/>,
                    tabBarIcon: () => (
                        <Fontisto name="bell" size={24} color={appSecondaryColor} />
                    )
                }}
            />
            <Tab.Screen
                name="SettingsStack"
                component={SettingsStackNavigator}
                options={{
                    tabBarLabel: "Settings",
                    headerShown: false,
                    tabBarIcon: () => (
                        <Octicons name="gear" size={24} color={appSecondaryColor} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}
