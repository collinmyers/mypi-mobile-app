import * as Network from "expo-network";
import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { database, DATABASE_ID, EVENTS_COLLECTION_ID, subscribeToRealTimeUpdates } from "../../utils/Config/config";
import { Query } from "appwrite";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { useNetwork } from "../../components/context/NetworkContext";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import { appSecondaryColor, appQuarternaryColor } from "../../utils/colors/appColors";

export default function ParkInfoScreen() {
    const { isInternetReachable } = useNetwork();
    const [eventData, setEventData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const PAGE_SIZE = 25;

    useEffect(() => {
        // Function to handle real-time updates
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

                // Fetch images for each event concurrently
                const eventsWithImages = await Promise.all(
                    allEvents.map(async (event) => {
                        const EventListDescription = event.EventListDescription;
                        const EventName = event.Name;
                        const EventDate = event.Date;
                        const EventDetailsDescription = event.EventDetailsDescription;
                        const EventLatitude = event.Latitude;
                        const EventLongitude = event.Longitude;
                        const EventTime = event.Time || "";
                        const EventImages = []; // Initialize an empty array for images
                        const ExtraInfoTitle = event.ExtraInfoTitle;
                        const ExtraInfoURL = event.ExtraInfoURL;


                        // Loop through each FileID in the event
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

                            EventImages.push(image); // Add the image to the EventImages array
                        }

                        return {
                            EventListDescription,
                            EventName,
                            EventDate,
                            EventDetailsDescription,
                            EventLatitude,
                            EventLongitude,
                            EventTime,
                            EventImages, // Include the EventImages array
                            ExtraInfoTitle,
                            ExtraInfoURL,
                        };
                    })
                );

                setEventData(eventsWithImages);
                await saveDataToFile(eventsWithImages); // Save fetched data to file
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
                    fetchData(); // Fetch data from appwrite if connected
                }
            } catch (error) {
                console.error("Error checking network connectivity: ", error);
            }
        };

        // Check if data is available offline
        FileSystem.getInfoAsync(FileSystem.documentDirectory + "eventList.json")
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
    }, [isInternetReachable]);

    useEffect(() => {
        if (eventData.length > 0) {
            setIsLoading(false);
        }
    }, [eventData]);


    return (
        <SafeAreaView style={AppStyle.container}>
            <View style={HomeStyle.dbContainer}>

                <Text style={HomeStyle.parkInfoText}>
                    Presque Isle is a major recreational landmark for over four million visitors each year.
                </Text>
                <Text style={HomeStyle.parkInfoText}>
                    The park offers visitors a beautiful, sandy coastline and many recreational activities, including swimming, boating, fishing, hiking, bicycling, and even surfing!
                </Text>
                <Text style={HomeStyle.parkInfoText}>
                    The bay attracts many pleasure boats and worldwide freighters, making Erie an important Great Lakes shipping port.
                </Text>
                <Text style={HomeStyle.parkInfoText}>
                    Whether you come to enjoy the sandy beaches, study ecological diversity, or learn about the historical significance of the peninsula, there is something for everyone at Presque Isle State Park.
                </Text>
            </View>
        </SafeAreaView>
    );
}

