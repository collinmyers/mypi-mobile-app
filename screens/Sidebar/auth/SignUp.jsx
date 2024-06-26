import React, { useState } from "react";
import { Platform, SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Snackbar, Text, TextInput } from "react-native-paper";
import { account } from "../../../utils/Config/config";
import { ID } from "appwrite";
import PropTypes from "prop-types";
import { validateName, validateEmail, validatePassword } from "../../../utils/Regex/Validators";
import KeyboardAvoidingComponent from "../../../components/Keyboard/KeyboardAvoidingComponent";
import { appPrimaryColor, appTextColor } from "../../../utils/colors/appColors";
import Logo from "../../../components/logo/AppLogo";
import AppStyle from "../../../styling/AppStyle";
import AuthStyle from "../../../styling/AuthStyle";

SignUpScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default function SignUpScreen({ navigation }) {

    const [signUpInfo, setSignUpInfo] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [isActionOcurring, setIsActionOccuring] = useState(false);

    const validateForm = () => {
        const { fullName, email, password, confirmPassword } = signUpInfo;

        let validationErrors = [];

        // Check each validation without immediately setting the error message
        if (!validateName(fullName)) {
            validationErrors.push("Please enter your full name");
        }
        if (!validateEmail(email)) {
            validationErrors.push("Please enter a valid email");
        }

        const passwordError = validatePassword(password, confirmPassword);
        if (passwordError !== "") {
            validationErrors.push(...passwordError);
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


        // If validation passes clear error message
        setErrorMessage("");
        return true;

    };

    const handleSignUp = async () => {
        if (!isActionOcurring) {
            try {
                setIsActionOccuring(true);

                if (!validateForm()) {
                    setIsActionOccuring(false);
                    return;
                }

                try {
                    if (account.get().email === "") { // if the user has an anonyomous session established
                        await account.updateEmail(signUpInfo.email, signUpInfo.password);
                        await account.updateName(signUpInfo.fullName);
                        console.log("Converted guest user to email user");
                    } else {
                        await account.create(ID.unique(), signUpInfo.email, signUpInfo.password, signUpInfo.fullName);
                    }

                    navigation.navigate("Login");
                } catch (error) {
                    console.error(error.toString());
                    const emailExistsError = "AppwriteException: A user with the same email already exists in the current project.";
                    const rateLimitError = "AppwriteException: Rate limit for the current endpoint has been exceeded. Please try again after some time.";
                    const networkError = "AppwriteException: Network request failed";
                    const passwordError = "AppwriteException: Invalid `password` param: Password must be between 8 and 265 characters long, and should not be one of the commonly used password.";
                    const alreadyExists = "AppwriteException: A user with the same id, email, or phone already exists in this project.";

                    switch (error.toString()) {
                        case alreadyExists:
                            setErrorMessage("Email already in use, please try a different email.");
                            setIsSnackbarVisible(true);
                            break;
                        case emailExistsError:
                            setErrorMessage("Email already in use, please try a different email.");
                            setIsSnackbarVisible(true);
                            break;
                        case passwordError:
                            setErrorMessage("Please choose another password.");
                            setIsSnackbarVisible(true);
                            break;
                        case rateLimitError:
                            setErrorMessage("Sign up attempts exceeded, please try again later.");
                            setIsSnackbarVisible(true);
                            break;
                        case networkError:
                            setErrorMessage("Network request failed, please check your connection and try again.");
                            setIsSnackbarVisible(true);
                            break;
                        default:
                            setErrorMessage("Unknown error occured, please try again.");
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

                        <Text style={AuthStyle.title}> Sign Up</Text>

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Full Name"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, fullName: text })}
                            value={signUpInfo.fullName}
                        />

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Email"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, email: text })}
                            value={signUpInfo.email}
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
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, password: text })}
                            value={signUpInfo.password}
                        />

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Confirm Password"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            secureTextEntry
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, confirmPassword: text })}
                            value={signUpInfo.confirmPassword}
                        />
                        <TouchableOpacity onPress={handleSignUp} style={AuthStyle.ButtonOpacity}>
                            <Text style={AuthStyle.buttonText}>Sign Up</Text>
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
