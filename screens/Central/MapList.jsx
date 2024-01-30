import React, { useState } from "react";
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
    const [data, setData] = useState([]);
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
                setData([]);
                getPOI(currentNavPreference);
            }
        }, [currentNavPreference])
    );

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


    const getPOI = async (directionsPreference) => {
        setCurrentNavPreference(directionsPreference);
        try {
            let offset = 0;
            let allData = [];

            const fetchPage = async (offset) => {
                const response = await database.listDocuments(
                    DATABASE_ID,
                    MAP_COLLECTION_ID,
                    [
                        Query.limit(PAGE_SIZE),
                        Query.offset(offset)
                    ]
                );

                const newData = response.documents.map((document, index) => {
                    const Name = document.Name;
                    const Status = document.Status;
                    const Latitude = document.Latitude;
                    const Longitude = document.Longitude;

                    return (
                        <Pressable
                            id={Name}
                            key={`${offset}_${index}`}
                        >
                            <Card style={MapStyle.poiCard}>
                                <Card.Content style={MapStyle.poiCardContent}>
                                    <Text style={MapStyle.poiListTitle}>{Name} ({Status})</Text>
                                    <FontAwesome5 style={MapStyle.directionsIcon} name="directions" size={30} color={appTertiaryColor} onPress={() => {
                                        getDirections(Latitude, Longitude, directionsPreference);
                                    }} />
                                </Card.Content>
                            </Card>
                        </Pressable>
                    );
                });

                allData = [...allData, ...newData];

                if (response.documents.length === PAGE_SIZE) {
                    await fetchPage(offset + PAGE_SIZE);
                } else {
                    allData.sort((a, b) => {
                        const nameA = a.props.id.toLowerCase();
                        const nameB = b.props.id.toLowerCase();

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

                    setData(allData);


                }
            };

            await fetchPage(offset);

        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (query) => {
        setFilteredCards([]);
        setFilterOn(true);

        data.forEach(element => {
            const cardIdString = element.props.id;
            if (cardIdString.toLowerCase().includes(query.toLowerCase())) {
                setFilteredCards(prevFilter => [...prevFilter, element]);
            }
        });
        if (query === "") {
            setFilterOn(false);
        }
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
                {filterOn ? (filteredCards) : (data)}
            </ScrollView>
        </SafeAreaView>
    );
}
