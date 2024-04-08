import React from "react";
import { Image } from "expo-image";
import Logo from "../../assets/main/myPILogo.png";
import PropTypes from "prop-types";

// import image from assets folder and define the size
export default function AppLogo({ logoWidth, logoHeight, style }) {
    return (
        <Image
            source={Logo}
            placeholder={"blurhash"}
            contentFit="contain"
            style={[{ width: logoWidth, height: logoHeight }, style]}
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
    logoHeight: 200,
};