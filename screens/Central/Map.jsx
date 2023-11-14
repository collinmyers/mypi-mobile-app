import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyling";
import HomeStyle from "../../styling/HomeStyling";
import AuthStyle from "../../styling/AuthStyling";


import { showLocation } from "react-native-map-link";

export default function MapScreen() {

    // const 

    const latitude = 42.158581;
    const longitude = -80.114944;
    const placeName = "Presque Isle";
    const directionsPreference = "car";

    const handleGetDirections = () => {
        getDirections(latitude, longitude, placeName, directionsPreference);
    };

    return (
        <SafeAreaView style={AppStyle.container}>
            <TouchableOpacity onPress={handleGetDirections} style={HomeStyle.ButtonOpacity}>
                <Text style={AuthStyle.buttonText}>Map</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

function getDirections(lat, long, title, directionsPreference) {

    showLocation({
        latitude: lat,
        longitude: long,
        appsWhiteList: [], // Set an empty array to include all supported apps installed on the device
        title: title,
        googleForceLatLon: false,
        alwaysIncludeGoogle: true,
        naverCallerName: "com.discoverpi.mypi",
        directionsMode: directionsPreference,
    });

}