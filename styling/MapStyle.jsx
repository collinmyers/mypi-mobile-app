import { StyleSheet } from "react-native";

const appBlue = "#134C77";
const appGreen = "#8FA063";

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
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
});