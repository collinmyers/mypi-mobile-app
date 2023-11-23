import { StyleSheet } from "react-native";

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
        backgroundColor: "#8FA063",
        margin: "5%"
    },
    cardContent: {
        alignItems: "center"
    },

    title: {
        fontSize: 30,
        color: "#134C77",
        fontWeight: "bold",
        marginBottom: 16,
    },

    userInput: {
        width: "90%",
        height: 40,
        backgroundColor: "none",
        marginBottom: 16,
        color: "#FFFFFF"
    },

    ButtonOpacity: {
        backgroundColor: "#134C77",
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
        color: "#FFFFFF",
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