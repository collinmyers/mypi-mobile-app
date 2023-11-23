import React from "react";
import PropTypes from "prop-types";
import { View, KeyboardAvoidingView, Platform } from "react-native";

const KeyboardAvoidingComponent = ({ children, style }) => {
    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} style={style}>
            <View>{children}</View>
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


