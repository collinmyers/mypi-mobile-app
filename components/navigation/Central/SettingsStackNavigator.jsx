import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../../../screens/Central/Settings/Settings";
import ChangeNameScreen from "../../../screens/Central/Settings/Name";
import ChangeEmailScreen from "../../../screens/Central/Settings/Email";
import ChangePasswordScreen from "../../../screens/Central/Settings/Password";
import { appPrimaryColor } from "../../../utils/colors/appColors";
import Menu from "../Headers/AppHeader";
import MenuBack from "../Headers/AppHeaderNavBack";

const Stack = createStackNavigator();

export default function SettingsStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
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
        </Stack.Navigator>

    );
}