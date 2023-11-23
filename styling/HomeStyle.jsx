import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const cardWidth = deviceWidth * .75;
const buttonWidth = deviceWidth * .5;

export default StyleSheet.create({

    eventContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        borderWidth: 2,
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000080"
    },
    modalContentContainer: {
        backgroundColor: "#134C77",
        margin: deviceWidth * .05,
        padding: 30,
        alignItems: "center",
        borderRadius: 5
    },
    modalText: {
        marginBottom: 20,
        color: "#FFFFFF",
        textAlign: "center"
    },
    modalButtonContainer: {
        flexDirection: "row",
    },
    modalCancelButton: {
        backgroundColor: "#8FA063",
        paddingVertical: 10,
        paddingHorizontal: 30,
        margin: 10,
        borderRadius: 5,
    },
    modalDeleteButton: {
        backgroundColor: "#C70039",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: "#FFFFFF",
        textAlign: "center"
    },
    ButtonOpacity: {
        backgroundColor: "#8FA063",
        width: 150,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10
    },
    eventCard: {
        width: deviceWidth * .9,
        marginBottom: deviceWidth * .1,
    },
    eventCardContent: {

    },
    eventShortImage: {
        aspectRatio: 1.5,
        borderRadius: 5,
        marginBottom: "5%",
        resizeMode: "cover",
        width: "100%",
    },
    eventShortTitle: {
        fontWeight: "bold",
        fontSize: 18
    },
    eventShortDescription: {
        fontSize: 14
    },
    updateAccountKeyboardAdj: {
        width: "80%",
    },
    updateAccountLogo: {
        alignSelf: "center",
    },
    updateAccountCard: {
        alignSelf: "center",
        width: "100%",
        padding: 10,
        backgroundColor: "#8FA063",
        margin: "5%"
    },
    updateAccountCardContent: {
        alignItems: "center"
    },

    updateAccountTitle: {
        fontSize: 30,
        color: "#134C77",
        fontWeight: "bold",
        marginBottom: 16,
    },

    updateAccountUserInput: {
        width: "90%",
        height: 40,
        backgroundColor: "none",
        marginBottom: 16,
        color: "#FFFFFF"
    },

    updateAccountButtonOpacity: {
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

    updateAccountButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 15
    }
});