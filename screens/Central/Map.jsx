import React from "react";
import { View, SafeAreaView, Text } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { showLocation } from "react-native-map-link";
import MapStyle from "../../styling/MapStyle";

export default function MapScreen() {
    const latitude = 42.158581;
    const longitude = -80.114944;
    const directionsPreference = "walk";
    const poiStatus = "Open";

    const handleGetDirections = () => {
        getDirections(latitude, longitude, directionsPreference);
    };

    const getDirections = (lat, long, directionsPreference) => {
        showLocation({
            latitude: lat,
            longitude: long,
            appsWhiteList: [],
            googleForceLatLon: true,
            alwaysIncludeGoogle: true,
            naverCallerName: "com.discoverpi.mypi",
            directionsMode: directionsPreference,
        });
    };

    return (
        <SafeAreaView style={MapStyle.container}>
            <View style={MapStyle.container}>
                <MapView
                    style={MapStyle.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 42.158581,
                        longitude: -80.114944,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={{ latitude: 42.158581, longitude: -80.114944 }}>
                        <Callout onPress={handleGetDirections}>
                            <View>
                                <Text style={MapStyle.poiMarkerTitle}>Presque Isle ({poiStatus})</Text>
                                <Text style={MapStyle.poiMarkerDirectionsText}>Get Directions </Text>
                            </View>
                        </Callout>
                    </Marker>

                </MapView>
            </View>
        </SafeAreaView>
    );
}
