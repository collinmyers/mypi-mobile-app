import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Snackbar, Text, TextInput } from "react-native-paper";
import { account } from "../../../utils/Config/appwriteConfig";
import PropTypes from "prop-types";
import Logo from "../../../components/logo/AppLogo";
import AppStyle from "../../../styling/AppStyle";
import AuthStyle from "../../../styling/AuthStyle";
import { appPrimaryColor, appTextColor } from "../../../utils/colors/appColors";
import { validateEmail } from "../../../utils/Regex/Validators";
import KeyboardAvoidingComponent from "../../../components/Keyboard/KeyboardAvoidingComponent";
import { useAuth } from "../../../components/context/AuthContext";

LoginScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default function LoginScreen({ navigation }) {

    const [authentication, setAuthentication] = useState({
        email: "",
        password: ""
    });

    const { changeAuthState, setChangeAuthState } = useAuth();

    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [isActionOcurring, setIsActionOccuring] = useState(false);

    const validateForm = () => {

        let validationErrors = [];

        if (authentication.email === "") {
            validationErrors.push("Please enter an email");
        }
        if (authentication.password === "") {
            validationErrors.push("Please enter a password");
        }

        if (validationErrors.length > 0) {
            let snackbarMessage = "";
            if (validationErrors.length > 1) {
                snackbarMessage += "Multiple Errors:\n";
            }
            snackbarMessage += validationErrors.join("\n");

            setErrorMessage(snackbarMessage);
            setIsSnackbarVisible(true);
            return false;
        }
        return true;
    };

    const handleLogin = async () => {


        if (!isActionOcurring) {
            try {
                setIsActionOccuring(true);

                if (!validateForm()) {
                    setIsActionOccuring(false);
                    return;
                }

                try {
                    await account.createEmailSession(`${authentication.email}`, `${authentication.password}`);

                    setAuthentication({
                        email: "",
                        password: ""
                    });
                    setChangeAuthState(!changeAuthState);
                    navigation.navigate("Home");

                } catch (error) {
                    const emailError = "AppwriteException: Invalid `email` param: Value must be a valid email address";
                    const passwordError = "AppwriteException: Invalid `password` param: Password must be at least 8 characters";
                    const credentialError = "AppwriteException: Invalid credentials. Please check the email and password.";
                    const rateLimitError = "AppwriteException: Rate limit for the current endpoint has been exceeded. Please try again after some time.";
                    const alreadySignedInError = "AppwriteException: Creation of a session is prohibited when a session is active.";
                    const networkError = "AppwriteException: Network request failed";

                    switch (error.toString()) {
                        case alreadySignedInError:
                            await account.deleteSessions("current");
                            handleLogin();
                            break;
                        case emailError:
                            setErrorMessage("Invalid username or password");
                            setIsSnackbarVisible(true);
                            break;
                        case passwordError:
                            setErrorMessage("Invalid username or password");
                            setIsSnackbarVisible(true);
                            break;
                        case credentialError:
                            setErrorMessage("Invalid username or password");
                            setIsSnackbarVisible(true);
                            break;
                        case rateLimitError:
                            setErrorMessage("Sign in attempts exceeded, please try again later");
                            setIsSnackbarVisible(true);
                            break;
                        case networkError:
                            setErrorMessage("Network request failed, please check your connection and try again");
                            setIsSnackbarVisible(true);
                            break;
                        default:
                            setErrorMessage("Unknown error occured, please try again");
                            setIsSnackbarVisible(true);
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
            <Snackbar
                visible={isSnackbarVisible}
                maxFontSizeMultiplier={1}
                style={AppStyle.snackBar}
                onDismiss={() => {
                    setIsSnackbarVisible(false);
                    setErrorMessage(""); // Clear the error message
                }}
                duration={3000}
            >
                {errorMessage}
            </Snackbar>
        </SafeAreaView>
    );
}
