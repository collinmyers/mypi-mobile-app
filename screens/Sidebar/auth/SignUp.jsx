import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { Account, Client, ID } from "appwrite";
import PropTypes from "prop-types";
import { validateName, validateEmail, validatePassword } from "../../../utils/Validators";
import KeyboardAvoidingComponent from "../../../components/Keyboard/KeyboardAvoidingComponent";

import AuthLogo from "../../../components/logo/AuthLogo";
import AppStyle from "../../../styling/AppStyle";
import AuthStyle from "../../../styling/AuthStyle";

SignUpScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default function SignUpScreen({ navigation }) {

    const [signUpInfo, setSignUpInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const appBlue = "#134C77";
    const appWhite = "#FFFFFF";

    const handleSignUp = async () => {

        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);

            await account.create(ID.unique(), signUpInfo.email, signUpInfo.password, `${signUpInfo.firstName} ${signUpInfo.lastName}`);

            navigation.navigate("Login");

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <SafeAreaView style={AppStyle.container}>

            <KeyboardAvoidingComponent style={AuthStyle.keyboardAdj}>
                <AuthLogo style={AuthStyle.logo} />

                <Card style={AuthStyle.card}>

                    <Card.Content style={AuthStyle.cardContent}>

                        <Text style={AuthStyle.title}> Sign Up</Text>

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="First Name"
                            placeholderTextColor={appWhite}
                            textColor={appWhite}
                            mode="flat"
                            underlineColor={appBlue}
                            activeUnderlineColor={appBlue}
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, firstName: text })}
                            value={signUpInfo.firstName}
                            onBlur={() => validateName(signUpInfo.firstName, (text) => setSignUpInfo({ ...signUpInfo, firstName: text }))}
                        />

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Last Name"
                            placeholderTextColor={appWhite}
                            textColor={appWhite}
                            mode="flat"
                            underlineColor={appBlue}
                            activeUnderlineColor={appBlue}
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, lastName: text })}
                            onBlur={() => validateName(signUpInfo.lastName, (text) => setSignUpInfo({ ...signUpInfo, lastName: text }))}
                            value={signUpInfo.lastName}
                        />

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Email"
                            placeholderTextColor={appWhite}
                            textColor={appWhite}
                            mode="flat"
                            underlineColor={appBlue}
                            activeUnderlineColor={appBlue}
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, email: text })}
                            onBlur={() => validateEmail(signUpInfo.email, (text) => setSignUpInfo({ ...signUpInfo, email: text }))}
                            value={signUpInfo.email}
                        />

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Password"
                            placeholderTextColor={appWhite}
                            textColor={appWhite}
                            mode="flat"
                            underlineColor={appBlue}
                            activeUnderlineColor={appBlue}
                            secureTextEntry
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, password: text })}
                            value={signUpInfo.password}
                        />

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Confirm Password"
                            placeholderTextColor={appWhite}
                            textColor={appWhite}
                            mode="flat"
                            underlineColor={appBlue}
                            activeUnderlineColor={appBlue}
                            secureTextEntry
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, confirmPassword: text })}
                            value={signUpInfo.confirmPassword}
                            onBlur={
                                () => validatePassword(signUpInfo.password, signUpInfo.confirmPassword,
                                    (text) => setSignUpInfo({ ...signUpInfo, password: text }),
                                    (text) => setSignUpInfo({ ...signUpInfo, confirmPassword: text }))
                            }
                        />
                        <TouchableOpacity onPress={handleSignUp} style={AuthStyle.ButtonOpacity}>
                            <Text style={AuthStyle.buttonText}>Sign Up</Text>
                        </TouchableOpacity>

                    </Card.Content>
                </Card>
            </KeyboardAvoidingComponent>
        </SafeAreaView>
    );
}
