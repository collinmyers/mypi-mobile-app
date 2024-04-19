import React, { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Modal, Text } from "react-native-paper";
import SidebarStyle from "../../styling/SidebarStyle";
import { DATABASE_ID, FOOD_TRUCK_POI, MAP_COLLECTION_ID, USER_ALIAS_TABLE_ID, account, database, subscribeToRealTimeUpdates } from "../../utils/Config/config";
import { Dropdown } from "react-native-element-dropdown";
import { appPrimaryColor, appSecondaryColor, appWarningColor } from "../../utils/colors/appColors";
import { ID, Query } from "appwrite";
import { useNetwork } from "../../components/context/NetworkContext";
import { ScrollView } from "react-native-gesture-handler";
import HomeStyle from "../../styling/HomeStyle";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

export default function FoodTruckScreen() {
    const PAGE_SIZE = 25;

    const { isInternetReachable } = useNetwork();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [truckName, setTruckName] = useState();
    const [userID, setUserID] = useState("");
    const [aliasExist, setAliasExist] = useState(true);
    const [unsharedPointsData, setUnsharedPointsData] = useState([]);
    const [sharedPointsData, setSharedPointsData] = useState([]);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [fetchingFinished, setFetchFinished] = useState(false);
    const [message, setMessage] = useState("");
    const [addNew, setAddNew] = useState(false);
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

        if (isSignedIn && (profileRole.role.includes("FoodTruck")) && aliasExist) {
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

            } catch (error) {
                console.error(error);
            }

        }
        else {
            console.error("Something else went wrong");
        }
        setAddNew(false);
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

        if (isSignedIn && (profileRole.role.includes("FoodTruck")) && aliasExist) {

            //Find attribute's index, in the point data use State, then delete based on it's id...
            let index = findIndex("Name", selectedLocation);

            try {
                await database.deleteDocument(
                    DATABASE_ID,
                    MAP_COLLECTION_ID,
                    (sharedPointsData.at(index).$id)
                );

                // Update pointData after successful deletion
                const updatedPointData = sharedPointsData.filter((_, i) => i !== index);
                setSharedPointsData(updatedPointData);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (sharedPointsData.length > 0 ) {
            setMessage("");
        } else if (sharedPointsData.length === 0 && fetchingFinished) {
            setMessage("No Food Trucks have been shared yet");
        }
    }, [sharedPointsData.length, fetchingFinished]);


    useEffect(() => {

        const handleSubscription_getUnshared = async () => {
            try {
                await getUnsharedLocations();
            } catch (error) {
                console.error(error);
            }
        };

        // Subscribe to real-time updates for available poi for vendors
        const unsubscribe_getUnshared = subscribeToRealTimeUpdates(handleSubscription_getUnshared, FOOD_TRUCK_POI);

        const handleSubscription_getShared = async () => {
            try {
                await getSharedLocations();
            } catch (error) {
                console.error(error);
            }
        };

        // Subscribe to real-time updates for map 
        const unsubscribe_getShared = subscribeToRealTimeUpdates(handleSubscription_getShared, MAP_COLLECTION_ID);

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
                setAliasExist(false);
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
                setAliasExist(true);
            }
            else {
                setAliasExist(false);
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
                setFetchFinished(true);
            } catch (error) {
                console.error(error);
            }
        };

        checkAuthState();
        getUserAlias();
        getUnsharedLocations();
        getSharedLocations();

        return () => {
            unsubscribe_getUnshared();
            unsubscribe_getShared();
        };

    }, [userID, isInternetReachable, truckName]);


    const renderPoints = (sharedPoints) => {
        return sharedPoints.map((sharedPoint, index) => (
            <View style={SidebarStyle.pointContainer} key={`${index}_${sharedPoint.Name}`} id={alert.NotificationType}>
                <View style={SidebarStyle.pointTitleView}>
                    <Text style={SidebarStyle.pointTitle}>{sharedPoint.Name}</Text>
                </View>
                <View style={SidebarStyle.removePoint}>
                    <FontAwesome style={SidebarStyle.trashIcon} name="trash-o" size={30} color={appWarningColor} onPress={() => showDeleteModal()} />
                </View>
            </View>
        ));
    };

    const showDeleteModal = () => {
        setIsDeleteModalVisible(true);
    };

    const DeleteConfirmationModal = () => {
        return (
            <Modal visible={isDeleteModalVisible} transparent>
                <View style={SidebarStyle.deleteModalContainer}>
                    <View style={HomeStyle.modalContentContainer}>
                        <Text style={HomeStyle.modalText}>Are you sure you want to delete your location?</Text>
                        <View style={HomeStyle.deleteNotificationsButtonContainer}>
                            <TouchableOpacity onPress={() => setIsDeleteModalVisible(false)} style={HomeStyle.modalCancelButton}>
                                <Text style={HomeStyle.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setIsDeleteModalVisible(false);
                                unshareLocation();
                            }} style={HomeStyle.modalDeleteButton}>
                                <Text style={HomeStyle.modalButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={SidebarStyle.container}>
            <ScrollView style={{ width: "100%", }} containerStyle={{ justifyContent: "center" }}>
                <View style={SidebarStyle.addPointView}>
                    {
                        sharedPointsData.length > 0 ?
                            renderPoints(sharedPointsData)
                            :
                            <Text style={SidebarStyle.noMessage}>
                                {message}
                            </Text>
                    }
                    {!addNew &&
                        <TouchableOpacity style={SidebarStyle.fab} onPress={() => setAddNew(!addNew)}>
                            <FontAwesome6 name="plus" size={30} color={appPrimaryColor} />
                        </TouchableOpacity>
                    }
                </View>

                {addNew && (
                    <>
                        <Text style={SidebarStyle.dropdownLabel}>
                            Select Location
                        </Text>
                        <View style={SidebarStyle.dropdrop}>
                            <Dropdown
                                placeholder="Choose a Location"
                                placeholderStyle={{ textAlign: "center", fontWeight: 500, color: appSecondaryColor }}
                                selectedTextStyle={{ color: appSecondaryColor, textAlign: "center" }}
                                containerStyle={{ backgroundColor: appPrimaryColor, borderRadius: 10 }}
                                itemTextStyle={{ color: appSecondaryColor, fontWeight: 500 }}
                                data={unsharedPointsData}
                                maxHeight={"75%"}
                                labelField="Name"
                                valueField="Name"
                                value={selectedLocation}
                                onChange={item => {
                                    setSelectedLocation(item.Name);
                                }}
                            />
                        </View>

                        <View style={SidebarStyle.multiFABContainer}>
                            <TouchableOpacity style={SidebarStyle.cancelFAB} onPress={() => setAddNew(!addNew)}>
                                <MaterialIcons style={{ alignSelf: "center" }} name="close" size={30} color={appPrimaryColor} />
                            </TouchableOpacity>
                            <TouchableOpacity style={SidebarStyle.shareFAB} onPress={() => shareLocation()}>
                                <MaterialIcons name="check" size={30} color={appPrimaryColor} />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </ScrollView>
            <DeleteConfirmationModal />
        </SafeAreaView>
    );
}

