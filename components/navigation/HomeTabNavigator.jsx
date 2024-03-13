import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import DashboardScreen from "../../screens/Central/Dashboard";
import SettingsStackNavigator from "./SettingsStackNavigator";
import EventsStackNavigator from "./EventsStackNavigator";
import MapStackNavigator from "./MapStackNavigator";
import { appPrimaryColor, appSecondaryColor, appTertiaryColor } from "../../utils/colors/appColors";
import Menu from "./AppHeader";
import AlertsStackNavigator from "./AlertsStackNavigator";

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: appTertiaryColor,
                tabBarInactiveTintColor: appSecondaryColor,
                tabBarStyle: {
                    backgroundColor: appPrimaryColor,
                    borderTopWidth: 1,
                    borderTopColor: appSecondaryColor
                },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: "Home",
                    header: () => <Menu />,
                    tabBarIcon: ({ focused }) => (
                        <Entypo name="home" size={24} color={focused ? appTertiaryColor : appSecondaryColor} />
                    )
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapStackNavigator}
                options={{
                    tabBarLabel: "Map",
                    header: () => <Menu />,
                    tabBarIcon: ({ focused }) => (
                        <Entypo name="map" size={24} color={focused ? appTertiaryColor : appSecondaryColor} />
                    )
                }}
            />
            <Tab.Screen
                name="EventList"
                component={EventsStackNavigator}
                options={{
                    tabBarLabel: "Events",
                    header: () => false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="calendar-month-outline" size={24} color={focused ? appTertiaryColor : appSecondaryColor} />
                    )
                }}
            />
            <Tab.Screen
                name="Alerts"
                component={AlertsStackNavigator}
                options={{
                    tabBarLabel: "Notifications",
                    header: () => false,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5 name="bell" size={24} color={focused ? appTertiaryColor : appSecondaryColor} />
                    )
                }}
            />
            <Tab.Screen
                name="SettingsStack"
                component={SettingsStackNavigator}
                options={{
                    tabBarLabel: "Settings",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Octicons name="gear" size={24} color={focused ? appTertiaryColor : appSecondaryColor} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}
