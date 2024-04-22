import React from "react";
import { Image } from "expo-image";
import { Dimensions } from "react-native";
import Logo from "../../assets/main/myPILogo.png";
import PropTypes from "prop-types";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

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
    logoWidth: (deviceWidth * .45),
    logoHeight: (deviceHeight * .25),
};