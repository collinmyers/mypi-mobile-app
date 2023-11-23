import React from "react";
import { Image } from "react-native";
import appLogo from "../../assets/my-pi-logo-alt.png";
import PropTypes from "prop-types";

// import image from assets folder and define the size
export default function AuthLogo({ logoWidth, logoHeight, style }) {
    return (
        <Image source={appLogo}
            style={[{ width: logoWidth, height: logoHeight, objectFit: "contain"  }, style]}
        />
    );
}

AuthLogo.propTypes = {
    logoWidth: PropTypes.number.isRequired,
    logoHeight: PropTypes.number.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

AuthLogo.defaultProps = {
    logoWidth: 200,
    logoHeight: 120,
};