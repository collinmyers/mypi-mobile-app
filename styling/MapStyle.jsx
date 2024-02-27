import { StyleSheet, Dimensions } from "react-native";
import { appPrimaryColor, appSecondaryColor, appTertiaryColor, appTextColor } from "../utils/colors/appColors";

const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    poiMarkerTitle: {
        fontSize: 15,
        color: appSecondaryColor,
        fontWeight: "bold",
    },
    poiMarkerDirectionsText: {
        fontSize: 15,
        color: appTertiaryColor,
        fontWeight: "bold",
        alignSelf: "center"
    },
    changeMapOpac: {
        fontSize: 20,
        marginTop: "2%",
        padding: 10,
        borderRadius: 20,
        zIndex: 1,
        backgroundColor: appTertiaryColor,
    },
    changeMapText: {
        color: appTextColor,
        fontSize: 18
    },
    changeListOpac: {
        fontSize: 20,
        marginTop: "2%",
        marginBottom: "3%",
        padding: 10,
        borderRadius: 20,
        zIndex: 1,
        backgroundColor: appTertiaryColor,
    },
    changeListText: {
        color: appTextColor,
        fontSize: 18
    },
    poiCard: {
        width: deviceWidth * .9,
        marginBottom: "5%",
        backgroundColor: appSecondaryColor,
    },
    poiCardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    poiListTitle: {
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 18,
        color: appTextColor,
        flexShrink: 1
    },
    poiListLatLon: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 14,
        color: appTextColor,
        marginVertical: "1%"
    },
    poiListStatus: {
        fontSize: 14,
        color: appTextColor
    },
    poiContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appPrimaryColor,
    },
    scrollableView: {
        flexGrow: 1,
        // justifyContent: "space",
        backgroundColor: appPrimaryColor,
        paddingTop: 10
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 16,
        color: appSecondaryColor
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: appTertiaryColor, 
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
    },
    filterOptionsContainer: {
        position: "absolute",
        bottom: 100,
        right: 20,
        backgroundColor: appPrimaryColor,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: appSecondaryColor,
        padding: 10,
        elevation: 8,
    },
    mapSearchBar: {
        width: "90%",
        marginBottom: "3%",
        backgroundColor: appSecondaryColor,
        color: appTextColor
    },
    directionsIcon: {

    }
});

