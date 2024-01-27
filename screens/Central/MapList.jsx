import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { ScrollView, SafeAreaView, Pressable } from "react-native";
import { Card, Searchbar, Text, TextInput } from "react-native-paper";
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
            // Initialize Appwrite client
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            // Function to handle real-time updates
            const handleSubscription = () => {
                getPOI();
            };
            // Subscribe to real-time updates
            client.subscribe(
                "databases.653ae4b2740b9f0a5139.collections.65565099921adc2d835b.documents",
                handleSubscription
            );

            getPOI();

        }, [])); // Empty dependency array means this effect will only run once when the component mounts


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
                    "653ae4b2740b9f0a5139", // DB ID
                    "65565099921adc2d835b", // Collection ID
                    [
                        Query.limit(PAGE_SIZE),
                        Query.offset(offset)
                    ]
                );

                const newData = response.documents.map((document, index) => {
                    const Name = document.Name;
                    //const Latitude = document.Latitude;
                    //const Longitude = document.Longitude;
                    const Status = document.Status;

                    return (
                        <Pressable
                            id={Name}
                            key={`${offset}_${index}`} // Ensure each key is unique
                        // onPress={() =>
                        //     navigation.navigate("Map", {
                        //         Name: Name,
                        //         Latitude: Latitude,
                        //         Longitude: Longitude,
                        //         Status: Status,
                        //     })
                        // }
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
                    await fetchPage(offset + PAGE_SIZE); // Fetch next page
                }
            };

            await fetchPage(offset); // Start fetching from the initial offset

            setData(allData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (query) => {
        setFilteredCards([]);
        setFilterOn(true);


        data.forEach(element => {
            const cardIdString = element.props.id;
            if (cardIdString.toLowerCase().includes(query.toLowerCase()) ) {
                setFilteredCards(prevFilter => [...prevFilter,element]);
            }
        });
        if(query == ""){
            setFilterOn(false);
        }
      };

    return (
        <SafeAreaView style={MapStyle.poiContainer}>
            <Text style={MapStyle.changeButton} onPress={() => { navigation.navigate("MapScreen"); }}>View as Map</Text>
            <Searchbar 
                style={{width:"80%"}}
                placeholder="Search for point of interest" 
                value={searchQuery} 
                onChangeText={(text) => {
                setSearchQuery(text);
                handleSearch(text);
            }}
            />

                
            <ScrollView contentContainerStyle={MapStyle.scrollableView} showsVerticalScrollIndicator={false}>
                {filterOn ?
                    (filteredCards) 
                    :
                    (data)
                }
            </ScrollView>
        </SafeAreaView>

    );
}