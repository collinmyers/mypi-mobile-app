import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventListScreen from "../../screens/Central/EventList";
import EventDetailsScreen from "../../screens/Central/EventDetails";
import Menu from "./AppHeader";
import MenuBack from "./AppHeaderNavBack";
import { appPrimaryColor } from "../../utils/colors/appColors";

const fade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const Stack = createStackNavigator();

export default function EventsStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Events" screenOptions={{ headerShown: false, cardStyleInterpolator: fade }}>
            <Stack.Screen name="Events" component={EventListScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <Menu />
                }}
            />
            <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />
        </Stack.Navigator>

    );
}