import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import PropTypes from "prop-types";
import { account } from "../../../utils/Config/appwriteConfig";
import Logo from "../../../components/logo/AppLogo";
import AppStyle from "../../../styling/AppStyle";
import AuthStyle from "../../../styling/AuthStyle";
import { appPrimaryColor, appTextColor } from "../../../utils/colors/appColors";
import { validateEmail } from "../../../utils/Regex/Validators";
import KeyboardAvoidingComponent from "../../../components/Keyboard/KeyboardAvoidingComponent";

ForgotPasswordScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};


export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState("");

    const handlePasswordReset = async () => {

        try {
            await account.createRecovery(`${email}`, process.env.EXPO_PUBLIC_RECOVERY_DOMAIN);

            setEmail("");
            navigation.navigate("Login");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={AppStyle.container}>
            <KeyboardAvoidingComponent>
                <Logo style={AuthStyle.logo} />

                <Card style={AuthStyle.card}>

                    <Card.Content style={AuthStyle.cardContent}>

                        <Text style={AuthStyle.title}> Forgot Password</Text>

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Email"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
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