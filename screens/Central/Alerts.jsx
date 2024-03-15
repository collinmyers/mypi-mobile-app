import * as Network from "expo-network";
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text, Button } from "react-native-paper";
import { account, database, DATABASE_ID, ALERTS_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { Query } from "appwrite";
import * as Notifications from "expo-notifications";
import HomeStyle from "../../styling/HomeStyle";
import { useNavigation } from "@react-navigation/native";
import { appPrimaryColor, appQuarternaryColor, appSecondaryColor, appTextColor } from "../../utils/colors/appColors";
import { subscribeToRealTimeUpdates } from "../../utils/Config/appwriteConfig";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useRoute } from "@react-navigation/native";
import { differenceInSeconds } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";

export default function AlertsScreen() {

    const navigation = useNavigation();

    const route = useRoute();
    const { showEditNotifications } = route.params;

    const PAGE_SIZE = 25;

    const [localDateTime, setLocalDateTime] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("notifications");
    const [isLoading, setIsLoading] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [alertData, setAlertData] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [fullList, setFullList] = useState([]);
    const [profileRole, setProfileRole] = useState({
        role: "",
    });


    useFocusEffect(React.useCallback(() => {
        const currentDate = new Date();
        const localTimeZoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
        const localDateTime = new Date(currentDate.getTime() - localTimeZoneOffset);

        setLocalDateTime(localDateTime);
    }, []));

    useEffect(() => {
        handleFilterById(selectedCategory);
        renderAlerts(filterList.filter((alert) => !alert.isDismissed && alert.NotificationType === selectedCategory));
    }, [showEditNotifications, selectedCategory]);

    useEffect(() => {
        // Function to handle real-time updates
        const handleSubscription = async () => {
            try {
                await fetchData(true); // Pass true to indicate a real-time update

                // Update filterList based on the current category
                handleFilterById(selectedCategory);
            } catch (error) {
                console.error(error);
            }
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

                let offset = 0;
                let response;
                do {
                    response = await database.listDocuments(
                        DATABASE_ID,
                        ALERTS_COLLECTION_ID,
                        [Query.limit(PAGE_SIZE), Query.offset(offset)]
                    );

                    allAlerts = [...allAlerts, ...response.documents];
                    offset += PAGE_SIZE;
                } while (response.documents.length > 0);

                const updatedAlerts = allAlerts.map((newAlert) => {
                    const isDismissed = existingAlertsMap.get(newAlert.$id) || false;
                    const updatedAlert = { ...newAlert, isDismissed };

                    delete updatedAlert.$collectionId;
                    delete updatedAlert.$databaseId;
                    delete updatedAlert.$permissions;
                    delete updatedAlert.$updatedAt;
                    delete updatedAlert.AlertType;

                    return updatedAlert;
                });

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
                console.log("Data saved to file:", fileUri);
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

    }, []);


    useEffect(() => {
        if (alertData.length > 0) {
            setIsLoading(false);
        }
    }, [alertData]);

    const toggleDismissed = async (alertId) => {
        try {
            // 1. Create a copy for immediate UI updates
            const newAlertData = [...alertData];

            // 2. Find the alert to update
            const alertIndex = newAlertData.findIndex((alert) => alert.$id === alertId);

            if (alertIndex !== -1) {
                // 3. Toggle the isDismissed property
                newAlertData[alertIndex].isDismissed = !newAlertData[alertIndex].isDismissed;

                // 4. Update the state for UI changes
                setAlertData(newAlertData);

                // 5. Update the file system
                await updateAlertFile(alertId, newAlertData[alertIndex].isDismissed);
            } else {
                console.error(`Alert with ID ${alertId} not found.`);
            }
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

    // TODO: Fix notification age issue
    const notificationAge = (dateTime) => {
        // console.log(dateTime);
        // console.log(localDateTime);
        const secondsDifference = differenceInSeconds(localDateTime, dateTime);
        const days = Math.floor(secondsDifference / (24 * 60 * 60));

        if (days > 0) {
            return `${days}d`;
        }

        const hours = Math.floor(secondsDifference / (60 * 60));
        if (hours > 0) {
            return `${hours}h`;
        }

        const minutes = Math.floor(secondsDifference / 60);
        if (minutes > 0) {
            return `${minutes}m`;
        }

        return "now";
    };

    const renderAlerts = (alerts) => {
        return alerts.map((alert, index) => (
            <View style={HomeStyle.alertCard} key={`${index}_${alert.Name}`} id={alert.NotificationType}>
                <View style={HomeStyle.alertCardContent}>
                    <Text style={HomeStyle.alertListTitle}>{alert.Title}</Text>
                    <Text style={HomeStyle.alertListDetails}>{alert.Details}</Text>
                </View>

                {!showEditNotifications && (<View style={HomeStyle.notificationAgeContainer}>
                    <Text style={HomeStyle.notificationAge}>
                        {notificationAge(alert.$createdAt)}
                    </Text>
                </View>)
                }

                {showEditNotifications && (
                    <View style={alert.isDismissed ? HomeStyle.notificationEditIconsFalse : HomeStyle.notificationEditIconsTrue}>
                        <FontAwesome5
                            name={alert.isDismissed ? "bell-slash" : "bell"}
                            size={24}
                            color={appQuarternaryColor}
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
