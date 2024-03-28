import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../../screens/Sidebar/auth/SignUp";
import LoginScreen from "../../screens/Sidebar/auth/Login";
import PasswordResetScreen from "../../screens/Sidebar/auth/ForgotPassword";
import Menu from "./AppHeader";
import MenuBack from "./AppHeaderNavBack";
import { appTertiaryColor } from "../../utils/colors/appColors";

const Stack = createStackNavigator();

export default function AuthStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login"
                component={LoginScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appTertiaryColor },
                    header: () => <Menu />
                }}
            />
            <Stack.Screen name="Sign Up" component={SignUpScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appTertiaryColor },
                    header: () => <MenuBack />
                }}
            />
            <Stack.Screen name="Forgot Password" component={PasswordResetScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appTertiaryColor },
                    header: () => <MenuBack />
                }}
            />
        </Stack.Navigator>
    );
}