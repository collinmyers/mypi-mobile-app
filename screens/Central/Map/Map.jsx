import * as Network from "expo-network";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import { ActivityIndicator, Snackbar, Text } from "react-native-paper";
import MapView, { Callout, Marker } from "react-native-maps";
import { showLocation } from "react-native-map-link";
import { database, DATABASE_ID, MAP_COLLECTION_ID, BUNDLER_PACKAGE_IDENTIFIER } from "../../../utils/Config/config";
import { Query } from "appwrite";
import MapStyle from "../../../styling/MapStyle";
import { getNavigationPreference } from "../../../utils/AsyncStorage/NavigationPreference";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { subscribeToRealTimeUpdates } from "../../../utils/Config/config";
import { appPrimaryColor, appSecondaryColor, appTertiaryColor, appTextColor } from "../../../utils/colors/appColors";
import * as FileSystem from "expo-file-system";
import { useNetwork } from "../../../components/context/NetworkContext";
import { useAppState } from "../../../components/context/AppStateContext";
import AppStyle from "../../../styling/AppStyle";

export default function MapScreen() {
    const navigation = useNavigation();

    const { isInternetReachable } = useNetwork();
    const { isAppActive } = useAppState();
    const [markersData, setMarkersData] = useState([]);
    const [filteredMarkers, setFilteredMarkers] = useState([]);
    const [currentNavPreference, setCurrentNavPreference] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [fabVisible, setFabVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessageShown, setErrorMessageShown] = useState(false);
    const [prevEmptyCategories, setPrevEmptyCategories] = useState([]);
    const [fetchingFinished, setFetchFinished] = useState(false);
    const PAGE_SIZE = 25;


    useEffect(() => {
        if (markersData.length > 0 || fetchingFinished) {
            setIsLoading(false);
        }
    }, [markersData.length, fetchingFinished]);

    useFocusEffect(React.useCallback(() => {

        const handleSubscription = () => {
            checkNetworkConnectivityAndFetchData();
        };
        // Subscribe to real-time updates
        const unsubscribe = subscribeToRealTimeUpdates(handleSubscription, MAP_COLLECTION_ID);

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

                allMarkers.map((marker) => {
                    delete marker.$createdAt;
                    delete marker.$id;
                    delete marker.$collectionId;
                    delete marker.$databaseId;
                    delete marker.$permissions;
                    delete marker.$updatedAt;
                });

                setMarkersData(allMarkers);
                await saveDataToFile(allMarkers); // Save fetched data to file
                setFetchFinished(true);
            } catch (error) {
                console.error(error);
            }
        };
        const saveDataToFile = async (data) => {
            try {
                const fileUri = FileSystem.documentDirectory + "markersData.json";
                await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                console.log("Data saved to file:", fileUri);
            } catch (error) {
                console.error("Error saving data to file: ", error);
            }
        };

        const loadDataFromFile = async () => {
            try {
                const fileUri = FileSystem.documentDirectory + "markersData.json";
                const fileContents = await FileSystem.readAsStringAsync(fileUri);
                const data = JSON.parse(fileContents);
                setMarkersData(data);
            } catch (error) {
                console.error("Error reading data from file: ", error);
            }
        };

        const checkNetworkConnectivityAndFetchData = async () => {
            try {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                    fetchData(); // Fetch data from appwrite if connected
                }
            } catch (error) {
                console.error("Error checking network connectivity: ", error);
            }
        };

        // Check if data is available offline
        FileSystem.getInfoAsync(FileSystem.documentDirectory + "markersData.json")
            .then(({ exists }) => {
                if (exists) {
                    loadDataFromFile(); // Load data from file if available
                } else {
                    fetchData(); // Fetch data from network if not available
                }
            })
            .catch(error => console.error("Error checking file: ", error));

        // Check network connectivity and fetch data if connected
        checkNetworkConnectivityAndFetchData();

        // Cleanup function
        return () => {
            unsubscribe();
        };

    }, [isInternetReachable, isAppActive]));

    useEffect(() => {
        const filterMarkers = () => {
            if (selectedFilters.length === 0) {
                setFilteredMarkers(markersData);
                setErrorMessage("");
                setIsSnackbarVisible(false);
                setErrorMessageShown(false); // Reset the error message shown flag
            } else {
                const filteredCategories = [];
                const emptyCategories = [];

                selectedFilters.forEach((filter) => {
                    const filtered = markersData.filter((marker) => marker.Type === filter);
                    if (filtered.length > 0) {
                        filteredCategories.push(...filtered);
                    } else {
                        emptyCategories.push(filter);
                    }
                });

                if (emptyCategories.length > 0) {
                    const emptyCategoriesText = emptyCategories
                        .map((category) => {
                            const categoryAlias = {
                                Amenities: "Amenities",
                                Attraction: "Attractions",
                                Beach: "Beaches",
                                FoodTruck: "Food Trucks",
                                Information: "Information",
                                Parking: "Parking",
                                Restroom: "Restrooms",
                            };
                            return categoryAlias[category];
                        })
                        .join(", ");

                    const lastCategory = emptyCategories[emptyCategories.length - 1];
                    const isSingular = emptyCategories.length === 1 && (emptyCategories[0] === "Information" || emptyCategories[0] === "Parking");
                    const isLastElementInformationOrParking = lastCategory === "Information" || lastCategory === "Parking";
                    const verb = isSingular || isLastElementInformationOrParking ? "is" : "are";

                    const newErrorMessage = `No ${emptyCategoriesText} ${verb} available, please check back later.`;

                    if (!errorMessageShown || emptyCategories.some((category) => !prevEmptyCategories.includes(category))) {
                        setErrorMessage(newErrorMessage);
                        setIsSnackbarVisible(true);
                        setErrorMessageShown(true);
                        setPrevEmptyCategories(emptyCategories);
                    }
                } else {
                    setErrorMessage("");
                    setIsSnackbarVisible(false);
                    setErrorMessageShown(false); // Reset the error message shown flag
                }

                setFilteredMarkers(filteredCategories);
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
            naverCallerName: BUNDLER_PACKAGE_IDENTIFIER,
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
            case "FoodTruck":
                return "#FF00CE";
            default:
                return "#000000";
        }
    };

    const renderFilterCheckboxes = () => {
        const filterAliases = {
            "Amenities": "Amenities",
            "Attraction": "Attractions",
            "Beach": "Beaches",
            "FoodTruck": "Food Trucks",
            "Information": "Information",
            "Parking": "Parking",
            "Restroom": "Restrooms",
        };

        return Object.keys(filterAliases).map((filter) => (
            <View key={filter} style={MapStyle.checkboxContainer}>
                <Checkbox
                    value={selectedFilters.includes(filter)}
                    onValueChange={() => toggleFilter(filter)}
                    color={appTertiaryColor}
                />
                <Text style={MapStyle.checkboxText}>{filterAliases[filter]}</Text>
            </View>
        ));
    };

    useEffect(() => {
        if (markersData.length < 1 & !isLoading) {
            setErrorMessage("No available points of interest at this time");
            setIsSnackbarVisible(true);
        }
    }, [markersData]);

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
                onMapReady={() => setIsLoading(false)}
                initialRegion={{
                    latitude: 42.158581,
                    longitude: -80.1079,
                    latitudeDelta: 0.085,
                    longitudeDelta: 0.115,
                }}
            >
                {markersData.length > 0 ? renderMarkers() : (null)}
            </MapView>

            <TouchableOpacity style={MapStyle.fab} onPress={toggleFabVisible}>
                <AntDesign name="filter" size={28} color={appPrimaryColor} />
            </TouchableOpacity>

            {isLoading && (<ActivityIndicator style={MapStyle.mapLoadingIndicator} animating={true} color={appSecondaryColor} size="large" />)}

            {fabVisible && (
                <View style={MapStyle.filterOptionsContainer}>
                    {renderFilterCheckboxes()}
                </View>
            )}

            <Snackbar
                visible={isSnackbarVisible}
                maxFontSizeMultiplier={1}
                style={[AppStyle.snackBar, { backgroundColor: appSecondaryColor }]}
                onDismiss={() => {
                    setIsSnackbarVisible(false);
                    setErrorMessage(""); // Clear the error message
                }}
                action={{
                    textColor: appTextColor,
                    label: "Close",
                }}
                duration={5000}
            >
                {errorMessage}
            </Snackbar>
        </SafeAreaView>
    );
}
