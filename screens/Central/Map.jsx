import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyling";
import HomeStyle from "../../styling/HomeStyling";
import AuthStyle from "../../styling/AuthStyling";
import { showLocation } from "react-native-map-link";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen() {

    let latitude = 42.158581;
    let longitude = -80.114944;
    let directionsPreference = "walk";

    const handleGetDirections = () => {
        getDirections(latitude, longitude, directionsPreference);
    };

    return (
        <SafeAreaView style={AppStyle.container}>

            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 42.158581,
                        longitude: -80.114944,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>

            <View>
                <TouchableOpacity onPress={handleGetDirections} style={HomeStyle.ButtonOpacity}>
                    <Text style={AuthStyle.buttonText}>Map</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView >
    );
}

function getDirections(lat, long, directionsPreference) {

    showLocation({
        latitude: lat,
        longitude: long,
        appsWhiteList: [], // Set an empty array to include all supported apps installed on the device
        googleForceLatLon: true,
        alwaysIncludeGoogle: true,
        naverCallerName: "com.discoverpi.mypi",
        directionsMode: directionsPreference,
    });

}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});