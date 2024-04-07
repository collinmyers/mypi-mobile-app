import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../../../screens/Central/Map/Map";
import MapList from "../../../screens/Central/Map/MapList";

const fade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const Stack = createStackNavigator();

export default function MapStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="MapScreen" screenOptions={{ headerShown: false, cardStyleInterpolator: fade }}>
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="MapList" component={MapList} />
        </Stack.Navigator>

    );
}