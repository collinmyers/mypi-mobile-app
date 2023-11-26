import React, { useState } from "react";
import { View, SafeAreaView, Text } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { showLocation } from "react-native-map-link";
import { Databases, Client } from "appwrite";
import MapStyle from "../../styling/MapStyle";
import { getNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";
import { useFocusEffect } from "@react-navigation/native";

export default function MapScreen() {
    const [markers, setMarkers] = useState([]);
    const [currentNavPreference, setCurrentNavPreference] = useState(null);

    const getMarkers = async (directionsPreference) => {
        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const database = new Databases(client);

            let promise = database.listDocuments(
                "653ae4b2740b9f0a5139", // DB ID
                "65565099921adc2d835b" // Collection ID
            );

            promise.then(
                function (response) {
                    const newMarkers = response.documents.map((doc, index) => {
                        const dbLatitude = doc.Latitude;
                        const dbLongitude = doc.Longitude;
                        const dbName = doc.Name;
                        const dbParkStatus = doc.Status;

                        return (
                            <Marker
                                key={index}
                                coordinate={{ latitude: dbLatitude, longitude: dbLongitude }}
                            >
                                <Callout
                                    onPress={() => {
                                        getDirections(
                                            dbLatitude,
                                            dbLongitude,
                                            directionsPreference
                                        );
                                    }}
                                >
                                    <View>
                                        <Text style={MapStyle.poiMarkerTitle}>
                                            {dbName} ({dbParkStatus})
                                        </Text>
                                        <Text style={MapStyle.poiMarkerDirectionsText}>
                                            Get Directions{" "}
                                        </Text>
                                    </View>
                                </Callout>
                            </Marker>
                        );
                    });

                    setMarkers(newMarkers);
                },
                function (error) {
                    console.error(error); // Promise failure
                }
            );
        } catch (error) {
            console.error(error); // Catch error
        }
    };

    const getDirections = (lat, long, directionsPreference) => {

        // console.log("directions preference: " + directionsPreference);

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

    const fetchNavPreference = async () => {
        try {
            const preference = await getNavigationPreference();

            setCurrentNavPreference(preference);
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchNavPreference();
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (currentNavPreference !== null) {
                setMarkers([]); // Empty the data array
                getMarkers(currentNavPreference); // Get Events
            }
        }, [currentNavPreference])
    );

    return (
        <SafeAreaView style={MapStyle.container}>
            <View style={MapStyle.container}>
                <MapView
                    style={MapStyle.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 42.158581,
                        longitude: -80.1079,
                        latitudeDelta: 0.115,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {markers}
                </MapView>
            </View>
        </SafeAreaView>
    );
}
