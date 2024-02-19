import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, SafeAreaView, Pressable, TouchableOpacity } from "react-native";
import { Card, Searchbar, Text } from "react-native-paper";
import { database, DATABASE_ID, MAP_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { Query } from "appwrite";
import { useNavigation } from "@react-navigation/native";
import MapStyle from "../../styling/MapStyle";
import { getNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";
import { showLocation } from "react-native-map-link";
import { FontAwesome5 } from "@expo/vector-icons";
import { appTertiaryColor, appTextColor } from "../../utils/colors/appColors";

export default function MapList() {
    const navigation = useNavigation();
    const [pointData, setPointData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCards, setFilteredCards] = useState([]);
    const [filterOn, setFilterOn] = useState(false);
    const [currentNavPreference, setCurrentNavPreference] = useState(null);

    const PAGE_SIZE = 25;

    useFocusEffect(React.useCallback(() => {
        fetchNavPreference();
    }, []));

    useFocusEffect(
        React.useCallback(() => {
            if (currentNavPreference !== null) {
                setPointData([]);

            }
        }, [currentNavPreference])
    );

    useEffect(() => {
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

                allMarkers.sort((a, b) => {
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
                
    
                setPointData(allMarkers);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

    }, []);

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
            naverCallerName: "com.discoverpi.mypi",
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

            <ScrollView contentContainerStyle={MapStyle.scrollableView} showsVerticalScrollIndicator={false}>
                {filterOn ? (filteredCards) : (renderPoints())}
            </ScrollView>
        </SafeAreaView>
    );

}
