import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Modal, Text, Snackbar } from "react-native-paper";
import SidebarStyle from "../../../styling/SidebarStyle";
import { DATABASE_ID, FOOD_TRUCK_POI, MAP_COLLECTION_ID, USER_ALIAS_TABLE_ID, account, database } from "../../../utils/Config/config";
import { Dropdown } from "react-native-element-dropdown";
import { appPrimaryColor, appSecondaryColor, appWarningColor } from "../../../utils/colors/appColors";
import { ID, Query } from "appwrite";
import { useFocusEffect } from "@react-navigation/native";
import { useNetwork } from "../../../components/context/NetworkContext";
import { appTextColor } from "../../../utils/colors/appColors";
import { ScrollView } from "react-native-gesture-handler";
import HomeStyle from "../../../styling/HomeStyle";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default function FoodTruckShareScreen() {
    const PAGE_SIZE = 25;

    const { isInternetReachable } = useNetwork();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Beach 1");
    const [truckName, setTruckName] = useState();
    const [userID, setUserID] = useState("");
    const [goodStatus, setGoodStatus] = useState(true);
    const [unsharedPointsData, setUnsharedPointsData] = useState([]);
    const [sharedPointsData, setSharedPointsData] = useState([]);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [failSnackbarVisible, setFailSnackbarVisible] = useState(false);
    const [profileRole, setProfileRole] = useState({
        role: "",
    });

    const shareLocation = async () => {

        //Function to find subjson inside of the big json
        function findIndex(attribute, value) {
            for (let i = 0; i < unsharedPointsData.length; i++) {
                if (unsharedPointsData[i][attribute] === value) {
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
                    { Name: truckName + " " + selectedLocation, Latitude: unsharedPointsData.at(index).Latitude + offset, Longitude: unsharedPointsData.at(index).Longitude + offset, Status: "Open", Type: "FoodTruck" }
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

    const unshareLocation = async () => {

        //Function to find subjson inside of the big json
        function findIndex(attribute, value) {
            for (let i = 0; i < sharedPointsData.length; i++) {
                if (sharedPointsData[i][attribute] === value) {
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
                    (sharedPointsData.at(index).$id)
                );
                setIsSnackbarVisible(true);

                // Update pointData after successful deletion
                const updatedPointData = sharedPointsData.filter((_, i) => i !== index);
                setSharedPointsData(updatedPointData);
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

        const getUnsharedLocations = async () => {
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

                setUnsharedPointsData(allPoints);


            } catch (error) {
                console.error(error);
            }

        };
        const getSharedLocations = async () => {
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
                setSharedPointsData(allPoints);
            } catch (error) {
                console.error(error);
            }
        };

        checkAuthState();
        getUserAlias();
        getUnsharedLocations();
        getSharedLocations();

    }, [userID, isInternetReachable, truckName]));


    const renderPoints = (sharedPoints) => {
        return sharedPoints.map((sharedPoint, index) => (
            <View style={HomeStyle.alertCard} key={`${index}_${sharedPoint.Name}`} id={alert.NotificationType}>
                <View style={HomeStyle.alertCardContent}>
                    <Text style={HomeStyle.alertListTitle}>{sharedPoint.Name}</Text>
                </View>
                <View style={HomeStyle.manageNotification}>
                    <FontAwesome style={HomeStyle.manageDelete} name="trash-o" size={30} color={appWarningColor} onPress={() => console.log("hi")} />
                </View>
            </View>
        ));
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
                                unshareLocation()
                                setIsDeleteModalVisible(false);
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


    return (
        <SafeAreaView style={SidebarStyle.container}>
            <ScrollView style={{ width: "100%", }} containerStyle={{ justifyContent: "center" }}>
                {renderPoints(sharedPointsData)}
                <Text style={SidebarStyle.dropdownLabel}>
                    Select Location
                </Text>
                <View style={SidebarStyle.dropdrop}>
                    <Dropdown
                        selectedTextStyle={{ color: appSecondaryColor, textAlign: "center" }}
                        containerStyle={{ backgroundColor: appPrimaryColor, borderRadius: 10 }}
                        data={unsharedPointsData}
                        labelField="Name"
                        valueField="Name"
                        value={selectedLocation}
                        onChange={item => {
                            setSelectedLocation(item.Name);
                        }}
                    />
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

