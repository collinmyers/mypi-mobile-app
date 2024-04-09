import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../../../screens/Central/Map/Map";
import MapList from "../../../screens/Central/Map/MapList";

const Stack = createStackNavigator();

export default function MapStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="MapScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="MapList" component={MapList} />
        </Stack.Navigator>

    );
}