import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text, Snackbar } from "react-native-paper";
import SidebarStyle from "../../../styling/SidebarStyle";
import { DATABASE_ID, FOOD_TRUCK_POI, MAP_COLLECTION_ID, USER_ALIAS_TABLE_ID, account, database } from "../../../utils/Config/config";
import { RadioButton } from "react-native-paper";
import { appTertiaryColor } from "../../../utils/colors/appColors";
import { ScrollView } from "react-native-gesture-handler";
import { ID, Query } from "appwrite";
import { useFocusEffect } from "@react-navigation/native";
import { useNetwork } from "../../../components/context/NetworkContext";
import { appTextColor } from "../../../utils/colors/appColors";

export default function FoodTruckShareScreen() {
    const PAGE_SIZE = 25;

    const { isInternetReachable } = useNetwork();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Beach 1");
    const [truckName, setTruckName] = useState();
    const [userID, setUserID] = useState("");
    const [goodStatus, setGoodStatus] = useState(true);
    const [pointData, setPointData] = useState([]);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [failSnackbarVisible, setFailSnackbarVisible] = useState(false);
    const [profileRole, setProfileRole] = useState({
        role: "",
    });


    const shareLocation = async () => {

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
            let index = findIndex("Name", selectedLocation);

            let randomNum = Math.random();

            let offset = randomNum * (0.00030 - 0.00006) + 0.00006;

            try {
                await database.createDocument(
                    DATABASE_ID,
                    MAP_COLLECTION_ID,
                    ID.unique(),
                    { Name: truckName + " " + selectedLocation, Latitude: pointData.at(index).Latitude + offset, Longitude: pointData.at(index).Longitude + offset, Status: "Open", Type: "FoodTruck" }
                );
                setIsSnackbarVisible(true);

            } catch (error) {
                setFailSnackbarVisible(true);
                console.error(error);
            }

        }
        else {
            setFailSnackbarVisible(true);
        }

    };

    const renderButtons = () => {
        return pointData.map((point, index) => (

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

        ));

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
            //Get locations that trucks can go to
            try {
                let offset = 0;
                let allPoints = [];

                const response = await database.listDocuments(
                    DATABASE_ID,
                    FOOD_TRUCK_POI,
                    [Query.limit(PAGE_SIZE), Query.offset(offset)]
                );

                while (response.documents.length > 0) {
                    allPoints = [...allPoints, ...response.documents];
                    offset += PAGE_SIZE;
                    const nextResponse = await database.listDocuments(
                        DATABASE_ID,
                        FOOD_TRUCK_POI,
                        [Query.limit(PAGE_SIZE), Query.offset(offset)]
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

        getLocations();
        checkAuthState();
        getUserAlias();

    }, [userID, isInternetReachable]));

    return (
        <SafeAreaView style={SidebarStyle.container}>

            <ScrollView>

                <View style={SidebarStyle.radioGroup}>

                    {renderButtons()}

                </View>

            </ScrollView>

            <View style={{ paddingTop: 50 }}>
                <TouchableOpacity style={SidebarStyle.ShareLocationButtonOpac} onPress={() => shareLocation()}>
                    <Text style={SidebarStyle.ShareLocationText}>Share Location</Text>

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
                {"Location Shared!"}
            </Snackbar>

            <Snackbar
                visible={failSnackbarVisible}
                maxFontSizeMultiplier={1}
                style={SidebarStyle.snackBarFail}
                onDismiss={() => {
                    setFailSnackbarVisible(false);
                }}
                action={{
                    textColor: appTextColor,
                    label: "Close",
                }}
                duration={5000}
            >
                {"Failed Sharing Location!"}
            </Snackbar>

        </SafeAreaView>
    );
}

