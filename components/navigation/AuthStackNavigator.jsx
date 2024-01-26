import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../../screens/Sidebar/auth/SignUp";
import LoginScreen from "../../screens/Sidebar/auth/Login";
import PropTypes from "prop-types";
import PasswordResetScreen from "../../screens/Sidebar/auth/ForgotPassword";
import Menu from "./AppHeader";
import MenuBack from "./AppHeaderNavBack";

const Stack = createStackNavigator();

export default function AuthStackNavigator({ handleLoginSuccess }) {
    const appPrimaryColor = "#134C77";
    return (
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login"
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <Menu />
                }}
            >
                {(props) => <LoginScreen {...props} handleLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>

            <Stack.Screen name="Sign Up" component={SignUpScreen}
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />
            <Stack.Screen name="Forgot Password" component={PasswordResetScreen}
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

AuthStackNavigator.propTypes = {
    handleLoginSuccess: PropTypes.func.isRequired,
};