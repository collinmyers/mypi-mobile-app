import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Snackbar, Text, TextInput } from "react-native-paper";
import { account } from "../../utils/Config/appwriteConfig";
import PropTypes from "prop-types";
import KeyboardAvoidingComponent from "../../components/Keyboard/KeyboardAvoidingComponent";
import Logo from "../../components/logo/AppLogo";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import { appPrimaryColor, appTextColor } from "../../utils/colors/appColors";
import { validateEmail } from "../../utils/Regex/Validators";

ChangeEmailScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default function ChangeEmailScreen({ navigation }) {

    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [isActionOcurring, setIsActionOccuring] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });



    const handleEmailChange = async () => {

        if (!isActionOcurring) {
            setIsActionOccuring(true);
            try {

                if (credentials.email === "" && credentials.password === "") {
                    setErrorMessage("Multiple Errors:\nPlease enter a valid email\nPlease enter a valid password");
                    setIsSnackbarVisible(true);
                    setIsActionOccuring(false);
                    return;
                } else if (!validateEmail(credentials.email)) {
                    setErrorMessage("Please enter a valid email");
                    setIsSnackbarVisible(true);
                    setIsActionOccuring(false);
                    return;
                }

                await account.updateEmail(credentials.email, credentials.password);

                setCredentials({
                    email: "",
                    password: ""
                });
                navigation.navigate("Settings");

            } catch (error) {
                const invalidEmail = "AppwriteException: Invalid `email` param: Value must be a valid email address";
                const invalidPass = "AppwriteException: Invalid `password` param: Password must be between 8 and 256 characters long.";
                const incorrectPass = "AppwriteException: Invalid credentials. Please check the email and password.";
                const emailExists = "AppwriteException: A target with the same ID already exists.";

                switch (error.toString()) {
                    case invalidEmail:
                        setErrorMessage("Please enter a valid email");
                        setIsSnackbarVisible(true);
                        break;
                    case invalidPass:
                        setErrorMessage("Please enter a valid password");
                        setIsSnackbarVisible(true);
                        break;
                    case incorrectPass:
                        setErrorMessage("Incorrect password, please try again");
                        setIsSnackbarVisible(true);
                        break;
                    case emailExists:
                        setErrorMessage("Please try a different email");
                        setIsSnackbarVisible(true);
                        break;
                    default:
                        setErrorMessage("Unknown error occured, please try again");
                        setIsSnackbarVisible(true);
                        break;
                }
            } finally {
                setIsActionOccuring(false);
            }
        }
    };

    return (
        <SafeAreaView style={AppStyle.container}>
            <KeyboardAvoidingComponent style={HomeStyle.updateAccountKeyboardAdj}>
                <Logo style={HomeStyle.updateAccountLogo} />

                <Card style={HomeStyle.updateAccountCard}>

                    <Card.Content style={HomeStyle.updateAccountCardContent}>

                        <Text style={HomeStyle.updateAccountTitle}> Change Email</Text>

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="New Email"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            onChangeText={(text) => setCredentials({ ...credentials, email: text })}
                            value={credentials.email}
                            onBlur={() => validateEmail(credentials.email, setCredentials)}
                        />

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="Password"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
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

