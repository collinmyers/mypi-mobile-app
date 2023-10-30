import React from "react";
import HomeTabNavigator from "./components/navigation/HomeTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppHeader from "./components/navigation/AppHeader";
import ParkInfoScreen from "./sidebarScreens/ParkInfo";
import FAQScreen from "./sidebarScreens/FAQ";
import AuthStackNavigator from "./components/navigation/AuthStackNavigator";


const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={HomeTabNavigator} options={{ header: () => <AppHeader /> }} />
                <Drawer.Screen name="Sign In" component={AuthStackNavigator} options={{ header: () => <AppHeader /> }} />
                <Drawer.Screen name="FAQ" component={FAQScreen} options={{ header: () => <AppHeader /> }} />
                <Drawer.Screen name="Park Info" component={ParkInfoScreen} options={{ header: () => <AppHeader /> }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

