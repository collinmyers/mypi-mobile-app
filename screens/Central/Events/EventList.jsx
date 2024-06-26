import * as Network from "expo-network";
import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import { ScrollView, SafeAreaView, Pressable, View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { database, storage, DATABASE_ID, EVENTS_COLLECTION_ID, FILE_BUCKET_ID, subscribeToRealTimeUpdates } from "../../../utils/Config/config";
import { Query } from "appwrite";
import { useNavigation } from "@react-navigation/native";
import HomeStyle from "../../../styling/HomeStyle";
import * as FileSystem from "expo-file-system";
import { parse } from "date-fns";
import { appSecondaryColor } from "../../../utils/colors/appColors";
import { useNetwork } from "../../../components/context/NetworkContext";
import { useAppState } from "../../../components/context/AppStateContext";

export default function EventListScreen() {
    const navigation = useNavigation();
    const { isInternetReachable } = useNetwork();
    const { isAppActive } = useAppState();
    const [eventData, setEventData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fetchingFinished, setFetchFinished] = useState(false);
    const PAGE_SIZE = 25;

    const blurhash = "LyD1KYtRWBf7?wt6Wqj?xvoIa}j@"; // placeholder until image loads

    useEffect(() => {
        if (eventData.length > 0 || fetchingFinished) {
            setIsLoading(false);
        }
    }, [eventData.length, fetchingFinished]);

    useEffect(() => {
        const handleSubscription = () => {
            checkNetworkConnectivityAndFetchData();
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

                // Sort events based on start date
                allEvents.sort((a, b) => {
                    const { startDate: startDateA } = parseEventDate(a.Date);
                    const { startDate: startDateB } = parseEventDate(b.Date);
                    return startDateA - startDateB;
                });

                const eventsWithImages = await Promise.all(
                    allEvents.map(async (event) => {
                        const EventListDescription = event.EventListDescription;
                        const EventName = event.Name;
                        const EventDate = event.Date;
                        const EventDetailsDescription = event.EventDetailsDescription;
                        const EventLatitude = event.Latitude;
                        const EventLongitude = event.Longitude;
                        const EventTime = event.Time || "";
                        const EventImages = [];
                        const ExtraInfoTitle = event.ExtraInfoTitle;
                        const ExtraInfoURL = event.ExtraInfoURL;

                        for (const fileID of event.FileID) {
                            const imageFileUri = `${FileSystem.documentDirectory}${fileID}.png`;
                            const fileInfo = await FileSystem.getInfoAsync(imageFileUri);
                            let image;

                            if (fileInfo.exists) {
                                image = imageFileUri;
                            } else {
                                const imageResponse = await storage.getFileView(FILE_BUCKET_ID, fileID);
                                image = imageResponse.toString();
                                // Download and save image
                                await FileSystem.downloadAsync(image, imageFileUri);
                            }

                            EventImages.push(image);
                        }

                        return {
                            EventListDescription,
                            EventName,
                            EventDate,
                            EventDetailsDescription,
                            EventLatitude,
                            EventLongitude,
                            EventTime,
                            EventImages, 
                            ExtraInfoTitle,
                            ExtraInfoURL,
                        };
                    })
                );

                setEventData(eventsWithImages);
                await saveDataToFile(eventsWithImages);
                setFetchFinished(true);
            } catch (error) {
                console.error(error);
            }
        };

        const saveDataToFile = async (data) => {
            try {
                const fileUri = FileSystem.documentDirectory + "eventList.json";
                await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                console.log("Data saved to file:", fileUri);
            } catch (error) {
                console.error("Error saving data to file: ", error);
            }
        };

        const loadDataFromFile = async () => {
            try {
                const fileUri = FileSystem.documentDirectory + "eventList.json";
                const fileContents = await FileSystem.readAsStringAsync(fileUri);
                const data = JSON.parse(fileContents);
                setEventData(data);
            } catch (error) {
                console.error("Error reading data from file: ", error);
            }
        };

        const checkNetworkConnectivityAndFetchData = async () => {
            try {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                    fetchData();
                }
            } catch (error) {
                console.error("Error checking network connectivity: ", error);
            }
        };

        // Check if data is available offline
        FileSystem.getInfoAsync(FileSystem.documentDirectory + "eventList.json")
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

    const parseEventDate = (dateString) => {
        const dateParts = dateString.split(" - ");

        if (dateParts.length === 2) {
            // Date range
            const startDate = parse(dateParts[0], "MMMM d, yyyy", new Date());
            const endDate = parse(dateParts[1], "MMMM d, yyyy", new Date());
            return { startDate, endDate };
        } else {
            // Single date
            const parsedDate = parse(dateString, "MMMM d, yyyy", new Date());
            return { startDate: parsedDate, endDate: parsedDate };
        }
    };

    const renderEvents = () => {
        return eventData.map((event, index) => {
            const EventName = event.EventName;
            const EventDate = event.EventDate;
            const EventListDescription = event.EventListDescription;
            const EventDetailsDescription = event.EventDetailsDescription;
            const EventLatitude = event.EventLatitude;
            const EventLongitude = event.EventLongitude;
            const EventImages = event.EventImages;
            const EventTime = event.EventTime;
            const ExtraInfoTitle = event.ExtraInfoTitle;
            const ExtraInfoURL = event.ExtraInfoURL;

            return (
                <Pressable
                    key={`${index}_${EventName}`}
                    onPress={() =>
                        navigation.navigate("EventDetailsScreen", {
                            EventImages: EventImages,
                            EventName: EventName,
                            EventDate: EventDate,
                            EventDetailsDescription: EventDetailsDescription,
                            EventListDescription: EventListDescription,
                            EventLatitude: EventLatitude,
                            EventLongitude: EventLongitude,
                            EventTime: EventTime,
                            ExtraInfoTitle: ExtraInfoTitle,
                            ExtraInfoURL: ExtraInfoURL
                        })
                    }
                >
                    <Card style={HomeStyle.eventCard}>
                        <Card.Content style={HomeStyle.eventCardContent}>
                            <Image placeholder={blurhash} contentFit="cover" source={{ uri: EventImages[0] }} style={HomeStyle.eventListImage} />
                            <Text style={HomeStyle.eventListTitle}>{EventName}</Text>
                            <Text style={HomeStyle.eventListDate}>{EventDate}</Text>
                            <Text style={HomeStyle.eventListDescription}>{EventListDescription}</Text>
                        </Card.Content>
                    </Card>
                </Pressable>
            );
        });

    };

    return (
        <SafeAreaView style={HomeStyle.eventContainer}>
            {isLoading ? (
                <View style={HomeStyle.loadingContainer}>
                    <ActivityIndicator animating={true} color={appSecondaryColor} size="large" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={HomeStyle.scrollableView} showsVerticalScrollIndicator={false}>
                    {eventData.length > 0 ?
                        renderEvents()
                        :
                        <Text style={HomeStyle.noNotificationsMessage}>
                            No new events at this time
                        </Text>
                    }
                </ScrollView>
            )}

        </SafeAreaView>
    );
}
