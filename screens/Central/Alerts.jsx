import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { account, database, DATABASE_ID, ALERTS_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { Query } from "appwrite";
import * as Notifications from "expo-notifications";
import HomeStyle from "../../styling/HomeStyle";
import { useNavigation } from "@react-navigation/native";
import { appPrimaryColor, appSecondaryColor, appTextColor } from "../../utils/colors/appColors";
import { subscribeToRealTimeUpdates } from "../../utils/Config/appwriteConfig";
import { Feather } from "@expo/vector-icons";

export default function AlertsScreen() {

    const navigation = useNavigation();

    const PAGE_SIZE = 25;

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [alertData, setAlertData] = useState([]);
    const [filterList, setList] = useState([]);
    const [fullList, setFull] = useState([]);
    const [profileRole, setProfileRole] = useState({
        role: "",
    });


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




    useFocusEffect(React.useCallback(() => {

        // handleFilterById("notifications");

        // Function to handle real-time updates
        const handleSubscription = () => {
            fetchData();
        };
        // Subscribe to real-time updates
        const unsubscribe = subscribeToRealTimeUpdates(handleSubscription, ALERTS_COLLECTION_ID);

        // Request notification permissions when the component mounts
        (async () => {
            let token;
            if (Platform.OS === "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                });
            }

            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to receive notifications denied.");
                return;
            }

            token = (await Notifications.getExpoPushTokenAsync({ projectID: "myPI" })).data;
            console.log(token);
        }
        )();

        // Define the notification handler
        const notificationHandler = {
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: true,
            }),
        };

        // Set the notification handler
        Notifications.setNotificationHandler(notificationHandler);

        const fetchData = async () => {
            try {
                let offset = 0;
                let allAlerts = [];

                const response = await database.listDocuments(
                    DATABASE_ID,
                    ALERTS_COLLECTION_ID,
                    [Query.limit(PAGE_SIZE), Query.offset(offset)]
                );

                while (response.documents.length > 0) {
                    allAlerts = [...allAlerts, ...response.documents];
                    offset += PAGE_SIZE;
                    const nextResponse = await database.listDocuments(
                        DATABASE_ID,
                        ALERTS_COLLECTION_ID,
                        [Query.limit(PAGE_SIZE), Query.offset(offset)]
                    );
                    response.documents = nextResponse.documents;
                }

                // Sort the notifications alphabetically by their name
                allAlerts.sort((a, b) => {
                    const nameA = a.Title.toLowerCase();
                    const nameB = b.Title.toLowerCase();

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

                setAlertData(allAlerts);
                setFull(allAlerts);
                //await saveDataToFile(allAlerts); // Save fetched data to file
            } catch (error) {
                console.error(error);
            }
        };


        fetchData();
        getNameAndRole();

        return () => {
            unsubscribe();
        };

    }, []));


    const renderAlerts = (alerts) => {
        return alerts.map((alert, index) => (
            <Card style={HomeStyle.alertCard} key={`${index}_${alert.Name}`} id={alert.NotificationType}>
                <Card.Content style={HomeStyle.alertCardContent}>
                    <Text style={HomeStyle.alertListTitle}>{alert.Title}</Text>
                    <Text style={HomeStyle.alertListDetails}>{alert.Details}</Text>
                </Card.Content>
            </Card>
        ));
    };

    const handleFilterById = (filterId) => {
        setSelectedCategory(filterId);
        if (filterId === "notifications") {
            setList(alertData);
        } else {
            const filteredAlerts = fullList.filter(alert => alert.NotificationType === filterId);
            setList(filteredAlerts);
        }
    };

    const getNameAndRole = async () => {
        try {
            const response = await account.get();

            setProfileRole({
                role: response.labels,
            });

            setIsSignedIn(true);
        } catch {
            setIsSignedIn(false);
        }
    };


    return (
        <SafeAreaView style={HomeStyle.alertContainer}>
            <View style={HomeStyle.alertButtons}>
                <Button style={HomeStyle.alertButton} labelStyle={HomeStyle.alertButtonText} mode="elevated" textColor={appTextColor} buttonColor={appSecondaryColor} onPress={() => handleFilterById("notifications")}>
                    All
                </Button>
                <Button style={HomeStyle.alertButton} labelStyle={HomeStyle.alertButtonText} mode="elevated" textColor={appTextColor} buttonColor={appSecondaryColor} onPress={() => handleFilterById("alerts")}>
                    Alerts
                </Button>
                <Button style={HomeStyle.alertButton} labelStyle={HomeStyle.alertButtonText} mode="elevated" textColor={appTextColor} buttonColor={appSecondaryColor} onPress={() => handleFilterById("events")}>
                    Events
                </Button>
                <Button style={HomeStyle.alertButton} labelStyle={HomeStyle.alertButtonText} mode="elevated" textColor={appTextColor} buttonColor={appSecondaryColor} onPress={() => handleFilterById("promos")}>
                    Promos
                </Button>
            </View>

            <ScrollView contentContainerStyle={[HomeStyle.scrollableView, { alignItems: "center" }]} showsVerticalScrollIndicator={false}>
                {filterList.length !== 0 ? (filterList.length > 0 ? renderAlerts(filterList) :
                    (filterList.length === 0 && alertData.length === 0 && (
                        <Text style={HomeStyle.noNotificationsMessage}>No {selectedCategory === "notifications" ? "notifications" : selectedCategory} at this time</Text>
                    ))) : (renderAlerts(fullList))
                }
            </ScrollView>

            {isSignedIn && (profileRole.role == "admin") ?
                (<TouchableOpacity style={HomeStyle.fab} onPress={
                    () => navigation.navigate("PushNotificationScreen")}>
                    <Feather name="plus" size={24} color={appPrimaryColor} />
                </TouchableOpacity>

                ) :
                null
            }
        </SafeAreaView>
    );
}
