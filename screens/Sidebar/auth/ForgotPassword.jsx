import React, { useState } from "react";
import { Platform, SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Snackbar, Text, TextInput } from "react-native-paper";
import PropTypes from "prop-types";
import { account, RECOVERY_DOMAIN } from "../../../utils/Config/config";
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
    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [isActionOcurring, setIsActionOccuring] = useState(false);

    const handlePasswordReset = async () => {
        if (!isActionOcurring) {
            try {
                setIsActionOccuring(true);
                try {
                    await account.createRecovery(`${email}`, RECOVERY_DOMAIN);

                    setErrorMessage("If an account exists, a password reset will be sent to the provided email.");
                    setIsSnackbarVisible(true);
                    setTimeout(() => {
                        setEmail("");
                        navigation.navigate("Login");
                    }, 3000);
                } catch (error) {
                    const emailError = "AppwriteException: Invalid `email` param: Value must be a valid email address";
                    const rateLimitError = "AppwriteException: Rate limit for the current endpoint has been exceeded. Please try again after some time.";
                    const networkError = "AppwriteException: Network request failed";

                    switch (error.toString()) {
                        case emailError:
                            setErrorMessage("Please enter a valid email address");
                            setIsSnackbarVisible(true);
                            break;
                        case rateLimitError:
                            setErrorMessage("Forgot password attempts exceeded, please try again later");
                            setIsSnackbarVisible(true);
                            break;
                        case networkError:
                            setErrorMessage("Network request failed, please check your connection and try again");
                            setIsSnackbarVisible(true);
                            break;
                        default:
                            setErrorMessage("If an account exists, a password reset will be sent to the provided email.");
                            setIsSnackbarVisible(true);
                            setTimeout(() => {
                                setEmail("");
                                navigation.navigate("Login");
                            }, 3000);
                            break;
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsActionOccuring(false);
            }
        }
    };

    return (
        <SafeAreaView style={AppStyle.container}>
            <KeyboardAvoidingComponent style={AuthStyle.keyboardAdj}>
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
            <Snackbar
                visible={isSnackbarVisible}
                maxFontSizeMultiplier={1}
                style={Platform.OS === "ios" ? [AppStyle.snackBar, { marginBottom: 0 }] : AppStyle.snackBar }
                onDismiss={() => {
                    setIsSnackbarVisible(false);
                    setErrorMessage(""); // Clear the error message
                }}
                action={{
                    textColor: appTextColor,
                    label: "Close",
                }}
                duration={3000}
            >
                {errorMessage}
            </Snackbar>
        </SafeAreaView>

    );
}