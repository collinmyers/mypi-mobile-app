import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { Account, Client } from "appwrite";
import PropTypes from "prop-types";

import KeyboardAvoidingComponent from "../../components/Keyboard/KeyboardAvoidingComponent";

import AuthLogo from "../../components/logo/AuthLogo";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";

import { validateEmail } from "../../utils/Validators";

ChangeEmailScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default function ChangeEmailScreen({ navigation }) {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const appBlue = "#134C77";
    const appWhite = "#FFFFFF";

    const handleEmailChange = async () => {

        try {

            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);
            await account.updateEmail(credentials.email, credentials.password);

            setCredentials({
                email: "",
                password: ""
            });


            navigation.navigate("Settings");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={AppStyle.container}>
            <KeyboardAvoidingComponent style={HomeStyle.updateAccountKeyboardAdj}>
                <AuthLogo style={HomeStyle.updateAccountLogo} />

                <Card style={HomeStyle.updateAccountCard}>

                    <Card.Content style={HomeStyle.updateAccountCardContent}>

                        <Text style={HomeStyle.updateAccountTitle}> Change Email</Text>

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="New Email"
                            placeholderTextColor={appWhite}
                            textColor={appWhite}
                            mode="flat"
                            underlineColor={appBlue}
                            activeUnderlineColor={appBlue}
                            onChangeText={(text) => setCredentials({ ...credentials, email: text })}
                            value={credentials.email}
                            onBlur={() => validateEmail(credentials.email, setCredentials)}
                        />

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="Password"
                            placeholderTextColor={appWhite}
                            textColor={appWhite}
                            mode="flat"
                            underlineColor={appBlue}
                            activeUnderlineColor={appBlue}
                            secureTextEntry
                            onChangeText={(text) => setCredentials({ ...credentials, password: text })}
                            value={credentials.password}
                        />

                        <TouchableOpacity onPress={handleEmailChange} style={HomeStyle.updateAccountButtonOpacity}>
                            <Text style={HomeStyle.updateAccountButtonText}>Change</Text>
                        </TouchableOpacity>

                    </Card.Content>
                </Card>

            </KeyboardAvoidingComponent>

        </SafeAreaView>

    );
}

