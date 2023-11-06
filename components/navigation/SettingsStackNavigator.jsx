import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import PropTypes from "prop-types";
import SettingsScreen from "../../screens/Central/Settings";
import ChangeNameScreen from "../../screens/UpdateAccountSettings/Name";
import ChangeEmailScreen from "../../screens/UpdateAccountSettings/Email";
import ChangePasswordScreen from "../../screens/UpdateAccountSettings/Password";
import ParkNotificationsScreen from "../../screens/UpdateNotificationSettings/ParkAlertNotifications";
import EventsNotificationsScreen from "../../screens/UpdateNotificationSettings/EventNotifications";
import PromotionsNotificationsScreen from "../../screens/UpdateNotificationSettings/PromotionNotifications";

const Stack = createStackNavigator();

export default function SettingsStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Settings" component={SettingsScreen} />

            <Stack.Screen name="Change Name" component={ChangeNameScreen} />
            <Stack.Screen name="Change Email" component={ChangeEmailScreen} />
            <Stack.Screen name="Change Password" component={ChangePasswordScreen} />

            <Stack.Screen name="Park Notifications" component={ParkNotificationsScreen} />
            <Stack.Screen name="Event Notifications" component={EventsNotificationsScreen} />
            <Stack.Screen name="Promotion Notifications" component={PromotionsNotificationsScreen} />
        </Stack.Navigator>

    );
}