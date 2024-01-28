import { StyleSheet } from "react-native";
import { appPrimaryColor } from "../utils/colors/appColors";

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
        padding: 10,
        marginLeft: 10,
    },
    navBackButton: {
        padding: 10,
        marginRight: 10,
    },
    // Image container for Dashboard
    imageContainer: {
        alignItems: "center",
        position: "absolute",
        top: 10,
        width: "100%",
    },
    // Image for Dashboard
    image: {
        width: 400,
        height: 200,
    },
});
