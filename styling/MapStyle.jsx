import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;


const appBlue = "#134C77";
const appGreen = "#8FA063";
const appWhite = "#FFFFFF";

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
        color: appBlue,
        fontWeight: "bold",
    },
    poiMarkerDirectionsText: {
        fontSize: 15,
        color: appGreen,
        fontWeight: "bold",
        alignSelf: "center"
    },
    changeButton: {
        fontSize: 20,
        margin: "5%",
        padding: 10,
        borderRadius: 40,
        color: appWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
        textAlign: "center",
        flexDirection: "column",
        zIndex: 1,
        backgroundColor: appGreen
    },
    poiCard: {
        width: deviceWidth * .9,
        marginBottom: deviceWidth * .1,
        backgroundColor: appGreen,
    },
    poiCardContent: {

    },
    poiListTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: appWhite
    },
    poiListLatLon: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 14,
        color: appWhite,
        marginVertical: "1%"
    },
    poiListStatus: {
        fontSize: 14,
        color: appWhite
    },
    poiContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appBlue,
    },
    scrollableView: {
        flexGrow: 1,
        justifyContent: "space",
        backgroundColor: appBlue
    },

});