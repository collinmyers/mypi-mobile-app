import { StyleSheet } from "react-native";

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
        zIndex:0,
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
    changeButton:{
        fontSize: 20,
        paddingVertical:10,
        color: appWhite,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
        textAlign:"center",
        flexDirection:"column",
        zIndex:1
    },

});