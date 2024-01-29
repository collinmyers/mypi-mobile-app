import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, TouchableOpacity, Platform } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { showLocation } from "react-native-map-link";
import { database, DATABASE_ID, MAP_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { Query } from "appwrite";
import MapStyle from "../../styling/MapStyle";
import { getNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { appPrimaryColor, appTextColor } from "../../utils/colors/appColors";

export default function MapScreen() {
    const navigation = useNavigation();

    const [markersData, setMarkersData] = useState([]);
    const [filteredMarkers, setFilteredMarkers] = useState([]);

    const [currentNavPreference, setCurrentNavPreference] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [fabVisible, setFabVisible] = useState(false);

    const PAGE_SIZE = 25;

    useEffect(() => {

        // console.log(Platform.OS)

        const fetchData = async () => {
            try {
                let offset = 0;
                let allMarkers = [];

                const response = await database.listDocuments(
                    DATABASE_ID,
                    MAP_COLLECTION_ID,
                    [Query.limit(PAGE_SIZE), Query.offset(offset)]
                );

                while (response.documents.length > 0) {
                    allMarkers = [...allMarkers, ...response.documents];
                    offset += PAGE_SIZE;
                    const nextResponse = await database.listDocuments(
                        DATABASE_ID,
                        MAP_COLLECTION_ID,
                        [Query.limit(PAGE_SIZE), Query.offset(offset)]
                    );
                    response.documents = nextResponse.documents;
                }

                setMarkersData(allMarkers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filterMarkers = () => {
            if (selectedFilters.length === 0) {
                setFilteredMarkers(markersData);
            } else {
                const filtered = markersData.filter(marker => selectedFilters.includes(marker.Type));
                setFilteredMarkers(filtered);
            }
        };

        filterMarkers();
    }, [selectedFilters, markersData]);

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

    useFocusEffect(
        React.useCallback(() => {
            fetchNavPreference();

            if (currentNavPreference !== null) {
                setFilteredMarkers([]);
                setSelectedFilters([]);
            }

        }, [currentNavPreference])
    );

    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter((f) => f !== filter)); // Deselect filter
        } else {
            setSelectedFilters([...selectedFilters, filter]); // Select filter
        }
    };

    const renderMarkers = () => {
        return filteredMarkers.map((marker, index) => (
            <Marker
                key={index}
                coordinate={{ latitude: marker.Latitude, longitude: marker.Longitude }}
                pinColor={getMarkerColor(marker.Type)}
            >
                {Platform.OS === "ios" ? (
                    <Callout>
                        <View>
                            <Text style={MapStyle.poiMarkerTitle}>{marker.Name} ({marker.Status})</Text>
                            <Text style={MapStyle.poiMarkerDirectionsText} onPress={() => {
                                getDirections(marker.Latitude, marker.Longitude, currentNavPreference);
                            }}>
                                Get Directions
                            </Text>
                        </View>
                    </Callout>) : (
                    <Callout onPress={() => {
                        getDirections(marker.Latitude, marker.Longitude, currentNavPreference);
                    }}>
                        <View>
                            <Text style={MapStyle.poiMarkerTitle}>{marker.Name} ({marker.Status})</Text>
                            <Text style={MapStyle.poiMarkerDirectionsText}>Get Directions</Text>
                        </View>
                    </Callout>
                )}
            </Marker>
        ));
    };

    const getMarkerColor = (poiType) => {
        switch (poiType) {
            case "Beach":
                return "#FF0000";
            case "Attraction":
                return "#FFC000";
            case "Restroom":
                return "#3399FF";
            case "Parking":
                return "#D2691E";
            case "Information":
                return "#33CC33";
            case "Amenities":
                return "#9966CC";
            default:
                return "#000000";
        }
    };

    const renderFilterCheckboxes = () => {
        const filterAliases = {
            "Amenities": "Amenities",
            "Attraction": "Attractions",
            "Beach": "Beaches",
            "Information": "Information",
            "Parking": "Parking",
            "Restroom": "Restrooms",
        };

        return Object.keys(filterAliases).map((filter) => (
            <View key={filter} style={MapStyle.checkboxContainer}>
                <Checkbox
                    value={selectedFilters.includes(filter)}
                    onValueChange={() => toggleFilter(filter)}
                    color={appPrimaryColor}
                />
                <Text style={MapStyle.checkboxText}>{filterAliases[filter]}</Text>
            </View>
        ));
    };

    const toggleFabVisible = () => {
        setFabVisible(!fabVisible);
    };

    return (
        <SafeAreaView style={MapStyle.container}>

            <TouchableOpacity style={MapStyle.changeMapOpac} onPress={() => { navigation.navigate("MapList"); }}>
                <Text style={MapStyle.changeMapText}>View as List</Text>
            </TouchableOpacity>

            <MapView
                style={MapStyle.map}
                initialRegion={{
                    latitude: 42.158581,
                    longitude: -80.1079,
                    latitudeDelta: 0.115,
                    longitudeDelta: 0.0421,
                }}>
                {renderMarkers()}
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
