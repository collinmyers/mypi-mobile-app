import React from "react";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KeyboardAvoidingComponent = ({ children, style }) => {
    return (
        <KeyboardAwareScrollView style={style} scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {children}
        </KeyboardAwareScrollView>
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