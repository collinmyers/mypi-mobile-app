import { StyleSheet } from "react-native";
import { appPrimaryColor, appTextColor, appWarningColor } from "../utils/colors/appColors";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appPrimaryColor,
    },
    drawerHeader: {
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "row",
        backgroundColor: appPrimaryColor,
        paddingTop: 40,
        paddingBottom: 10,
    },
    drawerMenuBar: {
        padding: 11,
        marginLeft: 10,
    },
    navBackButton: {
        padding: 10,
        marginRight: 10,
    },
    // Image container for Dashboard
    imageContainer: {
        alignItems: "center",
        top: 10,
        width: "100%",
    },
    snackBar: {
        backgroundColor: appWarningColor,
        color: appTextColor,
        marginBottom: "-8%"
    },
    appHeaderEdit: {
        paddingHorizontal: 16,
        paddingTop: 9.5,
        paddingBottom: 10,
    },
    appHeaderEditDone: {
        padding: 10,
        paddingRight: 17,
        paddingLeft: 15

    },
});
