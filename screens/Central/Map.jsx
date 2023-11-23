import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { showLocation } from "react-native-map-link";
import { Databases, Client } from "appwrite";
import MapStyle from "../../styling/MapStyle";
import { useDirections } from "../../components/Contexts/DirectionProvider";

export default function MapScreen() {

    const { directionsPreference } = useDirections();

    // console.log(directionsPreference);

    const [markers, setMarkers] = useState([]);

    const getMarkers = async () => {

        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const database = new Databases(client);

            let promise = database.listDocuments(
                "653ae4b2740b9f0a5139", //DB ID
                "65565099921adc2d835b", //Collection ID
            );

            promise.then(function (response) {
                for (let index = 0; index < response.documents.length; index++) {
                    let dbLatitude = response.documents[index].Latitude;
                    let dbLongitude = response.documents[index].Longitude;
                    let dbName = response.documents[index].Name;
                    let dbParkStatus = response.documents[index].Status;

                    setMarkers(data => [...data,  //Add document data to array that contains react-native code to render markers
                    <Marker key={index} coordinate={{ latitude: dbLatitude, longitude: dbLongitude }}>
                        <Callout onPress={() => { getDirections(dbLatitude, dbLongitude, directionsPreference); }}>
                            <View>
                                <Text style={MapStyle.poiMarkerTitle}>{dbName} ({dbParkStatus})</Text>
                                <Text style={MapStyle.poiMarkerDirectionsText}>Get Directions </Text>
                            </View>
                        </Callout>
                    </Marker>
                    ]
                    );
                }
            }, function (error) {
                console.error(error); //promise failure
            });
        }

        catch (error) {
            console.error(error); //catch error
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

    useEffect(() => {
        setMarkers([]);    //Empty the data array
        getMarkers();    //Get Events 
    }, []);


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
