import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { Databases, Client } from "appwrite";
import * as Notifications from "expo-notifications";
import HomeStyle from "../../styling/HomeStyle";
import { useFocusEffect } from "@react-navigation/native";


export default function AlertsScreen() {

    const appBlue = "#134C77";
    const appGreen = "#8FA063";
    const appWhite = "#FFFFFF";

    /* For sending notifications from mobile (possibly add in future)
  
    const [notificationCount, setNotificationCount] = useState(0);
  
    const sendNotification = async () => {
      // Create a simple notification
      console.log("new notification");
  
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Park Alert",
          body: "There is a tree down near Beach 8, use caution.",
        },
        trigger: null,
        presentation: {
          style: "notification",
        },
      });
  
      setNotificationCount(notificationCount + 1);
    };
    */

    const [data, setData] = useState([]);
    const [filterList, setList] = useState([]);
    const [fullList, setFull] = useState([]);


    useFocusEffect(
        React.useCallback(() => {
            // Initialize Appwrite client
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            // Function to handle real-time updates
            const handleSubscription = () => {
                getAlerts();
            };
            // Subscribe to real-time updates
            client.subscribe(
                "databases.653ae4b2740b9f0a5139.collections.6552848655e88d169d7d.documents",
                handleSubscription
            );

            // Request notification permissions when the component mounts
            (async () => {
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== "granted") {
                    console.log("Permission to receive notifications denied.");
                    return;
                }
            })();

            // Define the notification handler
            const notificationHandler = {
                handleNotification: async (notification) => {
                    // Handle the presented notification here
                    const { title, body } = notification.request.content;

                    // For example, show an alert with the notification content
                    Alert.alert(title, body);

                    // You can add more customized behavior here, such as navigating to a specific screen.
                },
            };

            // Set the notification handler
            Notifications.setNotificationHandler(notificationHandler);

            getAlerts();

        }, [])); // Empty dependency array means this effect will only run once when the component mounts

    const getAlerts = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const database = new Databases(client);

            const response = await database.listDocuments(
                "653ae4b2740b9f0a5139", // DB ID
                "6552848655e88d169d7d" // Collection ID
            );


            // Build a new array with updated data
            const newData = response.documents.map((document, index) => {
                const Title = document.Title;
                const Details = document.Details;
                const NotificationType = document.NotificationType;

                return (

                    <Card style={HomeStyle.alertCard} key={index} id={NotificationType}>
                        <Card.Content style={HomeStyle.alertCardContent}>
                            <Text style={HomeStyle.alertListTitle}>{Title}</Text>
                            <Text style={HomeStyle.alertListDetails}>{Details}</Text>
                            <Text style={HomeStyle.alertListTypeDesc}>{NotificationType}</Text>

                        </Card.Content>
                    </Card>

                );
            });
            // Update state with the new array
            setData(newData);
            setFull(newData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilterById = (filterId) => {

        setFull([]);
        setList([]);

        data.forEach(element => {
            if (element.props.id == filterId) {
                setList(element);
            }
        });
    };

    const handleGetFullList = () => {

        setFull([]);
        setList([]);

        setFull(data);
    };

    return (
        <SafeAreaView style={HomeStyle.alertContainer}>
            <View style={HomeStyle.alertButtons}>

                <Button mode="elevated" textColor={appWhite} buttonColor={appGreen} onPress={() => handleGetFullList()}>
                    All
                </Button>
                <Button mode="elevated" textColor={appWhite} buttonColor={appGreen} onPress={() => handleFilterById("alerts")}>
                    Alerts
                </Button>
                <Button mode="elevated" textColor={appWhite} buttonColor={appGreen} onPress={() => handleFilterById("events")}>
                    Events
                </Button>
                <Button mode="elevated" textColor={appWhite} buttonColor={appGreen} onPress={() => handleFilterById("promos")}>
                    Promos
                </Button>

            </View>

            <ScrollView contentContainerStyle={[HomeStyle.scrollableView, { alignItems: "center" }]} showsVerticalScrollIndicator={false}>
                {fullList}
                {filterList}
            </ScrollView>
        </SafeAreaView>
    );
}
