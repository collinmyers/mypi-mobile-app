import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AlertsScreen from "../../screens/Central/Alerts";
import PushNotificationScreen from "../../screens/Central/PushNotification";
import Menu from "./AppHeader";
import MenuBack from "./AppHeaderNavBack";

const fade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
});


const Stack = createStackNavigator();

export default function AlertsStackNavigator() {

    const appBlue = "#134C77";


    return (
        <Stack.Navigator initialRouteName="AlertsScreen" screenOptions={{ headerShown: false,  cardStyleInterpolator: fade}}>
            <Stack.Screen name="AlertsScreen" component={AlertsScreen} 
                    options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appBlue },
                    header: () => <Menu />
                }}
            />
            <Stack.Screen name="PushNotificationScreen" component={PushNotificationScreen}
                    options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appBlue },
                    header: () => <MenuBack />
                }}
            />
        </Stack.Navigator>

    );
}