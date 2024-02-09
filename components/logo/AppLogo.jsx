import React from "react";
import { Image } from "react-native";
import Logo from "../../assets/main/myPILogo.png";
import LogoAlt from "../../assets/main/myPILogo.png";
import { useAltUI } from "../../utils/colors/appColors";
import PropTypes from "prop-types";

// import image from assets folder and define the size
export default function AppLogo({ logoWidth, logoHeight, style }) {
    return (
        useAltUI ? (
            <Image
                source={LogoAlt}
                style={[{ width: logoWidth, height: logoHeight, resizeMode: "contain" }, style]}
            />
        ) : (
            <Image
                source={Logo}
                style={[{ width: logoWidth, height: logoHeight, resizeMode: "contain" }, style]}
            />
        )
    );
}

AppLogo.propTypes = {
    logoWidth: PropTypes.number.isRequired,
    logoHeight: PropTypes.number.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

AppLogo.defaultProps = {
    logoWidth: 250,
    logoHeight: 200,
};