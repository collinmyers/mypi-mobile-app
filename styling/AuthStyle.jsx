import { StyleSheet } from "react-native";

const appBlue = "#134C77";
const appGreen = "#8FA063";
const appWhite = "#FFFFFF";

export default StyleSheet.create({

    keyboardAdj:{
        width: "80%",
    },
    logo:{
        alignSelf: "center",
    },
    card: {
        alignSelf: "center",
        width: "100%",
        padding: 10,
        backgroundColor: appGreen,
        margin: "5%"
    },
    cardContent: {
        alignItems: "center"
    },

    title: {
        fontSize: 30,
        color: appBlue,
        fontWeight: "bold",
        marginBottom: 16,
    },

    userInput: {
        width: "90%",
        height: 40,
        backgroundColor: "none",
        marginBottom: 16,
        color: appWhite
    },

    ButtonOpacity: {
        fontSize: 20,
        width: 150,
        margin: "5%",
        padding: 10,
        borderRadius: 20,
        color: appWhite,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appBlue,
        overflow: "hidden"
    },

    buttonText: {
        color: appWhite,
        textAlign: "center",
        fontSize: 15
    },

    additionalOptions: {
        marginTop: 10
    },
    additionalOptionsText: {
        color: "#134C77",
        fontSize: 16
    }
});