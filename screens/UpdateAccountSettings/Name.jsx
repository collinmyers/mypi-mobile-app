import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { Account, Client } from "appwrite";
import PropTypes from "prop-types";

import AuthLogo from "../../components/logo/AuthLogo";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import KeyboardAvoidingComponent from "../../components/Keyboard/KeyboardAvoidingComponent";

import { validateName } from "../../utils/Validators";

ChangeNameScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default function ChangeNameScreen({ navigation }) {

    const [name, setName] = useState({
        firstName: "",
        lastName: ""
    });

    const appBlue = "#134C77";
    const appWhite = "#FFFFFF";

    const handleNameChange = async () => {

        try {

            const updatedName = `${name.firstName} ${name.lastName}`;

            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);
            await account.updateName(updatedName);

            setName({
                firstName: "",
                lastName: ""
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

                        <Text style={HomeStyle.updateAccountTitle}> Change Name</Text>

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="First Name"
                            placeholderTextColor={appWhite}
                            textColor={appWhite}
                            mode="flat"
                            underlineColor={appBlue}
                            activeUnderlineColor={appBlue}
                            onChangeText={(text) => setName({ ...name, firstName: text })}
                            value={name.firstName}
                            onBlur={() => validateName(name.firstName, setName)}
                        />

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="Last Name"
                            placeholderTextColor={appWhite}
                            textColor={appWhite}
                            mode="flat"
                            underlineColor={appBlue}
                            activeUnderlineColor={appBlue}
                            onChangeText={(text) => setName({ ...name, lastName: text })}
                            value={name.lastName}
                            onBlur={() => validateName(name.lastName, setName)}
                        />


                        <TouchableOpacity onPress={handleNameChange} style={HomeStyle.updateAccountButtonOpacity}>
                            <Text style={HomeStyle.updateAccountButtonText}>Change</Text>
                        </TouchableOpacity>

                    </Card.Content>
                </Card>
            </KeyboardAvoidingComponent>


        </SafeAreaView>

    );
}

