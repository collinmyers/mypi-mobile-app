import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Alert, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { account, database, DATABASE_ID, ALERTS_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { Query } from "appwrite";
import * as Notifications from "expo-notifications";
import HomeStyle from "../../styling/HomeStyle";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { appSecondaryColor, appTextColor } from "../../utils/colors/appColors";
import { subscribeToRealTimeUpdates } from "../../utils/Config/appwriteConfig";

export default function AlertsScreen() {

    const navigation = useNavigation();

    const PAGE_SIZE = 25;

    const [isSignedIn, setIsSignedIn] = useState(false);
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

    const [data, setData] = useState([]);
    const [filterList, setList] = useState([]);
    const [fullList, setFull] = useState([]);


    useFocusEffect(React.useCallback(() => {
        // Function to handle real-time updates
        const handleSubscription = () => {
            getAlerts();
        };
        // Subscribe to real-time updates
        const unsubscribe = subscribeToRealTimeUpdates(handleSubscription, ALERTS_COLLECTION_ID);

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
        getNameAndRole();

        return () => {
            unsubscribe();
        };

    }, []));

    const getAlerts = async () => {
        try {
            let offset = 0;
            let allData = [];

            const fetchPage = async (offset) => {
                const response = await database.listDocuments(
                    DATABASE_ID, // DB ID
                    ALERTS_COLLECTION_ID, // Collection ID
                    [
                        Query.limit(PAGE_SIZE),
                        Query.offset(offset)
                    ]
                );

                const newData = response.documents.map((document, index) => {
                    const Title = document.Title;
                    const Details = document.Details;
                    const NotificationType = document.NotificationType;

                    return (
                        <Card style={HomeStyle.alertCard} key={`${offset}_${index}`} id={NotificationType}>
                            <Card.Content style={HomeStyle.alertCardContent}>
                                <Text style={HomeStyle.alertListTitle}>{Title}</Text>
                                <Text style={HomeStyle.alertListDetails}>{Details}</Text>
                                <Text style={HomeStyle.alertListTypeDesc}>{NotificationType}</Text>
                            </Card.Content>
                        </Card>
                    );
                });

                allData = [...allData, ...newData];

                if (response.documents.length === PAGE_SIZE) {
                    await fetchPage(offset + PAGE_SIZE); // Fetch next page
                }
            };

            await fetchPage(offset); // Start fetching from the initial offset

            setData(allData);
            setFull(allData);
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

                {/* <TouchableOpacity onPress={() => handleGetFullList()} style={HomeStyle.alertButton}>
                    <Text style={HomeStyle.alertButtonText}>All</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleFilterById("alerts")} style={HomeStyle.alertButton}>
                    <Text style={HomeStyle.alertButtonText}>Alerts</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleFilterById("events")} style={HomeStyle.alertButton}>
                    <Text style={HomeStyle.alertButtonText}>Events</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleFilterById("promos")} style={HomeStyle.alertButton}>
                    <Text style={HomeStyle.alertButtonText}>Promos</Text>
                </TouchableOpacity> */}


                <Button style={HomeStyle.alertButton} labelStyle={HomeStyle.alertButtonText} mode="elevated" textColor={appTextColor} buttonColor={appSecondaryColor} onPress={() => handleGetFullList()}>
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
                {fullList}
                {filterList}

                {isSignedIn && (profileRole.role == "admin") ?
                    (<TouchableOpacity onPress={() => navigation.navigate("PushNotificationScreen")}>
                        <AntDesign name="pluscircle" size={30} color="#8fa063" />
                    </TouchableOpacity>
                    ) :
                    null
                }


            </ScrollView>
        </SafeAreaView>
    );
}
