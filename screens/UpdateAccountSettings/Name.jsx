import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Snackbar, Text, TextInput } from "react-native-paper";
import { account } from "../../utils/Config/appwriteConfig";
import PropTypes from "prop-types";
import Logo from "../../components/logo/AppLogo";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import KeyboardAvoidingComponent from "../../components/Keyboard/KeyboardAvoidingComponent";
import { appPrimaryColor, appTextColor } from "../../utils/colors/appColors";

ChangeNameScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default function ChangeNameScreen({ navigation }) {

    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [name, setName] = useState(null);
    const [isActionOcurring, setIsActionOccuring] = useState(false);

    const handleNameChange = async () => {
        if (!isActionOcurring) {
            setIsActionOccuring(true);
            try {

                if (name === null) {
                    setErrorMessage("Please enter your full name");
                    setIsSnackbarVisible(true);
                    return;
                }
                if (name.length > 128) {
                    setErrorMessage("Name must be less than 128 characters");
                    setIsSnackbarVisible(true);
                    return;
                }

                await account.updateName(name);

                setName({
                    firstName: "",
                    lastName: ""
                });

                navigation.navigate("Settings");

            } catch (error) {
                console.error(error);
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

                        <Text style={HomeStyle.updateAccountTitle}> Change Name</Text>

                        <TextInput
                            style={HomeStyle.updateAccountUserInput}
                            numberOfLines={1}
                            placeholder="Full Name"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />


                        <TouchableOpacity onPress={handleNameChange} style={HomeStyle.updateAccountButtonOpacity}>
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

