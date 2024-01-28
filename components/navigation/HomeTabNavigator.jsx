import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Fontisto, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

import DashboardScreen from "../../screens/Central/Dashboard";
import SettingsStackNavigator from "./SettingsStackNavigator";
import EventsStackNavigator from "./EventsStackNavigator";
import MapStackNavigator from "./MapStackNavigator";
import { appPrimaryColor, appSecondaryColor, appTextColor } from "../../utils/colors/appColors";
import Menu from "./AppHeader";
import AlertsStackNavigator from "./AlertsStackNavigator";

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
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
                    header: () => <Menu />,
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
                    header: () => <Menu />,
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
                component={AlertsStackNavigator}
                options={{
                    tabBarLabel: "Alerts",
                    header: () => false,
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
