import { Dimensions, Platform, StyleSheet } from "react-native";
import { appPrimaryColor, appSecondaryColor, appTertiaryColor, appTextColor, appWarningColor, useAltUI } from "../utils/colors/appColors";

let fontSizeAlert = 16;
let marginBottomEventDetails = 0;

if (Platform.OS === "android") {
    fontSizeAlert = 13;
    marginBottomEventDetails = 70;
}

let eventDateColor = appPrimaryColor;

if (useAltUI) {
    eventDateColor = appTertiaryColor;
}

const deviceWidth = Dimensions.get("window").width;
const cardWidth = deviceWidth * .75;
const buttonWidth = deviceWidth * .5;

export default StyleSheet.create({

    eventContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appPrimaryColor,
    },
    settingsContainer: {
        flex: 1,
        alignSelf: "center",
        backgroundColor: appPrimaryColor,
        width: "100%"
    },
    scrollableView: {
        marginTop: "2%",
        // flexGrow: 1,
        justifyContent: "space",
        backgroundColor: appPrimaryColor
    },
    dbText: {
        textAlign: "center",
        color: appSecondaryColor,
        fontSize: 18,
        marginBottom: 10,
    },
    // Dashboard container styling
    dbContainer: {
        paddingHorizontal: 20,
        margin: "5%"
    },
    // Dashboard title styling
    dbTitleText: {
        textAlign: "center",
        color: appSecondaryColor,
        fontSize: 24,
        marginBottom: 20,
    },
    parkInfoText: {
        textAlign: "center",
        color: appSecondaryColor,
        fontSize: 14,
        marginBottom: 20,
    },
    settingsCardContentContainer: {

    },

    settingsCard: {
        backgroundColor: appSecondaryColor,
        width: cardWidth,
        marginBottom: 10
    },
    settingsCardContent: {
        alignSelf: "center",
        borderTopColor: appSecondaryColor,
        width: cardWidth,
        alignItems: "center",
    },
    settingsSectionHeader: {
        alignSelf: "center",
        color: appPrimaryColor,
        fontWeight: "600",
        fontSize: 20,
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
        color: appSecondaryColor,
        fontWeight: "600",
        fontSize: 20
    },
    cardView: {
        flex: 1,
        alignSelf: "center",
        marginTop: 20
    },
    settingsButtonOpac: {
        fontSize: 20,
        width: buttonWidth,
        margin: "2%",
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appTertiaryColor,
        overflow: "hidden"
    },
    changeInfoText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 18
    },
    deleteAccountOpac: {
        fontSize: 18,
        width: buttonWidth,
        margin: "2%",
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appWarningColor,
        overflow: "hidden"
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000080"
    },
    modalContentContainer: {
        backgroundColor: appPrimaryColor,
        width: "90%",
        padding: 30,
        alignItems: "center",
        borderRadius: 5
    },
    modalText: {
        marginBottom: 20,
        color: appSecondaryColor,
        textAlign: "center"
    },
    modalButtonContainer: {
        flexDirection: "row",
    },
    modalCancelButton: {
        paddingHorizontal: 30,
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appTertiaryColor,
    },
    modalDeleteButton: {
        paddingHorizontal: 30,
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appSecondaryColor,
        overflow: "hidden"
    },
    modalButtonText: {
        color: appTextColor,
        textAlign: "center"
    },
    ButtonOpacity: {
        backgroundColor: appSecondaryColor,
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
        backgroundColor: appSecondaryColor,
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
        fontWeight: "600",
        fontSize: 18,
        color: appPrimaryColor
    },
    eventListDateTime: {
        textAlign: "left",
        fontWeight: "600",
        fontSize: 14,
        color: eventDateColor,
        marginVertical: "1%"
    },
    eventListDescription: {
        fontSize: 14,
        color: appTextColor
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
        backgroundColor: appSecondaryColor,
        margin: "5%"
    },
    updateAccountCardContent: {
        alignItems: "center"
    },

    updateAccountTitle: {
        fontSize: 30,
        color: appTertiaryColor,
        fontWeight: "600",
        marginBottom: 16,
    },

    updateAccountUserInput: {
        width: "90%",
        height: 40,
        backgroundColor: "none",
        marginBottom: 16,
        color: appTextColor
    },

    updateAccountButtonOpacity: {
        fontSize: 20,
        width: buttonWidth,
        margin: "2%",
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appTertiaryColor,
        overflow: "hidden"
    },

    updateAccountButtonText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 15
    },
    eventDetailsCard: {
        alignSelf: "center",
        width: "95%",
        padding: 10,
        paddingBottom: 0,
        backgroundColor: appSecondaryColor,
        marginBottom: marginBottomEventDetails
    },
    eventDetailsCardContent: {
        alignItems: "center",
    },
    eventDetailsTitle: {
        color: appTextColor,
        fontWeight: "600",
        fontSize: 24,
    },
    eventDetailsDateTime: {
        fontSize: 14,
        fontWeight: "600",
        color: eventDateColor,
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
        color: appTextColor,
        fontSize: 16
    },
    homeButtonOpacity: {
        backgroundColor: appTertiaryColor,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginVertical: "10%",
        marginBottom: 0,
        fontSize: 20,
        borderRadius: 20,
        color: appTextColor,
        overflow: "hidden"
    },
    homeButtonText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 15
    },
    donationsWebViewContainer: {
        justifyContent: "center",
        height: "100%",
        backgroundColor: appPrimaryColor
    },
    donationsWebView: {
        flex: 1,
        backgroundColor: appPrimaryColor
    },
    modalNavContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000080"
    },
    modalNavContentContainer: {
        backgroundColor: appPrimaryColor,
        width: "90%",
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignItems: "center",
        borderRadius: 5
    },
    modalNavCancelContainer: {
        backgroundColor: appPrimaryColor,
    },
    modalNavText: {
        marginBottom: 20,
        fontWeight: "600",
        fontSize: 18,
        color: appSecondaryColor,
        textAlign: "center"
    },
    modalNavButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    modalNavCancelContentContainer: {
        marginTop: 30
    },
    modalNavCancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 50,
        marginHorizontal: 6.5,
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: appSecondaryColor,
    },
    modalNavButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 6.5,
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: appTertiaryColor,
        maxWidth: "34%"

    },
    modalNavButtonText: {
        color: appTextColor,
        textAlign: "center",
    },
    alertContainer: {
        display: "flex",
        flex: 1,
        backgroundColor: appPrimaryColor,
    },
    alertButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: "10%",
    },
    alertButton: {
        backgroundColor: appTertiaryColor,
        borderRadius: 25,
        marginTop: "2%",
        marginHorizontal: "1%",
    },
    alertButtonText: {
        color: appTextColor,
        textAlign: "center",
        marginHorizontal: "4%",
        fontSize: fontSizeAlert
    },
    alertCard: {
        width: deviceWidth * .9,
        marginBottom: deviceWidth * .1,
        backgroundColor: appSecondaryColor,
    },
    alertCardContent: {

    },
    alertListTitle: {
        fontWeight: "600",
        textAlign: "center",
        fontSize: 18,
        color: appTextColor
    },
    alertListDetails: {
        fontSize: 14,
        textAlign: "center",
        color: appTextColor
    },
    alertListTypeDesc: {
        fontSize: 12,
        fontStyle: "italic",
        color: appTextColor
    },
    dashboardDonoOpac: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-evenly",
        width: buttonWidth,
        marginVertical: 10,
        paddingTop: 10,
        paddingBottom: 10,
        margin: "5%",
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        backgroundColor: appTertiaryColor,
        overflow: "hidden"
    },
    dashboardDonoText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 24
    },
    navBackButton: {


    },
    pushNotifOpac: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-evenly",
        width: buttonWidth,
        marginVertical: 10,
        paddingTop: 10,
        paddingBottom: 10,
        margin: "5%",
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        backgroundColor: appSecondaryColor,
        overflow: "hidden"
    },
    pushNotifText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 24,
    },
    radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: "white",
        padding: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "5%"
    },
    radioText:{
        color: appSecondaryColor
    },
    radioLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: "#333",
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: appTertiaryColor,
        borderRadius: 40,
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
    }
});