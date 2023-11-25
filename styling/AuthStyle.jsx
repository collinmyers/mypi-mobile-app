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
        backgroundColor: appBlue,
        width: 150,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10
    },

    buttonText: {
        color: appWhite,
        textAlign: "center",
        fontSize: 15
    },

    additionalOptions: {
        marginBottom: 10
    },
    additionalOptionsText: {
        color: "#134C77",
        fontSize: 15
    }
});