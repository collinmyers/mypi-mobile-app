import * as Network from "expo-network";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text, Button } from "react-native-paper";
import { account, database, DATABASE_ID, ALERTS_COLLECTION_ID, subscribeToRealTimeUpdates } from "../../../utils/Config/config";
import { Query } from "appwrite";
import HomeStyle from "../../../styling/HomeStyle";
import { useNavigation } from "@react-navigation/native";
import { appPrimaryColor, appQuarternaryColor, appSecondaryColor, appTextColor } from "../../../utils/colors/appColors";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useRoute } from "@react-navigation/native";
import { differenceInSeconds } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";
import { useNetwork } from "../../../components/context/NetworkContext";
import { useAuth } from "../../../components/context/AuthContext";
import { useAppState } from "../../../components/context/AppStateContext";

export default function AlertsScreen() {
    const PAGE_SIZE = 25;

    const navigation = useNavigation();

    const route = useRoute();
    const { showEditNotifications } = route.params;

    const { isAppActive } = useAppState();
    const { isInternetReachable } = useNetwork();
    const { isSignedIn } = useAuth();
    const [localDateTime, setLocalDateTime] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("notifications");
    const selectedCategoryRef = useRef("notifications"); // Used to make sure user doesnt get booted back to previous category on real time update
    const [isLoading, setIsLoading] = useState(true);
    const [fetchingFinished, setFetchFinished] = useState(false);
    const [isSignedInLocal, setisSignedInLocal] = useState(false);
    const [alertData, setAlertData] = useState([]);
    const [profileRoles, setProfileRoles] = useState([]);


    useEffect(() => {
        if (alertData.length > 0 || fetchingFinished) {
            setIsLoading(false);
        }
    }, [alertData.length, fetchingFinished]);

    useFocusEffect(React.useCallback(() => {
        setLocalDateTime(new Date());
    }, []));

    useEffect(() => {
        selectedCategoryRef.current = selectedCategory; // Update ref when selectedCategory changes
        handleFilterById(selectedCategoryRef.current);
    }, [selectedCategory, showEditNotifications, isInternetReachable]);

    useEffect(() => {

        const handleSubscription = async () => {
            try {
                await fetchData().then(() => {
                    handleFilterById(selectedCategoryRef.current);
                });
            } catch (error) {
                console.error(error);
            }
        };

        const unsubscribe = subscribeToRealTimeUpdates(handleSubscription, ALERTS_COLLECTION_ID);

        const fetchData = async () => {
            try {
                let allAlerts = [];
                let doesLocalExist = false;
                let existingAlertsMap;
                // Load data from the local file
                const fileUri = FileSystem.documentDirectory + "alertsCard.json";
                let fileContents = "[]";
                try {
                    fileContents = await FileSystem.readAsStringAsync(fileUri);
                    doesLocalExist = true;
                } catch (error) {
                    // If the file doesn't exist, initialize with an empty array
                    fileContents = "[]"; // must be an array as a string due to readAsStringAsync
                }

                if (doesLocalExist) {
                    const localData = JSON.parse(fileContents);
                    existingAlertsMap = new Map(localData.map((alert) => [alert.$id, alert.isDismissed]));
                }

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

                allAlerts.forEach((alert) => {

                    if (doesLocalExist) {
                        const isDismissed = existingAlertsMap.get(alert.$id) || false;
                        alert.isDismissed = isDismissed;
                    } else {
                        alert.isDismissed = false;
                    }

                    delete alert.$collectionId;
                    delete alert.$databaseId;
                    delete alert.$permissions;
                    delete alert.$updatedAt;
                    delete alert.AlertType;
                });

                // Sort to show newest notifications first
                allAlerts.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

                setAlertData(allAlerts);
                setSelectedCategory(selectedCategoryRef.current);
                await saveDataToFile(allAlerts);
                setFetchFinished(true);
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
            } catch (error) {
                console.error("Error reading data from file: ", error);
                setAlertData([]);
            }
        };

        const checkNetworkConnectivityAndFetchData = async () => {
            try {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                    await fetchData();
                } else {
                    loadDataFromFile();
                }
            } catch (error) {
                console.error("Error checking network connectivity: ", error);
            }
        };

        // Check if data is available offline
        FileSystem.getInfoAsync(FileSystem.documentDirectory + "alertsCard.json")
            .then(({ exists }) => {
                if (exists) {
                    loadDataFromFile();
                } else {
                    fetchData();
                }
            })
            .catch(error => console.error("Error checking file: ", error));

        checkNetworkConnectivityAndFetchData();

        return () => {
            unsubscribe();
        };

    }, [isInternetReachable, isAppActive]);


    useEffect(() => {
        getRoles();
    }, [isSignedIn]);

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

    const notificationAge = (dateTime) => {
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

    const handleFilterById = (filterId) => {
        setSelectedCategory(filterId);
    };

    const getRoles = async () => {
        try {
            await account.get().then((response) => {
                setProfileRoles(response.labels);
                setisSignedInLocal(true);
            });
        } catch {
            setisSignedInLocal(false);
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
                    {!showEditNotifications && alertData.filter(alert => !alert.isDismissed && (selectedCategory === "notifications" || alert.NotificationType === selectedCategory)).length > 0 ? (
                        alertData.filter((alert) => {
                            if (selectedCategory === "notifications") {
                                return showEditNotifications || !alert.isDismissed;
                            } else {
                                return (showEditNotifications || !alert.isDismissed) && alert.NotificationType === selectedCategory;
                            }
                        }).map((alert, index) => (
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

                                {alertData.filter(alert => !alert.isDismissed).length == 0 && !showEditNotifications && (
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
                        ))
                    ) : (!showEditNotifications &&
                        <Text style={HomeStyle.noNotificationsMessage}>
                            No new {selectedCategory} at this time
                        </Text>
                    )}
                    {showEditNotifications && (
                        alertData.filter((alert) => {
                            if (selectedCategory === "notifications") {
                                return showEditNotifications || !alert.isDismissed;
                            } else {
                                return (showEditNotifications || !alert.isDismissed) && alert.NotificationType === selectedCategory;
                            }
                        }).map((alert, index) => (
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

                                {alertData.length > 0 && showEditNotifications && (
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
                        ))
                    )}
                </ScrollView>

            )}


            {isSignedInLocal && (profileRoles.includes("ManageNotifications")) ?
                (
                    <TouchableOpacity style={HomeStyle.fab} onPress={() => navigation.navigate("ManageNotficationsScreen")}>
                        <FontAwesome6 name="pencil" size={28} color={appPrimaryColor} />
                    </TouchableOpacity>
                )
                :
                null
            }
        </SafeAreaView>
    );
}
