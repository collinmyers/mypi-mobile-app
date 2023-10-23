import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MainNav from "./navigation/MainNav";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainNav">
                <Stack.Screen name="MainNav" options={{headerShown: false}} component={MainNav}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

