import React, { useState } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { showLocation } from "react-native-map-link";
import { Databases, Client, Query } from "appwrite";
import MapStyle from "../../styling/MapStyle";
import { getNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";

export default function MapScreen() {
    const navigation = useNavigation();

    const [markers, setMarkers] = useState([]);
    const [currentNavPreference, setCurrentNavPreference] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const [fabVisible, setFabVisible] = useState(false);

    const PAGE_SIZE = 25;
    const appTextColor = "#FFFFFF";
    const appSecondaryColor = "#8FA063";
    const appPrimaryColor = "#134C77";


    const getMarkers = async (directionsPreference, filters) => {
        setCurrentNavPreference(directionsPreference);

        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const database = new Databases(client);
            let offset = 0;
            let allMarkers = [];

            const fetchPage = async (offset) => {
                const response = await database.listDocuments(
                    "653ae4b2740b9f0a5139", // DB ID
                    "65565099921adc2d835b", // Collection ID
                    [Query.limit(PAGE_SIZE), Query.offset(offset)]
                );

                const newMarkers = response.documents.map((doc, index) => {
                    const poiLatitude = doc.Latitude;
                    const poiLongitude = doc.Longitude;
                    const poiName = doc.Name;
                    const poiParkStatus = doc.Status;
                    const poiType = doc.Type;
                    const key = `${doc.id}_${offset + index}`;

                    if (filters.length > 0 && !filters.includes(poiType)) {
                        return null; // Skip this marker if it doesn't match any selected filter
                    }

                    let markerColor = "#000000";

                    switch (poiType) {
                        case "Beach":
                            markerColor = "#FF0000";
                            break;
                        case "Attraction":
                            markerColor = "#FFC000";
                            break;
                        case "Restroom":
                            markerColor = "#3399FF";
                            break;
                        case "Parking":
                            markerColor = "#D2691E";
                            break;
                        case "Information":
                            markerColor = "#33CC33";
                            break;
                        case "Amenities":
                            markerColor = "#9966CC";
                            break;
                        default:
                            break;
                    }

                    return (
                        <Marker
                            key={key}
                            coordinate={{ latitude: poiLatitude, longitude: poiLongitude }}
                            pinColor={markerColor}
                        >
                            <Callout>
                                <View>
                                    <Text style={MapStyle.poiMarkerTitle}>{poiName} ({poiParkStatus})</Text>
                                    <Text style={MapStyle.poiMarkerDirectionsText} onPress={() => {
                                        getDirections(poiLatitude, poiLongitude, directionsPreference);
                                    }}
                                    >
                                        Get Directions
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    );
                });

                allMarkers = [...allMarkers, ...newMarkers.filter((marker) => marker)]; // Filter out null markers

                if (response.documents.length === PAGE_SIZE) {
                    await fetchPage(offset + PAGE_SIZE);
                }
            };

            await fetchPage(offset);

            setMarkers(allMarkers);
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

    useFocusEffect(React.useCallback(() => {
        fetchNavPreference();
    }, []));

    useFocusEffect(
        React.useCallback(() => {
            if (currentNavPreference !== null) {
                setMarkers([]);
                getMarkers(currentNavPreference, selectedFilters);
            }
        }, [currentNavPreference, selectedFilters])
    );

    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((f) => f !== filter)); // Deselect filter
        } else {
            setSelectedFilters([...selectedFilters, filter]); // Select filter
        }
    };

    const renderFilterCheckboxes = () => {
        const filterTypes = ["Amenities", "Attraction", "Beach", "Information", "Parking", "Restroom"];

        return filterTypes.map((filter) => (
            <View key={filter} style={MapStyle.checkboxContainer}>
                <Checkbox
                    value={selectedFilters.includes(filter)}
                    onValueChange={() => toggleFilter(filter)}
                    color={appPrimaryColor}
                />
                <Text style={MapStyle.checkboxText}>{filter}</Text>
            </View>
        ));
    };

    const toggleFabVisible = () => {
        setFabVisible(!fabVisible);
    };

    return (
        <SafeAreaView style={MapStyle.container}>
            <Text style={MapStyle.changeButtonMap} onPress={() => { navigation.navigate("MapList"); }}>
                View as List
            </Text>

            <MapView
                style={MapStyle.map}
                initialRegion={{
                    latitude: 42.158581,
                    longitude: -80.1079,
                    latitudeDelta: 0.115,
                    longitudeDelta: 0.0421,
                }}>
                {markers}
            </MapView>

            <TouchableOpacity style={MapStyle.fab} onPress={toggleFabVisible}>
                <AntDesign name="filter" size={26} color={appTextColor} />
            </TouchableOpacity>

            {fabVisible && (
                <View style={MapStyle.filterOptionsContainer}>
                    {renderFilterCheckboxes()}
                </View>
            )}
        </SafeAreaView>
    );
}
