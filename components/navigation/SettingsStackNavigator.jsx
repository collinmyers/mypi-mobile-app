import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../../screens/Central/Settings";
import ChangeNameScreen from "../../screens/UpdateAccountSettings/Name";
import ChangeEmailScreen from "../../screens/UpdateAccountSettings/Email";
import ChangePasswordScreen from "../../screens/UpdateAccountSettings/Password";
import ParkNotificationsScreen from "../../screens/UpdateNotificationSettings/ParkAlertNotifications";
import EventsNotificationsScreen from "../../screens/UpdateNotificationSettings/EventNotifications";
import PromotionsNotificationsScreen from "../../screens/UpdateNotificationSettings/PromotionNotifications";

import Menu from "./AppHeader";
import MenuBack from "./AppHeaderNavBack";

const Stack = createStackNavigator();

export default function SettingsStackNavigator() {
    const appPrimaryColor = "#134C77";
    return (
        <Stack.Navigator initialRouteName="Settings" >
            <Stack.Screen name="Settings" component={SettingsScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <Menu />
                }}
            />

            <Stack.Screen name="Change Name" component={ChangeNameScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />
            <Stack.Screen name="Change Email" component={ChangeEmailScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />
            <Stack.Screen name="Change Password" component={ChangePasswordScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />

            <Stack.Screen name="Park Notifications" component={ParkNotificationsScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />
            <Stack.Screen name="Event Notifications" component={EventsNotificationsScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />
            <Stack.Screen name="Promotion Notifications" component={PromotionsNotificationsScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />
        </Stack.Navigator>

    );
}