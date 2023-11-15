import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { Account, Client } from "appwrite";
import PropTypes from "prop-types";

import AuthLogo from "../../components/logo/AuthLogo";
import AppStyle from "../../styling/AppStyle";
import AuthStyle from "../../styling/AuthStyle";

import { validatePassword } from "../../utils/Validators";

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

            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);
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

            <AuthLogo style={AuthStyle.logo} />

            <Card style={AuthStyle.card}>

                <Card.Content style={AuthStyle.cardContent}>

                    <Text style={AuthStyle.title}> Change Password</Text>

                    <TextInput
                        style={AuthStyle.userInput}
                        numberOfLines={1}
                        placeholder="Old Password"
                        placeholderTextColor={"#FFFFFF"}
                        textColor={"#FFFFFF"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        secureTextEntry
                        onChangeText={(text) => setPasswords({ ...passwords, oldPassword: text })}
                        value={passwords.oldPassword}
                    />

                    <TextInput
                        style={AuthStyle.userInput}
                        numberOfLines={1}
                        placeholder="New Password"
                        placeholderTextColor={"#FFFFFF"}
                        textColor={"#FFFFFF"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        secureTextEntry
                        onChangeText={(text) => setPasswords({ ...passwords, newPassword: text })}
                        value={passwords.newPassword}
                    />

                    <TextInput
                        style={AuthStyle.userInput}
                        numberOfLines={1}
                        placeholder="Confirm New Password"
                        placeholderTextColor={"#FFFFFF"}
                        textColor={"#FFFFFF"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        secureTextEntry
                        onChangeText={(text) => setPasswords({ ...passwords, confirmNewPassword: text })}
                        value={passwords.confirmNewPassword}
                        onBlur={
                            () => validatePassword(passwords.newPassword, passwords.confirmNewPassword,
                                (text) => setPasswords({ ...passwords, newPassword: text }),
                                (text) => setPasswords({ ...passwords, confirmNewPassword: text }))
                        }
                    />

                    <TouchableOpacity onPress={handlePasswordChange} style={AuthStyle.ButtonOpacity}>
                        <Text style={AuthStyle.buttonText}>Change</Text>
                    </TouchableOpacity>

                </Card.Content>
            </Card>

        </SafeAreaView>

    );
}

