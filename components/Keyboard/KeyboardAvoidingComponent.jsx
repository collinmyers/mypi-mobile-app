import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";

const useKeyboardVisible = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => { setKeyboardVisible(true); },);

        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => { setKeyboardVisible(false); },);

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return isKeyboardVisible;
};

const KeyboardAvoidingComponent = ({ children, style }) => {
    const isKeyboardVisible = useKeyboardVisible();

    return (
        <KeyboardAvoidingView
            contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style}
        >
            <ScrollView scrollEnabled={isKeyboardVisible} showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

KeyboardAvoidingComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    style: PropTypes.any,
};

export default KeyboardAvoidingComponent;