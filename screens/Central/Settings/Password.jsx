import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Snackbar, Text, TextInput } from "react-native-paper";
import { account } from "../../../utils/Config/config";
import PropTypes from "prop-types";
import Logo from "../../../components/logo/AppLogo";
import AppStyle from "../../../styling/AppStyle";
import HomeStyle from "../../../styling/HomeStyle";
import KeyboardAvoidingComponent from "../../../components/Keyboard/KeyboardAvoidingComponent";
import { appPrimaryColor, appTextColor } from "../../../utils/colors/appColors";
import { validatePassword } from "../../../utils/Regex/Validators";

ChangePasswordScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default function ChangePasswordScreen({ navigation }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [isActionOcurring, setIsActionOccuring] = useState(false);
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const handlePasswordChange = async () => {
        if (!isActionOcurring) {
            setIsActionOccuring(true);
            try {

                let validationErrors = [];

                if (passwords.oldPassword.length < 8) {
                    validationErrors.push("Please enter your old password");
                }

                const passwordError = validatePassword(passwords.newPassword, passwords.confirmNewPassword);
                if (passwordError !== "") {
                    validationErrors.push(...passwordError);
                }

                if (passwords.oldPassword === passwords.newPassword) {
                    validationErrors.push("Old password and new password cannot be the same, please choose a different password and try again.");
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

                await account.updatePassword(passwords.newPassword, passwords.oldPassword);

                setPasswords({
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: ""
                });

                navigation.navigate("Settings", { updateProfileInfo: true });

            } catch (error) {
                console.error(error);
                const invalidPassword = "AppwriteException: Invalid `password` param: Password must be between 8 and 265 characters long, and should not be one of the commonly used password.";
                const isSimilarPassword = "AppwriteException: The password you are trying to use is similar to your previous password. For your security, please choose a different password and try again.";
                const networkError = "AppwriteException: Network request failed";
                switch (error.toString()) {
                    case invalidPassword:
                        setErrorMessage("Please enter a valid password.");
                        setIsSnackbarVisible(true);
                        break;
                    case isSimilarPassword:
                        setErrorMessage("New password is too similar to a previously used password, please choose a different password and try again.");
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

                        <Text style={HomeStyle.updateAccountTitle}> Change Password</Text>

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="Old Password"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            secureTextEntry
                            onChangeText={(text) => setPasswords({ ...passwords, oldPassword: text })}
                            value={passwords.oldPassword}
                        />

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="New Password"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            secureTextEntry
                            onChangeText={(text) => setPasswords({ ...passwords, newPassword: text })}
                            value={passwords.newPassword}
                        />

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="Confirm New Password"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            secureTextEntry
                            onChangeText={(text) => setPasswords({ ...passwords, confirmNewPassword: text })}
                            value={passwords.confirmNewPassword}
                            onBlur={
                                () => validatePassword(passwords.newPassword, passwords.confirmNewPassword,
                                    (text) => setPasswords({ ...passwords, newPassword: text }),
                                    (text) => setPasswords({ ...passwords, confirmNewPassword: text }))
                            }
                        />

                        <TouchableOpacity onPress={handlePasswordChange} style={HomeStyle.updateAccountButtonOpacity}>
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

