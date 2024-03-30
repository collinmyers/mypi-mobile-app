import { Dimensions, StyleSheet } from "react-native";
import {appQuarternaryColor, appSecondaryColor, appTertiaryColor, appTextColor } from "../utils/colors/appColors";

const deviceWidth = Dimensions.get("window").width;
const buttonWidth = deviceWidth * .4;

export default StyleSheet.create({

    keyboardAdj: {
        width: "80%",
    },
    logo: {
        alignSelf: "center",
    },
    card: {
        alignSelf: "center",
        width: "100%",
        padding: 10,
        backgroundColor: appSecondaryColor,
        margin: "2%",
        borderWidth: 1.25,
        borderColor: appQuarternaryColor
    },
    cardContent: {
        alignItems: "center"
    },

    title: {
        fontSize: 28,
        color: appTertiaryColor,
        fontWeight: "500",
        marginBottom: 16,
    },

    userInput: {
        width: "90%",
        height: 40,
        backgroundColor: "none",
        marginBottom: 16,
        color: appTextColor
    },

    ButtonOpacity: {
        fontSize: 20,
        width: buttonWidth,
        margin: "5%",
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appQuarternaryColor,
        overflow: "hidden",
        borderWidth: .20,
        borderColor: "#004466"
    },

    buttonText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 15
    },

    additionalOptions: {
        marginTop: 10
    },
    additionalOptionsText: {
        color: appTertiaryColor,
        fontSize: 16
    }
});