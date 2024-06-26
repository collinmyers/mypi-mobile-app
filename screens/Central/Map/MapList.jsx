import * as Network from "expo-network";
import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, Pressable, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Card, Searchbar, Text } from "react-native-paper";
import { database, DATABASE_ID, MAP_COLLECTION_ID, BUNDLER_PACKAGE_IDENTIFIER } from "../../../utils/Config/config";
import { Query } from "appwrite";
import { useNavigation } from "@react-navigation/native";
import MapStyle from "../../../styling/MapStyle";
import HomeStyle from "../../../styling/HomeStyle";
import { getNavigationPreference } from "../../../utils/AsyncStorage/NavigationPreference";
import { showLocation } from "react-native-map-link";
import { FontAwesome5 } from "@expo/vector-icons";
import { appSecondaryColor, appTertiaryColor, appTextColor } from "../../../utils/colors/appColors";
import { subscribeToRealTimeUpdates } from "../../../utils/Config/config";
import * as FileSystem from "expo-file-system";
import { useNetwork } from "../../../components/context/NetworkContext";
import { useAppState } from "../../../components/context/AppStateContext";

export default function MapList() {
    const PAGE_SIZE = 25;

    const navigation = useNavigation();

    const { isAppActive } = useAppState();
    const { isInternetReachable } = useNetwork();
    const [pointData, setPointData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCards, setFilteredCards] = useState([]);
    const [filterOn, setFilterOn] = useState(false);
    const [currentNavPreference, setCurrentNavPreference] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchingFinished, setFetchFinished] = useState(false);
    const [message, setMessage] = useState("");


    useEffect(() => {
        if (pointData.length > 0) {
            setIsLoading(false);
            setMessage("");
        } else if (pointData.length === 0 && fetchingFinished) {
            setIsLoading(false);
            setMessage("No points of interest available");
        }
    }, [pointData.length, fetchingFinished]);

    useEffect(() => {
        fetchNavPreference();

        const handleSubscription = () => {
            checkNetworkConnectivityAndFetchData();
        };

        const unsubscribe = subscribeToRealTimeUpdates(handleSubscription, MAP_COLLECTION_ID);

        const fetchData = async () => {
            try {
                let offset = 0;
                let allPoints = [];

                const response = await database.listDocuments(
                    DATABASE_ID,
                    MAP_COLLECTION_ID,
                    [Query.limit(PAGE_SIZE), Query.offset(offset)]
                );

                while (response.documents.length > 0) {
                    allPoints = [...allPoints, ...response.documents];
                    offset += PAGE_SIZE;
                    const nextResponse = await database.listDocuments(
                        DATABASE_ID,
                        MAP_COLLECTION_ID,
                        [Query.limit(PAGE_SIZE), Query.offset(offset)]
                    );
                    response.documents = nextResponse.documents;
                }

                allPoints.sort((a, b) => { // Sort in the correct alphabetical order
                    const nameA = a.Name.toLowerCase();
                    const nameB = b.Name.toLowerCase();

                    const splitA = nameA.match(/(\D+|\d+)/g);
                    const splitB = nameB.match(/(\D+|\d+)/g);

                    for (let i = 0; i < Math.max(splitA.length, splitB.length); i++) {
                        if (i >= splitA.length) return -1;
                        if (i >= splitB.length) return 1;

                        const partA = splitA[i];
                        const partB = splitB[i];

                        if (!isNaN(partA) && !isNaN(partB)) {
                            const numA = parseInt(partA);
                            const numB = parseInt(partB);
                            if (numA !== numB) {
                                return numA - numB;
                            }
                        } else {
                            if (partA !== partB) {
                                return partA.localeCompare(partB);
                            }
                        }
                    }

                    return 0;
                });

                allPoints.map((point) => {
                    delete point.$createdAt;
                    delete point.$id;
                    delete point.$collectionId;
                    delete point.$databaseId;
                    delete point.$permissions;
                    delete point.$updatedAt;
                });

                setPointData(allPoints);
                await saveDataToFile(allPoints);
                setFetchFinished(true);
            } catch (error) {
                console.error(error);
            }
        };

        const saveDataToFile = async (data) => {
            try {
                const fileUri = FileSystem.documentDirectory + "pointsCard.json";
                await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                console.log("Data saved to file:", fileUri);
            } catch (error) {
                console.error("Error saving data to file: ", error);
            }
        };

        const loadDataFromFile = async () => {
            try {
                const fileUri = FileSystem.documentDirectory + "pointsCard.json";
                const fileContents = await FileSystem.readAsStringAsync(fileUri);
                const data = JSON.parse(fileContents);
                setPointData(data);
            } catch (error) {
                console.error("Error reading data from file: ", error);
            }
        };

        const checkNetworkConnectivityAndFetchData = async () => {
            try {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                    fetchData();
                } else {
                    loadDataFromFile();
                }
            } catch (error) {
                console.error("Error checking network connectivity: ", error);
            }
        };

        // Check if data is available offline
        FileSystem.getInfoAsync(FileSystem.documentDirectory + "pointsCard.json")
            .then(({ exists }) => {
                if (exists) {
                    loadDataFromFile();
                } else {
                    fetchData();
                }
            })
            .catch(error => console.error("Error checking file: ", error));

        checkNetworkConnectivityAndFetchData();

        // Cleanup function
        return () => {
            unsubscribe();
        };

    }, [isInternetReachable, isAppActive]);

    const renderPoints = () => {
        return pointData.map((point, index) => (
            <Pressable
                id={point.Name}
                key={`${index}_${point.Name}`}
            >
                <Card style={MapStyle.poiCard}>
                    <Card.Content style={MapStyle.poiCardContent}>
                        <Text style={MapStyle.poiListTitle}>{point.Name} ({point.Status})</Text>
                        <FontAwesome5 style={MapStyle.directionsIcon} name="directions" size={30} color={appTertiaryColor} onPress={() => {
                            getDirections(point.Latitude, point.Longitude, currentNavPreference);
                        }} />
                    </Card.Content>
                </Card>
            </Pressable>
        ));

    };

    const fetchNavPreference = async () => {
        try {
            const preference = await getNavigationPreference();

            setCurrentNavPreference(preference);
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
            naverCallerName: BUNDLER_PACKAGE_IDENTIFIER,
            directionsMode: directionsPreference,
        });
    };


    const handleSearch = (query) => {
        setSearchQuery(query); // Update search query state

        const filtered = pointData.filter(element => {
            const pointName = element.Name.toLowerCase();
            return pointName.includes(query.toLowerCase());
        }).map((point, index) => (
            <Pressable
                id={point.Name}
                key={`${index}_${point.Name}`}
            >
                <Card style={MapStyle.poiCard}>
                    <Card.Content style={MapStyle.poiCardContent}>
                        <Text style={MapStyle.poiListTitle}>{point.Name} ({point.Status})</Text>
                        <FontAwesome5 style={MapStyle.directionsIcon} name="directions" size={30} color={appTertiaryColor} onPress={() => {
                            getDirections(point.Latitude, point.Longitude, currentNavPreference);
                        }} />
                    </Card.Content>
                </Card>
            </Pressable>
        ));

        setFilteredCards(filtered);
        setFilterOn(query !== ""); // Set filterOn based on whether the query is empty or not
    };

    return (
        <SafeAreaView style={MapStyle.poiContainer}>
            <TouchableOpacity style={MapStyle.changeListOpac} onPress={() => { navigation.navigate("MapScreen"); }}>
                <Text style={MapStyle.changeListText}>View as Map</Text>
            </TouchableOpacity>
            <Searchbar
                style={MapStyle.mapSearchBar}
                iconColor={appTertiaryColor}
                inputStyle={{ color: appTextColor }}
                placeholder="Search"
                placeholderTextColor={appTextColor}
                value={searchQuery}
                onChangeText={(text) => {
                    setSearchQuery(text);
                    handleSearch(text);
                }}
            />
            {isLoading ? (
                <View style={HomeStyle.loadingContainer}>
                    <ActivityIndicator animating={true} color={appSecondaryColor} size="large" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={MapStyle.scrollableView} showsVerticalScrollIndicator={false}>
                    {pointData.length > 0 ?
                        (filterOn ? (filteredCards) : (renderPoints()))
                        :
                        <Text style={HomeStyle.noNotificationsMessage}>
                            {message}
                        </Text>
                    }
                </ScrollView>
            )}
        </SafeAreaView>
    );

}
