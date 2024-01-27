import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, SafeAreaView, Pressable } from "react-native";
import { Card, Searchbar, Text } from "react-native-paper";
import { Databases, Client, Query } from "appwrite";
import { useNavigation } from "@react-navigation/native";
import MapStyle from "../../styling/MapStyle";

export default function MapList() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCards, setFilteredCards] = useState([]);
    const [filterOn, setFilterOn] = useState(false);

    const PAGE_SIZE = 25;

    useFocusEffect(
        React.useCallback(() => {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const handleSubscription = () => {
                getPOI();
            };

            client.subscribe(
                "databases.653ae4b2740b9f0a5139.collections.65565099921adc2d835b.documents",
                handleSubscription
            );

            getPOI();

        }, []));

    const getPOI = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const database = new Databases(client);

            let offset = 0;
            let allData = [];

            const fetchPage = async (offset) => {
                const response = await database.listDocuments(
                    "653ae4b2740b9f0a5139",
                    "65565099921adc2d835b",
                    [
                        Query.limit(PAGE_SIZE),
                        Query.offset(offset)
                    ]
                );

                const newData = response.documents.map((document, index) => {
                    const Name = document.Name;
                    const Status = document.Status;

                    return (
                        <Pressable
                            id={Name}
                            key={`${offset}_${index}`}
                        >
                            <Card style={MapStyle.poiCard}>
                                <Card.Content style={MapStyle.poiCardContent}>
                                    <Text style={MapStyle.poiListTitle}>{Name}</Text>
                                    <Text style={MapStyle.poiListStatus}>{Status}</Text>
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
            <Text style={MapStyle.changeButtonList} onPress={() => { navigation.navigate("MapScreen"); }}>View as Map</Text>
            <Searchbar
                style={MapStyle.mapSearchBar}
                placeholder="Search"
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
