import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#134C77",
    },
    drawerHeader: {
        justifyContent:"flex-start",
        alignItems:"flex-start",
        backgroundColor: "#134C77",
        paddingTop: 40,
        paddingBottom: 10,
        paddingLeft: 15
    },
    drawerMenuBar: {
        padding: 10,
        marginLeft: 10,
        alignItems: "left",
    },
    drawerMenuBarContainer: {
        marginLeft: 5
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
