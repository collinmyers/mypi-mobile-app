import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventListScreen from "../../screens/Central/EventList";
import EventDetailsScreen from "../../screens/Central/EventDetails";

const fade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
});

const Stack = createStackNavigator();

export default function EventsStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Events" screenOptions={{ headerShown: false, cardStyleInterpolator: fade}}>
            <Stack.Screen name="Events" component={EventListScreen} />

            <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen}/>
        </Stack.Navigator>

    );
}