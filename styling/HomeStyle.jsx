import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const cardWidth = deviceWidth * .75;
const buttonWidth = deviceWidth * .5;

const appBlue = "#134C77";
const appGreen = "#8FA063";
const appWhite = "#FFFFFF";
const deleteRed = "#C70039";

export default StyleSheet.create({

    eventContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appBlue,
    },
    settingsContainer: {
        flex: 1,
        alignSelf: "center",
        backgroundColor: appBlue,
        width: "100%"
    },
    scrollableView: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: appBlue
    },
    dbText: {
        textAlign: "center",
        color: appWhite,
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
        color: appWhite,
        fontSize: 24,
        marginBottom: 20,
    },
    parkInfoText: {
        textAlign: "center",
        color: appWhite,
        fontSize: 14,
        marginBottom: 20,
    },
    settingsCardContentContainer: {

    },

    settingsCard: {
        backgroundColor: appBlue,
        borderWidth: 2,
        borderColor: appGreen,
        width: cardWidth,
        marginBottom: 10
    },
    settingsCardContent: {
        alignSelf: "center",
        borderTopColor: appGreen,
        width: cardWidth,
        alignItems: "center",
        // marginTop: 20,
        // marginHorizontal: 20,
    },
    settingsSectionHeader: {
        alignSelf: "center",
        color: appWhite,
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 10
    },
    navPreferencePickerText: {
        fontSize: 16,
        marginBottom: 8,
    },
    profileView: {
        padding: 16,
    },
    profileText: {
        textAlign: "center",
        color: appWhite,
        fontWeight: "bold",
        fontSize: 20
    },
    cardView: {
        flex: 1,
        alignSelf: "center",
        marginTop: 20
    },
    changeInfoOpac: {
        backgroundColor: appGreen,
        borderRadius: 5,
        width: buttonWidth,
        marginVertical: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    changeInfoText: {
        color: appWhite,
        textAlign: "center",
        fontSize: 20
    },
    deleteAccountOpac: {
        backgroundColor: deleteRed,
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
        backgroundColor: appBlue,
        margin: deviceWidth * .05,
        padding: 30,
        alignItems: "center",
        borderRadius: 5
    },
    modalText: {
        marginBottom: 20,
        color: appWhite,
        textAlign: "center"
    },
    modalButtonContainer: {
        flexDirection: "row",
    },
    modalCancelButton: {
        backgroundColor: appGreen,
        paddingVertical: 10,
        paddingHorizontal: 30,
        margin: 10,
        borderRadius: 5,
    },
    modalDeleteButton: {
        backgroundColor: deleteRed,
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: appWhite,
        textAlign: "center"
    },
    ButtonOpacity: {
        backgroundColor: appGreen,
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
        backgroundColor: appGreen,
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
        color: appWhite
    },
    eventListDateTime: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 14,
        color: appWhite,
        marginVertical: "1%"
    },
    eventListDescription: {
        fontSize: 14,
        color: appWhite
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
        backgroundColor: appGreen,
        margin: "5%"
    },
    updateAccountCardContent: {
        alignItems: "center"
    },

    updateAccountTitle: {
        fontSize: 30,
        color: appBlue,
        fontWeight: "bold",
        marginBottom: 16,
    },

    updateAccountUserInput: {
        width: "90%",
        height: 40,
        backgroundColor: "none",
        marginBottom: 16,
        color: appWhite
    },

    updateAccountButtonOpacity: {
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

    updateAccountButtonText: {
        color: appWhite,
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
        backgroundColor: appGreen,
    },
    eventDetailsCardContent: {
        alignItems: "center",
    },
    eventDetailsTitle: {
        color: appWhite,
        fontWeight: "bold",
        fontSize: 24,
    },
    eventDetailsDateTime: {
        fontSize: 14,
        fontWeight: "bold",
        color: appWhite,
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
        color: appWhite,
        fontSize: 16
    },
    homeButtonOpacity: {
        backgroundColor: appBlue,
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
        color: appWhite,
        textAlign: "center",
        fontSize: 15
    },
    donationsWebViewContainer: {
        justifyContent: "center",
        height: "100%",
        backgroundColor: appBlue
    },
    donationsWebView: {
        flex: 1,
        backgroundColor: appBlue
    },
    modalNavContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000080"
    },
    modalNavContentContainer: {
        backgroundColor: appBlue,
        maxWidth: "90%",
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignItems: "center",
        borderRadius: 5
    },
    modalNavCancelContainer: {
        backgroundColor: appBlue,
    },
    modalNavText: {
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 18,
        color: appWhite,
        textAlign: "center"
    },
    modalNavButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalNavCancelContentContainer: {
        marginTop: 30
    },
    modalNavCancelButton: {
        backgroundColor: deleteRed,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
    },
    modalNavButton: {
        backgroundColor: appGreen,
        paddingHorizontal: "10%",
        paddingVertical: 10,
        marginHorizontal: 6.5,
        borderRadius: 5,
    },
    modalNavButtonText: {
        color: appWhite,
        textAlign: "center"
    },
});