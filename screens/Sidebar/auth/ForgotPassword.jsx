import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { Account, Client } from "appwrite";
import PropTypes from "prop-types";

import AuthLogo from "../../../components/logo/AuthLogo";
import AppStyle from "../../../styling/AppStyle";
import AuthStyle from "../../../styling/AuthStyle";

import { validateEmail } from "../../../utils/Regex/Validators";
import KeyboardAvoidingComponent from "../../../components/Keyboard/KeyboardAvoidingComponent";

ForgotPasswordScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};


export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState("");

    const appBlue = "#134C77";
    const appWhite = "#FFFFFF";

    const handlePasswordReset = async () => {

        try {

            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);
            await account.createRecovery(`${email}`, process.env.EXPO_PUBLIC_DDNS);

            setEmail("");
            navigation.navigate("Login");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={AppStyle.container}>
            <KeyboardAvoidingComponent>
                <AuthLogo style={AuthStyle.logo} />

                <Card style={AuthStyle.card}>

                    <Card.Content style={AuthStyle.cardContent}>

                        <Text style={AuthStyle.title}> Forgot Password</Text>

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Email"
                            placeholderTextColor={appWhite}
                            textColor={appWhite}
                            mode="flat"
                            underlineColor={appBlue}
                            activeUnderlineColor={appBlue}
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            onBlur={() => validateEmail(email, setEmail)}
                        />

                        <TouchableOpacity onPress={handlePasswordReset} style={AuthStyle.ButtonOpacity}>
                            <Text style={AuthStyle.buttonText}>Send Email</Text>
                        </TouchableOpacity>

                    </Card.Content>
                </Card>
            </KeyboardAvoidingComponent>

        </SafeAreaView>

    );
}