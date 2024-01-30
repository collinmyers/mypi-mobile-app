import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { account } from "../../../utils/Config/appwriteConfig";
import PropTypes from "prop-types";
import Logo from "../../../components/logo/AppLogo";
import AppStyle from "../../../styling/AppStyle";
import AuthStyle from "../../../styling/AuthStyle";
import { appPrimaryColor, appTextColor } from "../../../utils/colors/appColors";
import { validateEmail } from "../../../utils/Regex/Validators";
import KeyboardAvoidingComponent from "../../../components/Keyboard/KeyboardAvoidingComponent";

LoginScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
    handleLoginSuccess: PropTypes.func.isRequired,
};

export default function LoginScreen({ navigation, handleLoginSuccess }) {

    const [authentication, setAuthentication] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async () => {
        try {

            await account.createEmailSession(`${authentication.email}`, `${authentication.password}`);

            setAuthentication({
                email: "",
                password: ""
            });
            handleLoginSuccess();
            navigation.navigate("Home");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={AppStyle.container}>
            <KeyboardAvoidingComponent style={AuthStyle.keyboardAdj}>
                <Logo style={AuthStyle.logo} />

                <Card style={AuthStyle.card}>

                    <Card.Content style={AuthStyle.cardContent}>

                        <Text style={AuthStyle.title}> Sign In</Text>

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Email"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            onChangeText={(text) => setAuthentication({ ...authentication, email: text })}
                            value={authentication.email}
                            onBlur={() => validateEmail(authentication.email, (text) => setAuthentication({ ...authentication, email: text }))}
                        />

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Password"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            secureTextEntry
                            onChangeText={(text) => setAuthentication({ ...authentication, password: text })}
                            value={authentication.password}
                        />

                        <TouchableOpacity onPress={handleLogin} style={AuthStyle.ButtonOpacity}>
                            <Text style={AuthStyle.buttonText}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Forgot Password")} style={AuthStyle.additionalOptions}>
                            <Text style={AuthStyle.additionalOptionsText}>Forgot Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")} style={AuthStyle.additionalOptions}>
                            <Text style={AuthStyle.additionalOptionsText}>Sign Up</Text>
                        </TouchableOpacity>

                    </Card.Content>
                </Card>

            </KeyboardAvoidingComponent>

        </SafeAreaView>
    );
}
