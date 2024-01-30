import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { account } from "../../utils/Config/appwriteConfig";
import PropTypes from "prop-types";
import Logo from "../../components/logo/AppLogo";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import KeyboardAvoidingComponent from "../../components/Keyboard/KeyboardAvoidingComponent";
import { appPrimaryColor, appTextColor } from "../../utils/colors/appColors";
import { validateName } from "../../utils/Regex/Validators";

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
                <Logo style={HomeStyle.updateAccountLogo} />

                <Card style={HomeStyle.updateAccountCard}>

                    <Card.Content style={HomeStyle.updateAccountCardContent}>

                        <Text style={HomeStyle.updateAccountTitle}> Change Name</Text>

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="First Name"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            onChangeText={(text) => setName({ ...name, firstName: text })}
                            value={name.firstName}
                            onBlur={() => validateName(name.firstName, setName)}
                        />

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="Last Name"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
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

