import { Dimensions, StyleSheet } from "react-native";
import { appPrimaryColor, appTertiaryColor, appTextColor } from "../utils/colors/appColors";


const deviceWidth = Dimensions.get("window").width;
const buttonWidth = deviceWidth * .5;

export default StyleSheet.create({
    ShareLocationButtonOpac: {
        fontSize: 20,
        width: buttonWidth,
        margin: "2%",
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appTertiaryColor,
        overflow: "hidden"
    },
    ShareLocationText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 18
    },
    UnshareLocationButtonOpac: {
        fontSize: 20,
        width: buttonWidth,
        margin: "2%",
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appTertiaryColor,
        overflow: "hidden"
    },
    UnshareLocationText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 18
    },
    PickerDropdown: {
        width: deviceWidth * 0.5,
        backgroundColor: appPrimaryColor,
    },
    PickerDropdownContainer: {
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 5,
        width: deviceWidth * 0.5,
    },
    PickerDropdownText: {
        fontSize: 16,
        color: "#000000",

    },
    TextInputStyle: {
        backgroundColor: appPrimaryColor,
        fontSize: 16
    }
});