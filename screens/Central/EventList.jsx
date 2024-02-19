import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, SafeAreaView, Pressable, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { database, storage, DATABASE_ID, EVENTS_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { Query } from "appwrite";
import { useNavigation } from "@react-navigation/native";
import HomeStyle from "../../styling/HomeStyle";
import { subscribeToRealTimeUpdates } from "../../utils/Config/appwriteConfig";

export default function EventListScreen() {
    const navigation = useNavigation();
    const [eventData, setEventData] = useState([]);

    const PAGE_SIZE = 25;

    const FILE_BUCKET_ID = process.env.EXPO_PUBLIC_FILE_BUCKET_ID;

    useFocusEffect(React.useCallback(() => {
        // Function to handle real-time updates
        const handleSubscription = () => {
            fetchData();
        };

        const unsubscribe = subscribeToRealTimeUpdates(handleSubscription, EVENTS_COLLECTION_ID);

        const fetchData = async () => {
            try {
                let offset = 0;
                let allEvents = [];

                const response = await database.listDocuments(
                    DATABASE_ID,
                    EVENTS_COLLECTION_ID,
                    [Query.limit(PAGE_SIZE), Query.offset(offset)]
                );

                while (response.documents.length > 0) {
                    allEvents = [...allEvents, ...response.documents];
                    offset += PAGE_SIZE;
                    const nextResponse = await database.listDocuments(
                        DATABASE_ID,
                        EVENTS_COLLECTION_ID,
                        [Query.limit(PAGE_SIZE), Query.offset(offset)]
                    );
                    response.documents = nextResponse.documents;
                }

                // Fetch images for each event concurrently
                const eventsWithImages = await Promise.all(allEvents.map(async (event) => {
                    const EventListDescription = event.EventListDescription;
                    const EventName = event.Name;
                    const EventDateTime = event.DateTime;
                    const EventDetailsDescription = event.EventDetailsDescription;
                    const EventLatitude = event.Latitude;
                    const EventLongitude = event.Longitude;

                    const imageResponse = await storage.getFileView(FILE_BUCKET_ID, event.FileID);
                    const EventImage = imageResponse.toString(); // Assuming imageResponse is a URL

                    return {
                        EventName,
                        EventDateTime,
                        EventDetailsDescription,
                        EventListDescription,
                        EventLatitude,
                        EventLongitude,
                        EventImage
                    };
                }));

                setEventData(eventsWithImages);
                // await saveDataToFile(allPoints); // Save fetched data to file
            } catch (error) {
                console.error(error);
            }
        };


        fetchData();

        // Cleanup function
        return () => {
            unsubscribe();
        };
    }, []));

    const renderEvents = () => {
        return eventData.map((event, index) => {


            const EventName = event.EventName;
            const EventDateTime = event.EventDateTime;
            const EventListDescription = event.EventListDescription;
            const EventDetailsDescription = event.EventDetailsDescription;
            const EventLatitude = event.EventLatitude;
            const EventLongitude = event.EventLongitude;
            const EventImage = event.EventImage;

            return (
                <Pressable
                    key={`${index}_${EventName}`}
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
    };


    return (
        <SafeAreaView style={HomeStyle.eventContainer}>
            <ScrollView contentContainerStyle={HomeStyle.scrollableView} showsVerticalScrollIndicator={false}>
                {renderEvents()}
            </ScrollView>
        </SafeAreaView>
    );
}