import React, { useState } from "react";
import { View, SafeAreaView, Text } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { showLocation } from "react-native-map-link";
import { Databases, Client } from "appwrite";
import MapStyle from "../../styling/MapStyle";
import { getNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";


export default function MapScreen() {

    const navigation = useNavigation();

    const [markers, setMarkers] = useState([]);
    const [currentNavPreference, setCurrentNavPreference] = useState(null);

    const getMarkers = async (directionsPreference) => {

        setCurrentNavPreference(directionsPreference); // Forcing update to marker direction preference if user changes preference
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
                        const poiLatitude = doc.Latitude;
                        const poiLongitude = doc.Longitude;
                        const poiName = doc.Name;
                        const poiParkStatus = doc.Status;

                        return (
                            <Marker
                                key={index}
                                coordinate={{ latitude: poiLatitude, longitude: poiLongitude }}
                            >
                                <Callout onPress={() => {
                                    getDirections(poiLatitude, poiLongitude, directionsPreference);
                                }}
                                >
                                    <View>
                                        <Text style={MapStyle.poiMarkerTitle}>
                                            {poiName} ({poiParkStatus})
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
                    console.error(error);
                }
            );
        } catch (error) {
            console.error(error);
        }
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

    const fetchNavPreference = async () => {
        try {
            const preference = await getNavigationPreference();

            setCurrentNavPreference(preference);
        } catch (error) {
            console.error(error);
        }
    };

    // Two useFocusEffects required for directionsPreference to be set properly on change

    useFocusEffect(
        React.useCallback(() => {
            fetchNavPreference();
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            if (currentNavPreference !== null) {
                setMarkers([]); // Empty the data array before updating
                getMarkers(currentNavPreference); // Get POI markers
            }
        }, [currentNavPreference])
    );

    return (
        <SafeAreaView style={MapStyle.container}>
            <Text style={MapStyle.changeButton} onPress={() => { navigation.navigate("MapList"); }}>View as List</Text>
    
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
        </SafeAreaView>
    );
}
