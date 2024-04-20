import * as Network from "expo-network";
import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { database, DATABASE_ID, ABOUT_COLLECTIONS_ID, subscribeToRealTimeUpdates } from "../../utils/Config/config";
import { Query } from "appwrite";
import * as FileSystem from "expo-file-system";
import { useNetwork } from "../../components/context/NetworkContext";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import { appSecondaryColor } from "../../utils/colors/appColors";
import { useAppState } from "../../components/context/AppStateContext";

export default function ParkInfoScreen() {
    const PAGE_SIZE = 25;

    const { isInternetReachable } = useNetwork();
    const { isAppActive } = useAppState();
    const [parkAboutData, setParkAboutData] = useState([]);
    const [partnershipAboutData, setPartnershipAboutData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchingFinished, setFetchFinished] = useState(false);

    useEffect(() => {
        if ((parkAboutData.length > 0 && partnershipAboutData) || fetchingFinished) {
            setIsLoading(false);
        }
    }, [parkAboutData.length, partnershipAboutData.length, fetchingFinished]);

    useEffect(() => {
        const handleSubscription = () => {
            checkNetworkConnectivityAndFetchData();
        };
        // Subscribe to real-time updates
        const unsubscribe = subscribeToRealTimeUpdates(handleSubscription, ABOUT_COLLECTIONS_ID);


        const fetchData = async () => {
            try {
                let offset = 0;
                let allAbout = [];

                const response = await database.listDocuments(
                    DATABASE_ID,
                    ABOUT_COLLECTIONS_ID,
                    [Query.limit(PAGE_SIZE), Query.offset(offset)]
                );

                while (response.documents.length > 0) {
                    allAbout = [...allAbout, ...response.documents];
                    offset += PAGE_SIZE;
                    const nextResponse = await database.listDocuments(
                        DATABASE_ID,
                        ABOUT_COLLECTIONS_ID,
                        [Query.limit(PAGE_SIZE), Query.offset(offset)]
                    );
                    response.documents = nextResponse.documents;
                }

                allAbout.map((info) => {
                    delete info.$createdAt;
                    delete info.$collectionId;
                    delete info.$databaseId;
                    delete info.$permissions;
                    delete info.$updatedAt;
                });

                const parkData = allAbout.filter(item => item.AboutType === "park");
                const partnershipData = allAbout.filter(item => item.AboutType === "partnership");
                setParkAboutData(parkData);
                setPartnershipAboutData(partnershipData);
                await saveDataToFile(allAbout); // Save fetched data to file
                setFetchFinished(true);
            } catch (error) {
                console.error(error);
            }
        };

        const saveDataToFile = async (data) => {
            try {
                const fileUri = FileSystem.documentDirectory + "about.json";
                await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                console.log("Data saved to file:", fileUri);
            } catch (error) {
                console.error("Error saving data to file: ", error);
            }
        };

        const loadDataFromFile = async () => {
            try {
                const fileUri = FileSystem.documentDirectory + "about.json";
                const fileContents = await FileSystem.readAsStringAsync(fileUri);
                const data = JSON.parse(fileContents);
                const parkData = data.filter(item => item.AboutType === "park");
                const partnershipData = data.filter(item => item.AboutType === "partnership");
                setParkAboutData(parkData);
                setPartnershipAboutData(partnershipData);
                console.log("data retrieved from file: ", fileUri);
            } catch (error) {
                console.error("Error reading data from file: ", error);
            }
        };

        const checkNetworkConnectivityAndFetchData = async () => {
            try {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                    fetchData(); // Fetch data from appwrite if connected
                } else {
                    loadDataFromFile();
                }
            } catch (error) {
                console.error("Error checking network connectivity: ", error);
            }
        };

        // Check if data is available offline
        FileSystem.getInfoAsync(FileSystem.documentDirectory + "about.json")
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

    }, [isInternetReachable, isAppActive]);


    const renderAbout = (aboutData) => {
        return aboutData.map((item) => (
            <View style={HomeStyle.aboutSection} key={item.$id}>
                <Text style={HomeStyle.aboutTitle}>{item.Title}</Text>
                <Text style={HomeStyle.aboutDescription}>{item.Description}</Text>
            </View>
        ));
    };

    return (
        <SafeAreaView style={AppStyle.container}>
            {isLoading ? (
                <View style={HomeStyle.loadingContainer}>
                    <ActivityIndicator animating={true} color={appSecondaryColor} size="large" />
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} style={HomeStyle.sidebarScrollView}>
                    <Text allowFontScaling={false} style={HomeStyle.aboutHeaders}>About The Park</Text>
                    {renderAbout(parkAboutData)}
                    <Text allowFontScaling={false} style={HomeStyle.aboutHeaders}>About The Partnership</Text>
                    {renderAbout(partnershipAboutData)}
                </ScrollView>
            )}
        </SafeAreaView>
    );

}

