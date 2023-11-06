import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../../screens/Sidebar/auth/SignUp";
import LoginScreen from "../../screens/Sidebar/auth/Login";
import PropTypes from "prop-types";
import PasswordResetScreen from "../../screens/Sidebar/auth/ForgotPassword";

const Stack = createStackNavigator();

export default function AuthStackNavigator({ handleLoginSuccess }) {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" >
                {(props) => <LoginScreen {...props} handleLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
            <Stack.Screen name="Forgot Password" component={PasswordResetScreen} />
        </Stack.Navigator>
    );
}

AuthStackNavigator.propTypes = {
    handleLoginSuccess: PropTypes.func.isRequired,
};