import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventListScreen from "../../screens/Central/EventList";
import EventDetailsScreen from "../../screens/Central/EventDetails";



const Stack = createStackNavigator();

export default function EventsStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Events" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Events" component={EventListScreen} />

            <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen}/>
        </Stack.Navigator>

    );
}