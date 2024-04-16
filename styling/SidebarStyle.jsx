import { Dimensions, StyleSheet } from "react-native";
import { appPrimaryColor, appTertiaryColor, appTextColor, appSecondaryColor, appWarningColor, appQuarternaryColor } from "../utils/colors/appColors";


const deviceWidth = Dimensions.get("window").width;
const buttonWidth = deviceWidth * .5;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appPrimaryColor,
    },
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
    radio: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    dropdrop: {
        alignSelf: "center",
        justifyContent: "center",
        width: "60%",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: appQuarternaryColor,
        backgroundColor: appPrimaryColor,
    },
    dropdownLabel:{
        fontSize: 20,
        fontWeight: 600,
        color: appTertiaryColor,
        textAlign: "center",
        marginBottom: "2%"
    },
    radioButtons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: "2%",
        marginBottom: "5%",

    },

    radioText: {
        color: appSecondaryColor,
    },
    setRadioText: {
        color: appSecondaryColor,

    },
    TextInputStyle: {
        backgroundColor: appPrimaryColor,
        fontSize: 16
    },
    snackBar: {
        backgroundColor: appSecondaryColor,
        color: appTextColor,
    },
    snackBarFail: {
        backgroundColor: appWarningColor,
        color: appTextColor
    },
});