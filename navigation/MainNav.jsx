import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/Map";
import EventListScreen from "../screens/EventList";
import AlertsScreen from "../screens/Alerts";
import SettingsScreen from "../screens/Settings";
import LandingScreen from "../screens/LandingScreen";

const Tab = createBottomTabNavigator();

export default function MainNav() {
    return(
        <Tab.Navigator initialRouteName="Map">
            <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
                tabBarLabel: "Map",
                headerShown: false,
            }}
            />
            
            <Tab.Screen
            name="EventList"
            component={EventListScreen}
            options={{
                tabBarLabel: "Events",
                headerShown: false,
            }}
            />
            <Tab.Screen
            name="Home"
            component={LandingScreen}
            options={{
                tabBarLabel:"Home",
                headerShown:false,
            }}
            />

            <Tab.Screen
            name="Alerts"
            component={AlertsScreen}
            options={{
                tabBarLabel:"Alerts",
                headerShown:false,
            }}
            />
            <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                tabBarLabel:"Settings",
                headerShown:false,
            }}
            />

        </Tab.Navigator>
    );
}
