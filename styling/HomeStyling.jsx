import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const cardWidth = deviceWidth *.75;
const buttonWidth = deviceWidth * .5;

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

    // Temp until content gets placed in pages
    centerText: {
        textAlign: "center",
        color: "#FFFFFF"
    },
    settingsCardContentContainer: {

    },
    
    settingsCard: {
        backgroundColor: "#134C77",
        borderWidth: 1,
        borderColor: "#8FA063",
        width: cardWidth,
        marginBottom: 10
    },
    settingsCardContent: {
        alignSelf: "center",
        borderTopColor: "#8FA063",
        width: cardWidth,
        alignItems: "center"
    },
    settingsSectionHeader: {
        alignSelf: "center",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 10
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
    cardView: {
        flex: 1,
        alignSelf: "center",
        marginTop: 20
    },
    changeInfoOpac: {
        backgroundColor: "#8FA063",
        borderRadius: 5,
        width: buttonWidth,
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
        width: buttonWidth,
        marginVertical: 10,
        paddingTop: 10,
        paddingBottom: 10
    }

});