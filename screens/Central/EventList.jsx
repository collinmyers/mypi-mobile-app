import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, SafeAreaView, Pressable, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import client, { database, storage, DATABASE_ID, EVENTS_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { Query } from "appwrite";
import { useNavigation } from "@react-navigation/native";
import HomeStyle from "../../styling/HomeStyle";



export default function EventListScreen() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    const PAGE_SIZE = 25;

    useFocusEffect(React.useCallback(() => {
        // Function to handle real-time updates
        const handleSubscription = () => {
            getEvents();
        };

        // Subscribe to real-time updates
        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${EVENTS_COLLECTION_ID}.documents`, handleSubscription);

        getEvents();

        // Cleanup function
        return () => {
            unsubscribe();
        };
    }, []));

    const getEvents = async () => {
        try {

            let offset = 0;
            let allData = [];

            const fetchPage = async (offset) => {
                const response = await database.listDocuments(
                    DATABASE_ID,
                    EVENTS_COLLECTION_ID,
                    [
                        Query.limit(PAGE_SIZE),
                        Query.offset(offset)
                    ]
                );

                const newData = response.documents.map((document, index) => {
                    const EventListDescription = document.EventListDescription;
                    const EventName = document.Name;
                    const EventDateTime = document.DateTime;
                    const EventDetailsDescription = document.EventDetailsDescription;
                    const EventLatitude = document.Latitude;
                    const EventLongitude = document.Longitude;

                    const EventImage = storage.getFileView(
                        "653ae4d2b3fcc68c10bf", // BucketID
                        document.FileID // File ID
                    ).toString();

                    return (
                        <Pressable
                            key={`${offset}_${index}`}
                            onPress={() =>
                                navigation.navigate("EventDetailsScreen", {
                                    EventImage: EventImage,
                                    EventName: EventName,
                                    EventDateTime: EventDateTime,
                                    EventDetailsDescription: EventDetailsDescription,
                                    EventListDescription: EventListDescription,
                                    EventLatitude: EventLatitude,
                                    EventLongitude: EventLongitude
                                })
                            }
                        >
                            <Card style={HomeStyle.eventCard}>
                                <Card.Content style={HomeStyle.eventCardContent}>
                                    <Image source={{ uri: EventImage }} style={HomeStyle.eventListImage} />
                                    <Text style={HomeStyle.eventListTitle}>{EventName}</Text>
                                    <Text style={HomeStyle.eventListDateTime}>{EventDateTime}</Text>
                                    <Text style={HomeStyle.eventListDescription}>{EventListDescription}</Text>
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

    return (
        <SafeAreaView style={HomeStyle.eventContainer}>
            <ScrollView contentContainerStyle={HomeStyle.scrollableView} showsVerticalScrollIndicator={false}>
                {data}
            </ScrollView>
        </SafeAreaView>
    );
}