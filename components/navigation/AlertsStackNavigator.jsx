import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AlertsScreen from "../../screens/Central/Alerts";
import PushNotificationScreen from "../../screens/Central/PushNotification";
import MenuBack from "./AppHeaderNavBack";
import MenuEditNotification from "./AppHeaderEditNotifications";
import { appPrimaryColor } from "../../utils/colors/appColors";

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