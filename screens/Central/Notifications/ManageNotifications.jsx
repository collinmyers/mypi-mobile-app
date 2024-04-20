import * as Network from "expo-network";
import React, { useState, useEffect } from "react";
import { Modal, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { account, database, DATABASE_ID, ALERTS_COLLECTION_ID, subscribeToRealTimeUpdates } from "../../../utils/Config/config";
import { Query } from "appwrite";
import HomeStyle from "../../../styling/HomeStyle";
import { useNavigation } from "@react-navigation/native";
import { appPrimaryColor, appQuarternaryColor, appSecondaryColor, appWarningColor, } from "../../../utils/colors/appColors";
import { MaterialCommunityIcons, FontAwesome6, FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import PropTypes from "prop-types";
import { useNetwork } from "../../../components/context/NetworkContext";
import { useAuth } from "../../../components/context/AuthContext";
import { useAppState } from "../../../components/context/AppStateContext";

export default function ManageAlertsScreen() {
    const PAGE_SIZE = 25;

    const navigation = useNavigation();

    const { isAppActive } = useAppState();
    const { isInternetReachable } = useNetwork();
    const { isSignedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isSignedInLocal, setisSignedInLocal] = useState(false);
    const [alertData, setAlertData] = useState([]);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);
    const [profileRoles, setProfileRoles] = useState([]);
    const [fetchingFinished, setFetchFinished] = useState(false);


    useEffect(() => {
        if (alertData.length > 0 || fetchingFinished) {
            setIsLoading(false);
        }
    }, [alertData.length, fetchingFinished]);

    useEffect(() => {
        const handleSubscription = async () => {
            try {
                await fetchData();
            } catch (error) {
                console.error(error);
            }
        };

        // Subscribe to real-time updates
        const unsubscribe = subscribeToRealTimeUpdates(handleSubscription, ALERTS_COLLECTION_ID);

        const fetchData = async () => {
            try {
                let allAlerts = [];

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

                // Sort to show newest notifications first
                allAlerts.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

                allAlerts.map((alert) => {
                    delete alert.$collectionId;
                    delete alert.$databaseId;
                    delete alert.$permissions;
                    delete alert.$updatedAt;
                    delete alert.$AlertType;
                });

                setAlertData(allAlerts);
                await saveDataToFile(allAlerts); // Save fetched data to file
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

        return () => {
            unsubscribe();
        };

    }, [isInternetReachable, isAppActive]);

    useEffect(() => {
        getNameAndRole();
        if (!isSignedIn) {
            navigation.goBack();
        }
    }, [isSignedIn]);

    const handleDeleteNotification = async (documentID) => {
        try {
            await database.deleteDocument(DATABASE_ID, ALERTS_COLLECTION_ID, documentID);
        } catch (error) {
            console.error(error);
        }
    };

    const showDeleteModal = (documentID) => {
        setSelectedDocumentId(documentID);
        setIsDeleteModalVisible(true);
    };

    const DeleteConfirmationModal = ({ documentID }) => {
        return (
            <Modal visible={isDeleteModalVisible} transparent>
                <View style={HomeStyle.modalContainer}>
                    <View style={HomeStyle.modalContentContainer}>
                        <Text style={HomeStyle.modalText}>Are you sure you want to delete the notification?</Text>
                        <View style={HomeStyle.deleteNotificationsButtonContainer}>
                            <TouchableOpacity onPress={() => setIsDeleteModalVisible(false)} style={HomeStyle.modalCancelButton}>
                                <Text style={HomeStyle.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                handleDeleteNotification(documentID);
                                setIsDeleteModalVisible(false);
                                setSelectedDocumentId(null);
                            }} style={HomeStyle.modalDeleteButton}>
                                <Text style={HomeStyle.modalButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    DeleteConfirmationModal.propTypes = {
        documentID: PropTypes.string,
    };

    const goToEditScreen = (index) => {
        navigation.navigate("EditNotificationScreen", {
            DocumentID: alertData[index].$id,
            Title: alertData[index].Title,
            Body: alertData[index].Details,
            Category: alertData[index].NotificationType
        });
    };

    const renderAlerts = (alerts) => {
        return alerts.map((alert, index) => (
            <View style={HomeStyle.alertCard} key={`${index}_${alert.Name}`} id={alert.NotificationType}>
                <View style={HomeStyle.alertCardContent}>
                    <Text style={HomeStyle.alertListTitle}>{alert.Title}</Text>
                    <Text style={HomeStyle.alertListDetails}>{alert.Details}</Text>
                </View>
                <View style={HomeStyle.manageNotification}>
                    <FontAwesome6 style={HomeStyle.manageEdit} name="pencil" size={26} color={appQuarternaryColor} onPress={() => goToEditScreen(index)} />
                    <FontAwesome style={HomeStyle.manageDelete} name="trash-o" size={30} color={appWarningColor} onPress={() => showDeleteModal(alert.$id)} />
                </View>
            </View>
        ));
    };


    const getNameAndRole = async () => {
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
            {isLoading ? (
                <View style={HomeStyle.loadingContainer}>
                    <ActivityIndicator animating={true} color={appSecondaryColor} size="large" />
                </View>
            ) : (
                alertData.length > 0 ?
                    <ScrollView contentContainerStyle={[HomeStyle.scrollableView, { alignItems: "center" }]} showsVerticalScrollIndicator={false}>
                        {renderAlerts(alertData)}
                    </ScrollView>
                    :
                    <Text style={HomeStyle.noNotificationsMessage}>
                        No notifications to manage at this time
                    </Text>
            )}

            {isSignedInLocal && (profileRoles.includes("ManageNotifications")) ?
                (
                    <TouchableOpacity style={HomeStyle.fab} onPress={() => navigation.navigate("PushNotificationScreen")}>
                        <MaterialCommunityIcons name="bell-plus-outline" size={30} color={appPrimaryColor} />
                    </TouchableOpacity>
                )
                :
                null
            }
            <DeleteConfirmationModal documentID={selectedDocumentId} />
        </SafeAreaView>
    );
}
