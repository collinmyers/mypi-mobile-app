import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { Account, Client } from "appwrite";
import PropTypes from "prop-types";

import AuthLogo from "../../components/logo/AuthLogo";
import AppStyle from "../../styling/AppStyling";
import AuthStyle from "../../styling/AuthStyling";

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

            <AuthLogo style={AuthStyle.logo} />

            <Card style={AuthStyle.card}>

                <Card.Content style={AuthStyle.cardContent}>

                    <Text style={AuthStyle.title}> Change Name</Text>

                    <TextInput
                        style={AuthStyle.userInput}
                        numberOfLines={1}
                        placeholder="First Name"
                        placeholderTextColor={"#FFFFFF"}
                        textColor={"#FFFFFF"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        onChangeText={(text) => setName({ ...name, firstName: text })}
                        value={name.firstName}
                        onBlur={() => validateName(name.firstName, setName)}
                    />

                    <TextInput
                        style={AuthStyle.userInput}
                        numberOfLines={1}
                        placeholder="Last Name"
                        placeholderTextColor={"#FFFFFF"}
                        textColor={"#FFFFFF"}
                        mode="flat"
                        underlineColor="#134C77"
                        activeUnderlineColor="#134C77"
                        onChangeText={(text) => setName({ ...name, lastName: text })}
                        value={name.lastName}
                        onBlur={() => validateName(name.lastName, setName)}
                    />


                    <TouchableOpacity onPress={handleNameChange} style={AuthStyle.ButtonOpacity}>
                        <Text style={AuthStyle.buttonText}>Change</Text>
                    </TouchableOpacity>

                </Card.Content>
            </Card>

        </SafeAreaView>

    );
}

