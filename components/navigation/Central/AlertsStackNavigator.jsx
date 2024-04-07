import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AlertsScreen from "../../../screens/Central/Notifications/Alerts";
import PushNotificationScreen from "../../../screens/Central/Notifications/PushNotification";
import ManageNotficationsScreen from "../../../screens/Central/Notifications/ManageNotifications";
import EditNotificationScreen from "../../../screens/Central/Notifications/EditNotification";
import MenuBack from "../Headers/AppHeaderNavBack";
import MenuEditNotification from "../Headers/AppHeaderEditNotifications";
import { appPrimaryColor } from "../../../utils/colors/appColors";

const fade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});


const Stack = createStackNavigator();

export default function AlertsStackNavigator() {

    const [showEditNotifications, setShowEditNotifications] = useState(false);

    return (
        <Stack.Navigator initialRouteName="AlertsScreen" screenOptions={{ headerShown: false, cardStyleInterpolator: fade }}>
            <Stack.Screen name="AlertsScreen" component={AlertsScreen} initialParams={{ showEditNotifications: showEditNotifications }}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuEditNotification
                        showEditNotifications={showEditNotifications}
                        onToggleEditNotifications={setShowEditNotifications} />
                }}
            />
            <Stack.Screen name="ManageNotficationsScreen" component={ManageNotficationsScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />
            <Stack.Screen name="EditNotificationScreen" component={EditNotificationScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
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