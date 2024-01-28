import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { account } from "../../utils/Config/appwriteConfig";
import PropTypes from "prop-types";
import AuthLogo from "../../components/logo/AuthLogo";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import KeyboardAvoidingComponent from "../../components/Keyboard/KeyboardAvoidingComponent";
import { appPrimaryColor, appTextColor } from "../../utils/colors/appColors";
import { validatePassword } from "../../utils/Regex/Validators";

ChangePasswordScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default function ChangePasswordScreen({ navigation }) {

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const handlePasswordChange = async () => {
        try {
            await account.updatePassword(passwords.newPassword, passwords.oldPassword);

            setPasswords({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            });

            navigation.navigate("Settings");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={AppStyle.container}>
            <KeyboardAvoidingComponent style={HomeStyle.updateAccountKeyboardAdj}>
                <AuthLogo style={HomeStyle.updateAccountLogo} />

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
        </SafeAreaView>

    );
}

