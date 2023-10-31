import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../../sidebarScreens/auth/SignUp";
import LoginScreen from "../../sidebarScreens/auth/Login";
import PropTypes from "prop-types";

// import PasswordResetScreen from "../../sidebarScreens/auth/PasswordReset";
// import ChangePasswordScreen from "../../sidebarScreens/auth/ChangePassword";

const Stack = createStackNavigator();

export default function AuthStackNavigator({ handleLoginSuccess }) {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" >
                {(props) => <LoginScreen {...props} handleLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
            {/* <Stack.Screen name="Forgot Password" component={PasswordResetScreen} />
            <Stack.Screen name="Create Account" component={ChangePasswordScreen} /> */}
        </Stack.Navigator>
    );
}

AuthStackNavigator.propTypes = {
    handleLoginSuccess: PropTypes.func.isRequired,
};