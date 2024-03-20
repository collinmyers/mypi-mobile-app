import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import { DATABASE_ID, MAP_COLLECTION_ID, account, database } from "../../utils/Config/appwriteConfig";
import { Query } from "appwrite";
import SidebarStyle from "../../styling/SidebarStyle";


export default function FoodTruckUnshareScreen() {


    const [profileRole, setProfileRole] = useState({
        role: "",
    });
    const [isSignedIn, setIsSignedIn] = useState(false);

    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [pointData, setPointData] = useState([]);
    const [truckName, setTruckName] = useState();
    const [userID, setUserID] = useState("");
    const [goodStatus, setGoodStatus] = useState(true);


    const PAGE_SIZE = 25;


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

        // try {
        //     await database.deleteDocument(
        //         DATABASE_ID,
        //         MAP_COLLECTION_ID,

        //     );
        // } catch (error) {
        //     console.error(error);
        // }
    };

    useEffect(() => {
        const getLocations = async () => {
            //Get locations from the database
            try {
                let offset = 0;
                let allPoints = [];

                const response = await database.listDocuments(
                    DATABASE_ID,
                    MAP_COLLECTION_ID,
                    [Query.limit(PAGE_SIZE), Query.offset(offset)]
                );

                while (response.documents.length > 0) {
                    allPoints = [...allPoints, ...response.documents];
                    offset += PAGE_SIZE;
                    const nextResponse = await database.listDocuments(
                        DATABASE_ID,
                        MAP_COLLECTION_ID,
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


        checkAuthState();
        getLocations();

    }, []);

    return (
        <SafeAreaView style={AppStyle.container}>


            <TouchableOpacity>
                <Text>Unshare Location</Text>
            </TouchableOpacity>

            <Snackbar
                visible={isSnackbarVisible}
                maxFontSizeMultiplier={1}
                style={SidebarStyle.snackBar}
                onDismiss={() => {
                    setIsSnackbarVisible(false);
                }}
                duration={5000}
            >
                {"Location Unshared!"}
            </Snackbar>

        </SafeAreaView>
    );
}

