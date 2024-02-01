import { StyleSheet } from "react-native";
import { appPrimaryColor, appSecondaryColor, appTertiaryColor, appTextColor } from "../utils/colors/appColors";

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
        margin: "2%"
    },
    cardContent: {
        alignItems: "center"
    },

    title: {
        fontSize: 30,
        color: appTertiaryColor,
        fontWeight: "600",
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
        width: 150,
        margin: "5%",
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appTertiaryColor,
        overflow: "hidden"
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
        color: appTextColor,
        fontSize: 16
    }
});