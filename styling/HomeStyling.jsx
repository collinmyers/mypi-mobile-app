import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({

    eventContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#134C77",
    },
    settingsContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#134C77",
    },
    centerText: {
        textAlign: "center",
        color: "#FFFFFF"
    },
    profileView: {
        padding: 16,
    },
    profileText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 20
    },
    changeInfoSection: {
        flex: 1,
        alignSelf: "center",
        marginTop: 20
    },
    changeInfoOpac: {
        backgroundColor: "#8FA063",
        borderRadius: 5,
        width: deviceWidth * .5,
        marginVertical: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    changeInfoText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 20
    },
    deleteAccountOpac: {
        backgroundColor: "#C70039",
        borderRadius: 5,
        width: deviceWidth * .5,
        marginVertical: 10,
        paddingTop: 10,
        paddingBottom: 10
    }

});