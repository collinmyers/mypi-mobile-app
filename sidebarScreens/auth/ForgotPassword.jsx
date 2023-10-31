import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
// import { Account, Client } from "appwrite";
import PropTypes from "prop-types";

import AuthLogo from "../../components/logo/AuthLogo";
import AppStyle from "../../styling/AppStyling";
import AuthStyle from "../../styling/AuthStyling";

ForgotPasswordScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};


export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState("");


    const handlePasswordReset = async () => {

        try {

            // !!!!!!!! IMPORTANT !!!!!!!!!!!!!!

            // Commented out until further proj development has occured, needs domain to reset password on and SMTP server

            // const client = new Client()
            //     .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
            //     .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            // const account = new Account(client);
            // await account.createRecovery(`${email}`, "https://www.examplDomainHere.com");


            setEmail("");
            navigation.navigate("Login");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={AppStyle.container}>

            <AuthLogo style={AuthStyle.logo} />

            <Card style={AuthStyle.card}>

                <Card.Content style={AuthStyle.cardContent}>

                    <Text style={AuthStyle.title}> Forgot Password</Text>

                    <TextInput
                        style={AuthStyle.userInput}
                        placeholder="Email"
                        placeholderTextColor={"#FFFFFF"}
                        textColor={"#FFFFFF"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />


                    <TouchableOpacity onPress={handlePasswordReset} style={AuthStyle.ButtonOpacity}>
                        <Text style={AuthStyle.buttonText}>Send Email</Text>
                    </TouchableOpacity>

                </Card.Content>
            </Card>

        </SafeAreaView>

    );
}