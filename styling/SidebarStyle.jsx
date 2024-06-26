import { StyleSheet } from "react-native";
import { appPrimaryColor, appTertiaryColor, appSecondaryColor, appQuarternaryColor } from "../utils/colors/appColors";


export default StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appPrimaryColor,
    },
    dropdrop: {
        alignSelf: "center",
        justifyContent: "center",
        width: "60%",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: appQuarternaryColor,
        backgroundColor: appPrimaryColor,
        marginBottom: "5%"
    },
    dropdownLabel: {
        fontSize: 24,
        fontWeight: 600,
        color: appTertiaryColor,
        textAlign: "center",
        marginBottom: "2%",
        alignSelf: "center"
    },
    pointContainer: {
        width: "97%",
        marginHorizontal: "1%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "2.5%",
        backgroundColor: appPrimaryColor,
        justifyContent: "center",
    },
    pointTitleView: {
        flex: 1,
        marginHorizontal: "1%",
        marginVertical: "2%"
    },
    pointTitle: {
        fontWeight: "700",
        fontSize: 18,
        color: appSecondaryColor,
        marginLeft: "1%"
    },
    removePoint: {
        flexDirection: "row",
        marginLeft: "1%",
        justifyContent: "center",
        alignItems: "center"
    },
    trashIcon: {
        paddingHorizontal: "3%",
        marginRight: "1%"
    },
    deleteModalContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    fab: {
        backgroundColor: appTertiaryColor,
        borderRadius: 40,
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        elevation: 8,
        marginTop: "4%"
    },
    addPointView: {
        alignSelf: "center",
    },
    multiFABContainer: {
        flexDirection: "row",
        marginBottom: "100%",
        width: "100%",
        justifyContent: "center",
        alignSelf: "center"
    },
    cancelFAB: {
        backgroundColor: appTertiaryColor,
        borderRadius: 40,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignSelf: "center",
        elevation: 8,
        marginRight: "2%"
    },
    shareFAB: {
        backgroundColor: appSecondaryColor,
        borderRadius: 40,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        elevation: 8,
        marginLeft: "2%",
        marginRight: "1%"
    },
    noMessage: {
        textAlign: "center",
        color: appSecondaryColor,
        fontWeight: 600,
        fontSize: 20,
        marginBottom: "5%"
    },
});