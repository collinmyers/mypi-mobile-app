import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Fontisto, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

import DashboardScreen from "../../screens/Central/Dashboard";
import MapScreen from "../../screens/Central/Map";
import AlertsScreen from "../../screens/Central/Alerts";
import SettingsStackNavigator from "./SettingsStackNavigator";
import EventsStackNavigator from "./EventsStackNavigator";

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
    return (

        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: "#8FA063",
                tabBarInactiveTintColor: "#FFFFFF",
                tabBarStyle: {
                    backgroundColor: "#134C77",
                    borderTopColor: "#8FA063",
                    borderTopWidth: 1,
                },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: "Dashboard",
                    headerShown: false,
                    tabBarIcon: () => (
                        <Entypo name="home" size={24} color="#8FA063" />
                    )
                }}
            />

            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarLabel: "Map",
                    headerShown: false,
                    tabBarIcon: () => (
                        <Entypo name="map" size={24} color="#8FA063" />
                    )
                }}
            />

            <Tab.Screen
                name="EventList"
                component={EventsStackNavigator}
                options={{
                    tabBarLabel: "Events",
                    headerShown: false,
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="calendar-month-outline" size={24} color="#8FA063" />
                    )
                }}
            />


            <Tab.Screen
                name="Alerts"
                component={AlertsScreen}
                options={{
                    tabBarLabel: "Alerts",
                    headerShown: false,
                    tabBarIcon: () => (
                        <Fontisto name="bell" size={24} color="#8FA063" />
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
                        <Octicons name="gear" size={24} color="#8FA063" />
                    )
                }}
            />

        </Tab.Navigator>
    );
}
