import { Dimensions, StyleSheet } from "react-native";
import { appPrimaryColor, appTertiaryColor, appTextColor, appSecondaryColor } from "../utils/colors/appColors";


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
    radio: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    radioGroup: {
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "2%",
        borderRadius: 8,
        backgroundColor: "white",
        padding: 20,
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
    }
});