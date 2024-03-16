import * as Network from "expo-network";
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { account, database, DATABASE_ID, ALERTS_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { Query } from "appwrite";
import HomeStyle from "../../styling/HomeStyle";
import { useNavigation } from "@react-navigation/native";
import { appPrimaryColor, appQuarternaryColor, appSecondaryColor, appWarningColor, } from "../../utils/colors/appColors";
import { subscribeToRealTimeUpdates } from "../../utils/Config/appwriteConfig";
import { MaterialCommunityIcons, FontAwesome6, FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";

export default function AlertsScreen() {

    const navigation = useNavigation();

    const PAGE_SIZE = 25;

    const [isLoading, setIsLoading] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [alertData, setAlertData] = useState([]);
    // const [fullList, setFullList] = useState([]);
    const [profileRole, setProfileRole] = useState({
        role: "",
    });

    useFocusEffect(React.useCallback(() => {

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

                setAlertData(allAlerts);
                // setFullList(allAlerts);
                await saveDataToFile(allAlerts); // Save fetched data to file
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
                // setFullList(data);
            } catch (error) {
                console.error("Error reading data from file: ", error);
                setAlertData([]);
                // setFullList([]);
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

    }, []));


    useEffect(() => {
        if (alertData.length > 0) {
            setIsLoading(false);
        }
    }, [alertData]);


    const renderAlerts = (alerts) => {
        return alerts.map((alert, index) => (
            <View style={HomeStyle.alertCard} key={`${index}_${alert.Name}`} id={alert.NotificationType}>
                <View style={HomeStyle.alertCardContent}>
                    <Text style={HomeStyle.alertListTitle}>{alert.Title}</Text>
                    <Text style={HomeStyle.alertListDetails}>{alert.Details}</Text>
                </View>
                <View style={HomeStyle.manageNotification}>
                    <FontAwesome6 style={HomeStyle.manageEdit} name="pencil" size={24} color={appQuarternaryColor} />
                    <FontAwesome style={HomeStyle.manageDelete} name="trash-o" size={26} color={appWarningColor} />
                </View>

            </View>
        ));
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

            {isLoading ? (
                <View style={HomeStyle.loadingContainer}>
                    <ActivityIndicator animating={true} color={appSecondaryColor} size="large" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={[HomeStyle.scrollableView, { alignItems: "center" }]} showsVerticalScrollIndicator={false}>
                    {renderAlerts(alertData)}
                </ScrollView>
            )}

            {isSignedIn && (profileRole.role == "admin") ?
                (
                    <TouchableOpacity style={HomeStyle.fab} onPress={() => navigation.navigate("PushNotificationScreen")}>
                        <MaterialCommunityIcons name="bell-plus-outline" size={30} color={appPrimaryColor} />
                    </TouchableOpacity>
                )
                :
                null
            }
        </SafeAreaView>
    );
}
