import * as Network from "expo-network";
import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { database, DATABASE_ID, FAQ_COLLECTIONS_ID, subscribeToRealTimeUpdates } from "../../utils/Config/config";
import { Query } from "appwrite";
import { FontAwesome6 } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useNetwork } from "../../components/context/NetworkContext";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import { appSecondaryColor } from "../../utils/colors/appColors";
import { useAppState } from "../../components/context/AppStateContext";

export default function FAQScreen() {
    const PAGE_SIZE = 25;
    const { isInternetReachable } = useNetwork();
    const { isAppActive } = useAppState();
    const [faqData, setFaqData] = useState([]);
    const [isExpanded, setIsExpanded] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fetchingFinished, setFetchFinished] = useState(false);


    useEffect(() => {
        if (faqData.length > 0 || fetchingFinished) {
            setIsLoading(false);
        }
    }, [faqData.length, fetchingFinished]);

    useEffect(() => {
        const handleSubscription = () => {
            checkNetworkConnectivityAndFetchData();
        };

        const unsubscribe = subscribeToRealTimeUpdates(handleSubscription, FAQ_COLLECTIONS_ID);

        const fetchData = async () => {
            try {
                let offset = 0;
                let allFAQ = [];

                const response = await database.listDocuments(
                    DATABASE_ID,
                    FAQ_COLLECTIONS_ID,
                    [Query.limit(PAGE_SIZE), Query.offset(offset)]
                );

                while (response.documents.length > 0) {
                    allFAQ = [...allFAQ, ...response.documents];
                    offset += PAGE_SIZE;
                    const nextResponse = await database.listDocuments(
                        DATABASE_ID,
                        FAQ_COLLECTIONS_ID,
                        [Query.limit(PAGE_SIZE), Query.offset(offset)]
                    );
                    response.documents = nextResponse.documents;
                }

                allFAQ.map((info) => {
                    delete info.$createdAt;
                    delete info.$collectionId;
                    delete info.$databaseId;
                    delete info.$permissions;
                    delete info.$updatedAt;
                });

                setFaqData(allFAQ);
                await saveDataToFile(allFAQ);
                setFetchFinished(true);
            } catch (error) {
                console.error(error);
            }
        };

        const saveDataToFile = async (data) => {
            try {
                const fileUri = FileSystem.documentDirectory + "faqInfo.json";
                await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                console.log("Data saved to file:", fileUri);
            } catch (error) {
                console.error("Error saving data to file: ", error);
            }
        };

        const loadDataFromFile = async () => {
            try {
                const fileUri = FileSystem.documentDirectory + "faqInfo.json";
                const fileContents = await FileSystem.readAsStringAsync(fileUri);
                const data = JSON.parse(fileContents);
                setFaqData(data);
                console.log("data retrieved from file: ", fileUri);
            } catch (error) {
                console.error("Error reading data from file: ", error);
            }
        };

        const checkNetworkConnectivityAndFetchData = async () => {
            try {
                const networkState = await Network.getNetworkStateAsync();
                if (networkState.isConnected) {
                    fetchData();
                } else {
                    loadDataFromFile();
                }
            } catch (error) {
                console.error("Error checking network connectivity: ", error);
            }
        };

        // Check if data is available offline
        FileSystem.getInfoAsync(FileSystem.documentDirectory + "faqInfo.json")
            .then(({ exists }) => {
                if (exists) {
                    loadDataFromFile();
                } else {
                    fetchData();
                }
            })
            .catch(error => console.error("Error checking file: ", error));

        checkNetworkConnectivityAndFetchData();

        // Cleanup function
        return () => {
            unsubscribe();
        };

    }, [isInternetReachable, isAppActive]);


    const renderFAQ = (faqData) => {
        return faqData.map((item, index) => (
            <View style={HomeStyle.faqSection} key={item.$id}>
                <TouchableOpacity
                    onPress={() =>
                        setIsExpanded({
                            ...isExpanded,
                            [index]: !isExpanded[index],
                        })
                    }
                    style={HomeStyle.expandFAQOpacity}
                >
                    <Text style={[HomeStyle.faqTitle, { flex: 1 }]}>{item.Question}</Text>
                    <FontAwesome6
                        name={isExpanded[index] ? "minus" : "plus"}
                        size={24}
                        color={appSecondaryColor}
                        style={{ marginLeft: 15, marginRight: 15 }}
                    />
                </TouchableOpacity>
                <Collapsible style={{ marginRight: "12%" }} collapsed={!isExpanded[index]}>
                    <Text style={HomeStyle.faqDescription}>{item.Answer}</Text>
                </Collapsible>
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
                    <Text allowFontScaling={false} style={HomeStyle.aboutHeaders}>Frequent Asked Questions</Text>
                    {renderFAQ(faqData)}

                </ScrollView>
            )}
        </SafeAreaView>
    );

}

