import * as Network from "expo-network";
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text, Button } from "react-native-paper";
import { account, database, DATABASE_ID, ALERTS_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { Query } from "appwrite";
import * as Notifications from "expo-notifications";
import HomeStyle from "../../styling/HomeStyle";
import { useNavigation } from "@react-navigation/native";
import { appPrimaryColor, appSecondaryColor, appTextColor } from "../../utils/colors/appColors";
import { subscribeToRealTimeUpdates } from "../../utils/Config/appwriteConfig";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useRoute } from "@react-navigation/native";

export default function AlertsScreen() {

    const navigation = useNavigation();

    const route = useRoute();
    const { showEditNotifications } = route.params;

    const PAGE_SIZE = 25;

    const [selectedCategory, setSelectedCategory] = useState("notifications");
    const [isLoading, setIsLoading] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [alertData, setAlertData] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [fullList, setFullList] = useState([]);
    const [profileRole, setProfileRole] = useState({
        role: "",
    });

    useEffect(() => {
        handleFilterById(selectedCategory);
    }, [showEditNotifications, selectedCategory]);

    useEffect(() => {
        // Function to handle real-time updates
        const handleSubscription = async () => {
            await checkNetworkConnectivityAndFetchData();
        };

        // Subscribe to real-time updates
        const unsubscribe = subscribeToRealTimeUpdates(handleSubscription, ALERTS_COLLECTION_ID);

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

                // Load data from the local file
                const fileUri = FileSystem.documentDirectory + "alertsCard.json";
                let fileContents;
                try {
                    fileContents = await FileSystem.readAsStringAsync(fileUri);
                } catch (error) {
                    // If the file doesn't exist, initialize with an empty array
                    fileContents = "[]";
                }
                const localData = JSON.parse(fileContents);

                // Create a mapping of the local data with $id and isDismissed state
                const existingAlertsMap = new Map(localData.map((alert) => [alert.$id, alert.isDismissed]));

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

                const updatedAlerts = allAlerts.map((newAlert) => {
                    const isDismissed = existingAlertsMap.get(newAlert.$id) || false;
                    return { ...newAlert, isDismissed };
                });
                console.log("Updated Alerts Length: ", updatedAlerts.length);

                setAlertData(updatedAlerts);
                setFullList(updatedAlerts);
                await saveDataToFile(updatedAlerts); // Save fetched data to file
            } catch (error) {
                console.error(error);
            }
        };

        const saveDataToFile = async (data) => {
            try {
                const fileUri = FileSystem.documentDirectory + "alertsCard.json";
                await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                console.log("Data saved to file: ", fileUri);
            } catch (error) {
                console.error("Error saving data to file: ", error);
            }
        };

        const loadDataFromFile = async () => {
            try {
                const fileUri = FileSystem.documentDirectory + "alertsCard.json";
                const fileContents = await FileSystem.readAsStringAsync(fileUri);
                const data = JSON.parse(fileContents);
                console.log("Data loaded from file:", fileUri);
                setAlertData(data);
                setFullList(data);
            } catch (error) {
                console.error("Error reading data from file: ", error);
                setAlertData([]);
                setFullList([]);
            }
        };

        const checkNetworkConnectivityAndFetchData = async () => {
            try {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                    await fetchData(); // Fetch data from appwrite if connected
                }
            } catch (error) {
                console.error("Error checking network connectivity: ", error);
            }
        };

        // Check if data is available offline
        FileSystem.getInfoAsync(FileSystem.documentDirectory + "alertsCard.json")
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

        getNameAndRole();

        return () => {
            unsubscribe();
        };

    }, [alertData.length]);

    useEffect(() => {
        if (alertData.length > 0) {
            setIsLoading(false);
        }
    }, [alertData]);

    const toggleDismissed = async (alertId) => {
        try {
            const newAlertData = alertData.map(alert => {
                if (alert.$id === alertId) {
                    return { ...alert, isDismissed: !alert.isDismissed };
                }
                return alert;
            });
            setAlertData(newAlertData);

            // Update filterList if necessary
            if (selectedCategory === "notifications" || showEditNotifications) {
                setFilterList(newAlertData.filter((alert) => {
                    if (selectedCategory === "notifications") {
                        return true; // Always show all notifications in this case
                    } else {
                        return alert.NotificationType === selectedCategory;
                    }
                }));
            } else {
                // Filter out dismissed alerts
                setFilterList(newAlertData.filter((alert) => !alert.isDismissed && alert.NotificationType === selectedCategory));
            }

            // Update alert file
            await updateAlertFile(alertId, newAlertData.find(alert => alert.$id === alertId).isDismissed);
        } catch (error) {
            console.error("Error toggling dismissed state:", error);
        }
    };


    const updateAlertFile = async (alertId, isDismissed) => {
        try {
            const fileUri = FileSystem.documentDirectory + "alertsCard.json";
            const fileContents = await FileSystem.readAsStringAsync(fileUri);
            const data = JSON.parse(fileContents);
            const updatedData = data.map((alert) => {
                if (alert.$id === alertId) {
                    return { ...alert, isDismissed };
                }
                return alert;
            });
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedData));
            console.log("Data saved to file:", fileUri);
        } catch (error) {
            console.error("Error updating alert file: ", error);
        }
    };

    const renderAlerts = (alerts) => {
        return alerts.map((alert, index) => (
            <View style={HomeStyle.alertCard} key={`${index}_${alert.Name}`} id={alert.NotificationType}>
                <View style={HomeStyle.alertCardContent}>
                    <Text style={HomeStyle.alertListTitle}>{alert.Title}</Text>
                    <Text style={HomeStyle.alertListDetails}>{alert.Details}</Text>
                </View>
                {showEditNotifications && (
                    <View style={alert.isDismissed ? HomeStyle.notificationEditIconsFalse : HomeStyle.notificationEditIconsTrue}>
                        <FontAwesome5
                            name={alert.isDismissed ? "bell-slash" : "bell"}
                            size={22}
                            color={appSecondaryColor}
                            onPress={() => toggleDismissed(alert.$id)}
                        />
                    </View>
                )}
            </View>
        ));
    };

    const handleFilterById = (filterId) => {
        setSelectedCategory(filterId);

        if (filterId === "notifications") {
            // Always show all notifications when the category is "Notifications"
            setFilterList(showEditNotifications ? fullList : alertData.filter((alert) => !alert.isDismissed));
        } else {
            // Filter alerts based on the selected category when it's not "Notifications"
            setFilterList(showEditNotifications ? fullList.filter((alert) => alert.NotificationType === filterId) : alertData.filter((alert) => !alert.isDismissed && alert.NotificationType === filterId));
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

            {isLoading ? (
                <View style={HomeStyle.loadingContainer}>
                    <ActivityIndicator animating={true} color={appSecondaryColor} size="large" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={[HomeStyle.scrollableView, { alignItems: "center" }]} showsVerticalScrollIndicator={false}>
                    {filterList.length > 0 ? (
                        renderAlerts(filterList)
                    ) : (
                        <View>
                            {(selectedCategory === "notifications") ? (
                                alertData.filter((alert) => !alert.isDismissed).length > 0 ?
                                    (renderAlerts(alertData.filter((alert) => !alert.isDismissed)))
                                    :
                                    (
                                        <Text style={HomeStyle.noNotificationsMessage}>
                                            No new {selectedCategory} at this time
                                        </Text>
                                    )
                            ) : (
                                <Text style={HomeStyle.noNotificationsMessage}>
                                    No new {selectedCategory} at this time
                                </Text>
                            )}
                        </View>
                    )}

                </ScrollView>
            )}


            {isSignedIn && (profileRole.role == "admin") ?
                (
                    <TouchableOpacity style={HomeStyle.fab} onPress={() => navigation.navigate("PushNotificationScreen")}>
                        <Feather name="plus" size={24} color={appPrimaryColor} />
                    </TouchableOpacity>
                )
                :
                null
            }
        </SafeAreaView>
    );
}
