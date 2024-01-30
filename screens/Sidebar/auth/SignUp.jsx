import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { account } from "../../../utils/Config/appwriteConfig";
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSignUp = async () => {
        try {
            await account.create(ID.unique(), signUpInfo.email, signUpInfo.password, `${signUpInfo.firstName} ${signUpInfo.lastName}`);

            navigation.navigate("Login");

        } catch (error) {
            console.error(error);
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
                            placeholder="First Name"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, firstName: text })}
                            value={signUpInfo.firstName}
                            onBlur={() => validateName(signUpInfo.firstName, (text) => setSignUpInfo({ ...signUpInfo, firstName: text }))}
                        />

                        <TextInput
                            style={AuthStyle.userInput}
                            numberOfLines={1}
                            placeholder="Last Name"
                            placeholderTextColor={appTextColor}
                            textColor={appTextColor}
                            mode="flat"
                            underlineColor={appPrimaryColor}
                            activeUnderlineColor={appPrimaryColor}
                            onChangeText={(text) => setSignUpInfo({ ...signUpInfo, lastName: text })}
                            onBlur={() => validateName(signUpInfo.lastName, (text) => setSignUpInfo({ ...signUpInfo, lastName: text }))}
                            value={signUpInfo.lastName}
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
                            onBlur={() => validateEmail(signUpInfo.email, (text) => setSignUpInfo({ ...signUpInfo, email: text }))}
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
                            onBlur={
                                () => validatePassword(signUpInfo.password, signUpInfo.confirmPassword,
                                    (text) => setSignUpInfo({ ...signUpInfo, password: text }),
                                    (text) => setSignUpInfo({ ...signUpInfo, confirmPassword: text }))
                            }
                        />
                        <TouchableOpacity onPress={handleSignUp} style={AuthStyle.ButtonOpacity}>
                            <Text style={AuthStyle.buttonText}>Sign Up</Text>
                        </TouchableOpacity>

                    </Card.Content>
                </Card>
            </KeyboardAvoidingComponent>
        </SafeAreaView>
    );
}
