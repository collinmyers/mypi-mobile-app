import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { Account, Client } from "appwrite";
import PropTypes from "prop-types";

import AuthLogo from "../../components/logo/AuthLogo";
import AppStyle from "../../styling/AppStyling";
import AuthStyle from "../../styling/AuthStyling";

LoginScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
    handleLoginSuccess: PropTypes.func.isRequired,
};

export default function LoginScreen({ navigation, handleLoginSuccess }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);
            await account.createEmailSession(`${email}`, `${password}`);

            setEmail("");
            setPassword("");
            handleLoginSuccess();
            navigation.navigate("Home");


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={AppStyle.container}>

            <AuthLogo style={AuthStyle.logo} />

            <Card style={AuthStyle.card}>

                <Card.Content style={AuthStyle.cardContent}>

                    <Text style={AuthStyle.title}> Sign In</Text>

                    <TextInput
                        style={AuthStyle.userInput}
                        placeholder="Email"
                        placeholderTextColor={"#134C77"}
                        textColor={"#134C77"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />

                    <TextInput
                        style={AuthStyle.userInput}
                        placeholder="Password"
                        placeholderTextColor={"#134C77"}
                        textColor={"#134C77"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />

                    <TouchableOpacity onPress={(handleLogin)} style={AuthStyle.ButtonOpacity}>
                        <Text style={AuthStyle.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={AuthStyle.additionalOptions}>
                        <Text style={AuthStyle.additionalOptionsText}>Forgot Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Sign Up")} style={AuthStyle.additionalOptions}>
                        <Text style={AuthStyle.additionalOptionsText}>Sign Up</Text>
                    </TouchableOpacity>

                </Card.Content>
            </Card>

        </SafeAreaView>
    );
}