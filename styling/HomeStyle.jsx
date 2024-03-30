import { Dimensions, Platform, StyleSheet } from "react-native";
import { appPrimaryColor, appQuarternaryColor, appSecondaryColor, appTertiaryColor, appTextColor, appWarningColor } from "../utils/colors/appColors";

let fontSizeAlert = 16;

if (Platform.OS === "android") {
    fontSizeAlert = 13;
}

const deviceWidth = Dimensions.get("window").width;
const cardWidth = deviceWidth * .90;
const buttonWidth = deviceWidth * .40;

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
        margin: "2%",
        marginBottom: "5%",
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
        color: appQuarternaryColor,
        fontSize: 24,
        marginBottom: 20,
    },
    parkInfoText: {
        textAlign: "center",
        color: appSecondaryColor,
        fontSize: 14,
        marginBottom: 20,
    },
    settingsCard: {
        backgroundColor: appSecondaryColor,
        width: cardWidth,
        marginBottom: 10,
        borderWidth: .75,
        borderColor: appQuarternaryColor
    },
    settingsCardContent: {
        flexDirection: "row",
        borderTopColor: appSecondaryColor,
        width: "100%",
        alignItems: "center",
    },
    settingsSectionHeader: {
        color: appQuarternaryColor,
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
    ClickableSettingsOption: {
        width: "87%",
    },
    clickableRow: {
        flexDirection: "row",
        justifyContent: "center"
    },
    clickableRowToggle: {
        flexDirection: "row",
        alignSelf: "baseline",
        justifyContent: "center",
        marginLeft: "6%",
        marginRight: "2%"
    },
    changeInfoText: {
        color: appTextColor,
        marginLeft: "15%",
        marginVertical: "1%",
        width: "87%",
        fontSize: 20,
        alignSelf: "center"
    },
    toggle: {
        margin: "1%",
        ...Platform.select({
            android: {
                alignSelf: "center",
                height: 33
            },
        }),
    },
    touchableOptionArea: {
        width: "100%",
        marginLeft: "10%",
        marginVertical: "2%",
        paddingBottom: "1%",
        borderBottomWidth: .25,
        borderBottomColor: appQuarternaryColor
    },
    settingOptionView: {
        flexDirection: "row",
        borderBottomColor: appPrimaryColor,
        borderBottomWidth: 1
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
        justifyContent: "center",
        width: "100%"
    },
    modalCancelButton: {
        paddingHorizontal: 25,
        marginVertical: 10,
        marginRight: "5%",
        padding: 10,
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        flexDirection: "column",
        backgroundColor: appQuarternaryColor,
    },
    modalDeleteButton: {
        paddingHorizontal: 20,
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
        borderWidth: 1.25,
        borderColor: appQuarternaryColor
    },
    eventCardContent: {

    },
    eventListImage: {
        aspectRatio: 1.5,
        borderRadius: 5,
        marginBottom: "5%",
        resizeMode: "cover",
        width: "100%",
        borderWidth: .75,
        borderColor: appQuarternaryColor
    },
    eventListTitle: {
        fontWeight: "600",
        fontSize: 18,
        color: appTextColor
    },
    eventListDate: {
        textAlign: "left",
        fontWeight: "600",
        fontSize: 14,
        color: appTertiaryColor,
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
        margin: "5%",
        borderWidth: 1.25,
        borderColor: appQuarternaryColor
    },
    updateAccountCardContent: {
        alignItems: "center"
    },

    updateAccountTitle: {
        fontSize: 30,
        color: appTertiaryColor,
        fontWeight: "500",
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
        backgroundColor: appQuarternaryColor,
        borderWidth: .20,
        borderColor: "#004466"
    },
    updateAccountButtonText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 15
    },
    eventDetailsCard: {
        alignSelf: "center",
        width: "97%",
        padding: 10,
        paddingBottom: 0,
        backgroundColor: appSecondaryColor,
        marginBottom: "15%",
        borderWidth: 1.25,
        borderColor: appQuarternaryColor
    },
    eventDetailsCardContent: {
        alignItems: "center",
    },
    eventDetailsTitle: {
        color: appTextColor,
        fontWeight: "600",
        fontSize: 24,
        textAlign: "center"
    },
    eventDetailsDateTime: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "600",
        color: appTertiaryColor,
        marginTop: "1%"
    },
    eventDetailsImage: {
        alignSelf: "center",
        aspectRatio: 1.5,
        borderRadius: 5,
        marginBottom: "7%",
        resizeMode: "cover",
        width: "100%",
        borderWidth: .75,
        borderColor: appQuarternaryColor
    },
    eventDetailsDescription: {
        color: appTextColor,
        fontSize: 16
    },
    homeButtonOpacity: {
        backgroundColor: appQuarternaryColor,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginVertical: "10%",
        marginBottom: 0,
        fontSize: 20,
        borderRadius: 20,
        color: appTextColor,
        overflow: "hidden",
        borderWidth: .20,
        borderColor: "#004466"
    },
    homeButtonText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 15,
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
        backgroundColor: appQuarternaryColor,
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
        marginBottom: "2%",
    },
    alertButton: {
        backgroundColor: appQuarternaryColor,
        borderRadius: 25,
        marginTop: "2%",
        marginHorizontal: "1%",
        borderWidth: .25,
        borderColor: appSecondaryColor
    },
    alertButtonText: {
        color: appTextColor,
        textAlign: "center",
        marginHorizontal: "4%",
        fontSize: fontSizeAlert
    },
    alertCard: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: appTertiaryColor,
        backgroundColor: appPrimaryColor,
    },
    alertCardContent: {
        flex: 1,
        marginHorizontal: "1%",
        marginVertical: "2%"
    },
    notificationEditIconsTrue: {
        paddingRight: "5%"
    },
    notificationEditIconsFalse: {
        paddingRight: "3.9%"
    },
    alertListTitle: {
        fontWeight: "700",
        fontSize: 18,
        color: appSecondaryColor
    },
    alertListDetails: {
        fontSize: 14,
        color: appSecondaryColor
    },
    alertListTypeDesc: {
        fontSize: 12,
        fontStyle: "italic",
        color: appTextColor
    },
    dashboardDonoOpac: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        width: deviceWidth * .47,
        marginVertical: "5%",
        paddingVertical: "2.5%",
        margin: "5%",
        borderRadius: 20,
        color: appTextColor,
        textAlign: "center",
        backgroundColor: appSecondaryColor,
        borderWidth: 1.25,
        borderColor: appQuarternaryColor
    },
    dashboardDonoText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 24,
        paddingLeft: "5%"
    },
    navBackButton: {


    },
    pushNotifOpac: {
        alignSelf: "center",
        justifyContent: "center",
        width: buttonWidth,
        paddingVertical: 10,
        borderRadius: 20,
        textAlign: "center",
        backgroundColor: appQuarternaryColor,
        borderWidth: .25,
        borderColor: appSecondaryColor
    },
    pushNotifText: {
        color: appTextColor,
        textAlign: "center",
        fontSize: 20,
    },
    radioGroup: {
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "2%",
        borderRadius: 8,
        backgroundColor: "white",
        padding: 16,
    },
    radioButtons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: "2%",
        marginBottom: "5%",
    },

    radioText: {
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
    },
    noNotificationsMessage: {
        color: appSecondaryColor,
        fontWeight: 600,
        fontSize: 20
    },
    pushRadioText: {
        color: appSecondaryColor,
        alignSelf: "center",
        flex: 1,
        fontSize: 16, // Adjust the font size as needed
        marginLeft: 8, // Add margin to the left of the text
    },
    notificationTypeRadioText: {
        color: appSecondaryColor
    },
    radioTitle: {
        textAlign: "center",
        color: appSecondaryColor,
        marginBottom: 8,
        fontSize: 20,
        fontWeight: "600"
    },
    radio: {
        flexDirection: "row",
        justifyContent: "center", // Center the buttons horizontally
        alignItems: "center", // Align items vertically
        width: "30%",
    },
    notificatonMessage: {
        backgroundColor: "#FFFFFF",
    },
    settingsRadio: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "5%"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
    },
    scrollableViewNotifications: {
        marginBottom: "5%",
        backgroundColor: appPrimaryColor
    },
    notificationAgeContainer: {
        alignItems: "center",
        marginHorizontal: "2%"
    },
    notificationAge: {
        fontWeight: 400,
        color: appQuarternaryColor
    },
    manageNotification: {
        flexDirection: "row",
        marginLeft: "1%",
        justifyContent: "center",
        alignItems: "center"

    },
    manageEdit: {
        paddingHorizontal: "3%",
        marginHorizontal: "1%",
    },
    manageDelete: {
        paddingHorizontal: "3%",
        marginRight: "1%"
    },
    deleteNotificationsButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "90%"
    },
    imageCarousel: {
        marginVertical: "1%"
    },
    pageDots: {
        marginBottom: "5%",
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: appPrimaryColor,
        marginHorizontal: 4,
    }
});
