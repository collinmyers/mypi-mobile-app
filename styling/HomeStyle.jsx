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
        alignSelf: "center",
        backgroundColor: "#134C77",
        width: "100%"
    },
    scrollableView: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#134C77"
    },
    dbText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 18,
        marginBottom: 10,
    },
    // Dashboard container styling
    dbContainer: {
        paddingHorizontal: 20,
        marginTop: 100,
    },
    // Dashboard title styling
    dbTitleText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 24,
        marginBottom: 20,
    },
    parkInfoText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 14,
        marginBottom: 20,
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
        backgroundColor: "#8FA063",
    },
    eventCardContent: {

    },
    eventListImage: {
        aspectRatio: 1.5,
        borderRadius: 5,
        marginBottom: "5%",
        resizeMode: "cover",
        width: "100%",
    },
    eventListTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#FFFFFF"
    },
    eventListDateTime: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 14,
        color: "#FFFFFF",
        marginVertical: "1%"
    },
    eventListDescription: {
        fontSize: 14,
        color: "#FFFFFF"
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
    },
    eventDetailsBackButton: {
        alignItems: "left",
        padding: 10
    },
    eventDetailsCard: {
        alignSelf: "center",
        width: "95%",
        padding: 10,
        paddingBottom: 0,
        backgroundColor: "#8FA063",
    },
    eventDetailsCardContent: {
        alignItems: "center",
    },
    eventDetailsTitle: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 24,
    },
    eventDetailsDateTime: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: "1%"
    },
    eventDetailsImage: {
        aspectRatio: 1.5,
        borderRadius: 5,
        marginVertical: "10%",
        resizeMode: "cover",
        width: "100%",
    },
    eventDetailsDescription: {
        color: "#FFFFFF",
        fontSize: 16
    },
    homeButtonOpacity: {
        backgroundColor: "#134C77",
        width: 160,
        borderRadius: 5,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        marginVertical: "10%",
        marginBottom: 0,
    },
    homeButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 15
    },
    donationsWebViewContainer: {
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#134C77"
    },
    donationsWebView: {
        flex: 1,
        backgroundColor: "#134C77"
    }
});