import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Snackbar, Text, RadioButton } from "react-native-paper";
import { DATABASE_ID, MAP_COLLECTION_ID, account, database, USER_ALIAS_TABLE_ID } from "../../../utils/Config/config";
import { Query } from "appwrite";
import SidebarStyle from "../../../styling/SidebarStyle";
import { appTertiaryColor } from "../../../utils/colors/appColors";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { useNetwork } from "../../../components/context/NetworkContext";
import { appTextColor } from "../../../utils/colors/appColors";

export default function FoodTruckUnshareScreen() {
    const PAGE_SIZE = 25;

    const { isInternetReachable } = useNetwork();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState();
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [pointData, setPointData] = useState([]);
    const [truckName, setTruckName] = useState();
    const [userID, setUserID] = useState("");
    const [goodStatus, setGoodStatus] = useState(true);
    const [buttons, setButtons] = useState();
    const [profileRole, setProfileRole] = useState({
        role: "",
    });

    const UnShareLocation = async () => {

        //Function to find subjson inside of the big json
        function findIndex(attribute, value) {
            for (let i = 0; i < pointData.length; i++) {
                if (pointData[i][attribute] === value) {
                    return i;
                }
            }
            return -1; // If the attribute is not found
        }

        if (isSignedIn && (profileRole.role.includes("FoodTruck")) && goodStatus) {

            //Find attribute's index, in the point data use State, then delete based on it's id...
            let index = findIndex("Name", selectedLocation);

            try {
                await database.deleteDocument(
                    DATABASE_ID,
                    MAP_COLLECTION_ID,
                    (pointData.at(index).$id)
                );
                setIsSnackbarVisible(true);

                // Update pointData after successful deletion
                const updatedPointData = pointData.filter((_, i) => i !== index);
                setPointData(updatedPointData);
            } catch (error) {
                console.error(error);
            }
        }
    };


    useFocusEffect(React.useCallback(() => {

        const checkAuthState = async () => {
            try {

                const response = await account.get();
                if (response.email === "") throw new Error("Not a email user (guest)");

                setProfileRole({
                    role: response.labels,
                });
                setUserID(response.$id);
                setIsSignedIn(true);

            } catch {
                setIsSignedIn(false);
                setGoodStatus(false);
            }

        };

        const getUserAlias = async () => {
            // Get User Alias
            const response = await database.listDocuments(
                DATABASE_ID,
                USER_ALIAS_TABLE_ID,
                [
                    Query.equal("UserID", [userID])
                ]
            );
            if (response.documents.length > 0) {
                setTruckName(response.documents.at(0).UserName);
                setGoodStatus(true);
            }
            else {
                setGoodStatus(false);
            }
        };

        const getLocations = async () => {
            //Get locations from the database
            try {
                let offset = 0;
                let allPoints = [];

                const response = await database.listDocuments(
                    DATABASE_ID,
                    MAP_COLLECTION_ID,
                    [Query.limit(PAGE_SIZE), Query.offset(offset), Query.startsWith("Name", [truckName])]
                );

                while (response.documents.length > 0) {
                    allPoints = [...allPoints, ...response.documents];
                    offset += PAGE_SIZE;
                    const nextResponse = await database.listDocuments(
                        DATABASE_ID,
                        MAP_COLLECTION_ID,
                        [Query.limit(PAGE_SIZE), Query.offset(offset), Query.startsWith("Name", [truckName])]
                    );
                    response.documents = nextResponse.documents;
                }

                allPoints.map((point) => {
                    delete point.$collectionId;
                    delete point.$databaseId;
                    delete point.$permissions;
                    delete point.$updatedAt;
                });
                setPointData(allPoints);

            } catch (error) {
                console.error(error);
            }
        };

        checkAuthState();
        getUserAlias();
        getLocations();

    }, [truckName, userID, isInternetReachable]));

    useEffect(() => {
        const renderButtons = async () => {
            setButtons(pointData.map((point, index) => (
                <View style={SidebarStyle.radio}
                    id={point.Name}
                    key={`${index}_${point.Name}`}
                >
                    <RadioButton.Android
                        value={point.Name}
                        status={selectedLocation === point.Name ? "checked" : "unchecked"}
                        onPress={() => setSelectedLocation(point.Name)}
                        uncheckedColor={appTertiaryColor}
                        color={appTertiaryColor}
                        style={SidebarStyle.radioButtons}
                    />
                    <Text style={SidebarStyle.setRadioText}>{point.Name}</Text>
                </View>
            )));
            if (pointData == "") {
                setButtons(
                    <Text>Location Not Shared!</Text>
                );
            }
        };

        renderButtons();

    }, [pointData, selectedLocation]);

    return (
        <SafeAreaView style={SidebarStyle.container}>
            <ScrollView>
                <View style={SidebarStyle.radioGroup}>
                    {buttons}
                </View>
            </ScrollView>

            <View style={{ paddingTop: 50 }}>
                <TouchableOpacity style={SidebarStyle.ShareLocationButtonOpac} onPress={() => UnShareLocation()}>
                    <Text style={SidebarStyle.ShareLocationText}>Unshare Location</Text>
                </TouchableOpacity>
            </View>

            <Snackbar
                visible={isSnackbarVisible}
                maxFontSizeMultiplier={1}
                style={SidebarStyle.snackBar}
                onDismiss={() => {
                    setIsSnackbarVisible(false);
                }}
                action={{
                    textColor: appTextColor,
                    label: "Close",
                }}
                duration={5000}
            >
                {"Location Unshared!"}
            </Snackbar>
        </SafeAreaView>
    );
}

