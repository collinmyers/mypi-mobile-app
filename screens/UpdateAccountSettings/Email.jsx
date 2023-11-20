import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { Account, Client } from "appwrite";
import PropTypes from "prop-types";

import AuthLogo from "../../components/logo/AuthLogo";
import AppStyle from "../../styling/AppStyle";
import AuthStyle from "../../styling/AuthStyle";

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

            <AuthLogo style={AuthStyle.logo} />

            <Card style={AuthStyle.card}>

                <Card.Content style={AuthStyle.cardContent}>

                    <Text style={AuthStyle.title}> Change Email</Text>

                    <TextInput
                        style={AuthStyle.userInput}
                        numberOfLines={1}
                        placeholder="New Email"
                        placeholderTextColor={"#FFFFFF"}
                        textColor={"#FFFFFF"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        onChangeText={(text) => setCredentials({ ...credentials, email: text })}
                        value={credentials.email}
                        onBlur={() => validateEmail(credentials.email, setCredentials)}
                    />

                    <TextInput
                        style={AuthStyle.userInput}
                        numberOfLines={1}
                        placeholder="Password"
                        placeholderTextColor={"#FFFFFF"}
                        textColor={"#FFFFFF"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        secureTextEntry
                        onChangeText={(text) => setCredentials({ ...credentials, password: text })}
                        value={credentials.password}
                    />

                    <TouchableOpacity onPress={handleEmailChange} style={AuthStyle.ButtonOpacity}>
                        <Text style={AuthStyle.buttonText}>Change</Text>
                    </TouchableOpacity>

                </Card.Content>
            </Card>

        </SafeAreaView>

    );
}

