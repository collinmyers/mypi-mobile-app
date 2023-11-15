import { StyleSheet } from "react-native";

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
        color: "#134C77",
        fontWeight: "bold",
    },
    poiMarkerDirectionsText: {
        fontSize: 15,
        color: "#8FA063",
        fontWeight: "bold",
        alignSelf: "center"
    },
});