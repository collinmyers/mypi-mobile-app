import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Fontisto, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import DashboardScreen from "../../screens/Central/Dashboard";
import SettingsStackNavigator from "./SettingsStackNavigator";
import EventsStackNavigator from "./EventsStackNavigator";
import MapStackNavigator from "./MapStackNavigator";
import { appPrimaryColor, appSecondaryColor, appTextColor, appTertiaryColor, useAltUI } from "../../utils/colors/appColors";
import Menu from "./AppHeader";
import AlertsStackNavigator from "./AlertsStackNavigator";

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {

    let TabTopBorderWidth = 0;
    let TabBackgroundColor = appSecondaryColor;
    let TabTopBorderColor = appSecondaryColor;
    let TabActiveTextColor = appTertiaryColor;
    let TabInactiveTextColor = appPrimaryColor;
    let TabIconColor = appTertiaryColor;

    if (useAltUI) {
        TabTopBorderWidth = 1;
        TabBackgroundColor = appPrimaryColor;
        TabActiveTextColor = appTertiaryColor;
        TabInactiveTextColor = appSecondaryColor;
        TabIconColor = appSecondaryColor;
    }

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: TabActiveTextColor,
                tabBarInactiveTintColor: TabInactiveTextColor,
                tabBarStyle: {
                    backgroundColor: TabBackgroundColor,
                    borderTopWidth: TabTopBorderWidth,
                    borderTopColor: TabTopBorderColor
                },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: "Dashboard",
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
                    tabBarLabel: "Alerts",
                    header: () => false,
                    tabBarIcon: ({ focused }) => (
                        <Fontisto name="bell" size={24} color={focused ? appTertiaryColor : appSecondaryColor} />
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
