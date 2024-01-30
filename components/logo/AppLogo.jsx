import React from "react";
import { Image } from "react-native";
import Logo from "../../assets/myPILogo.png";
import PropTypes from "prop-types";

// import image from assets folder and define the size
export default function AppLogo({ logoWidth, logoHeight, style }) {
    return (
        <Image source={Logo}
            style={[{ width: logoWidth, height: logoHeight, objectFit: "contain"  }, style]}
        />
    );
}

AppLogo.propTypes = {
    logoWidth: PropTypes.number.isRequired,
    logoHeight: PropTypes.number.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

AppLogo.defaultProps = {
    logoWidth: 200,
    logoHeight: 120,
};