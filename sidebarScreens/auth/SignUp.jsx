import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { Account, Client, ID } from "appwrite";
import PropTypes from "prop-types";
import { validateName, validateEmail, validatePassword } from "../../utils/Validators";

import AuthLogo from "../../components/logo/AuthLogo";
import AppStyle from "../../styling/AppStyling";
import AuthStyle from "../../styling/AuthStyling";

SignUpScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default function SignUpScreen({ navigation }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async () => {

        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);

            await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

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

                    <Text style={AuthStyle.title}> Sign Up</Text>

                    <TextInput
                        style={AuthStyle.userInput}
                        placeholder="First Name"
                        placeholderTextColor={"#134C77"}
                        textColor={"#134C77"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                        onBlur={() => validateName(firstName, setFirstName)}
                    />

                    <TextInput
                        style={AuthStyle.userInput}
                        placeholder="Last Name"
                        placeholderTextColor={"#134C77"}
                        textColor={"#134C77"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        onChangeText={(text) => setLastName(text)}
                        onBlur={() => validateName(lastName, setLastName)}
                        value={lastName}
                    />

                    <TextInput
                        style={AuthStyle.userInput}
                        placeholder="Email"
                        placeholderTextColor={"#134C77"}
                        textColor={"#134C77"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        onChangeText={(text) => setEmail(text)}
                        onBlur={() => validateEmail(email, setEmail)}
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

                    <TextInput
                        style={AuthStyle.userInput}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#134C77"}
                        textColor={"#134C77"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        secureTextEntry
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                        onBlur={() => validatePassword(password, confirmPassword, setPassword, setConfirmPassword)}
                    />
                    <TouchableOpacity onPress={(handleSignUp)} style={AuthStyle.ButtonOpacity}>
                        <Text style={AuthStyle.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                </Card.Content>
            </Card>

        </SafeAreaView>
    );
}