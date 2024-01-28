import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AlertsScreen from "../../screens/Central/Alerts";
import PushNotificationScreen from "../../screens/Central/PushNotification";
import Menu from "./AppHeader";
import MenuBack from "./AppHeaderNavBack";
import { appPrimaryColor } from "../../utils/colors/appColors";

const fade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});


const Stack = createStackNavigator();

export default function AlertsStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="AlertsScreen" screenOptions={{ headerShown: false, cardStyleInterpolator: fade }}>
            <Stack.Screen name="AlertsScreen" component={AlertsScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <Menu />
                }}
            />
            <Stack.Screen name="PushNotificationScreen" component={PushNotificationScreen}
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