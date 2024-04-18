import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { account, APPROVED_NON_PROFIT, DONATIONS_PROVIDER_LINK } from "../../utils/Config/config";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { database, DATABASE_ID, EXPO_PROJECT_ID, USER_NOTIFICATION_TOKENS } from "../../utils/Config/config";
import { ID } from "appwrite";
import Logo from "../../components/logo/AppLogo";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { appPrimaryColor } from "../../utils/colors/appColors";
import { useNetwork } from "../../components/context/NetworkContext";
import { useAuth } from "../../components/context/AuthContext";
import * as SecureStore from "expo-secure-store";

export default function Dashboard() {

    const navigation = useNavigation();
    const { isSignedIn } = useAuth();
    const { isConnected, isInternetReachable } = useNetwork();
    const [isSignedInLocal, setisSignedInLocal] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: "",
    });
    const [pushInfo, setPushInfo] = useState({
        docID: "not set",
        pushToken: "not set",
        hasUpdated: false
    });

    const getNameAndEmail = async () => {
        try {
            const response = await account.get();

            if (response.email === "") throw new Error("Not a email user (guest)");

            setProfileInfo({
                name: response.name,
            });

            setisSignedInLocal(true);
        } catch {
            setisSignedInLocal(false);
        }
    };

    const handleDonationNav = () => {
        if (APPROVED_NON_PROFIT.toLowerCase() === "true") {
            navigation.navigate("Donate");
        } else {
            Linking.openURL(DONATIONS_PROVIDER_LINK).catch(err => console.error("An error occurred", err));
        }
    };

    useEffect(() => {
        if (isConnected && isInternetReachable) {
            getNameAndEmail();
        }
    }, [isInternetReachable, isSignedIn]);

    const getFromSecureStore = async (key) => {
        try {
            const result = await SecureStore.getItemAsync(key);
            if (result) {
                return JSON.parse(result);
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let userID = "not set";
        let token = "not set";

        // const handleUserSession = async () => {
        //     try {
        //         await account.get().then((response) => {
        //             userID = response.$id;

        //         });
        //     } catch {
        //         await account.createAnonymousSession().then(() => {
        //             console.log("Created guest sessions");
        //         }).catch((error) => {
        //             console.error(error);
        //         });
        //     }
        // };

        const saveToSecureStore = async (key, value) => {
            try {
                console.log("Saving to secure storage");
                await SecureStore.setItemAsync(key, value);
            } catch (err) {
                await SecureStore.setItemAsync(key, err);
            }
        };

        const getPermissions = async () => {
            try {

                await account.get().then((response) => {
                    userID = response.$id;
                    if (response.email === "") console.log("User session already exists (guest user)");
                    else console.log("User session already exists (email user)");
                }).catch((error) => {
                    const stringError = error.toString();
                    const notRegistered = "AppwriteException: User (role: guests) missing scope (account)";
                    if (stringError.includes(notRegistered))
                        account.createAnonymousSession().then((response) => {
                            userID = response.$id;
                            console.log("Created guest sessions");
                        });
                });


                if (Platform.OS === "android") {
                    Notifications.setNotificationChannelAsync("default", {
                        name: "default",
                    });
                }

                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== "granted") {
                    console.log("Permission to receive notifications denied.");
                    return;
                }

                let pushDocString = "push doc not set";

                // If granted, get the token and create a document in appwrite
                await Notifications.getExpoPushTokenAsync({ projectId: EXPO_PROJECT_ID }).then((response) => {

                    token = response.data;

                    const pushDoc = { pushToken: token, userID: userID };

                    // Serialize the pushDoc object to a string
                    pushDocString = JSON.stringify(pushDoc);
                }).catch((error) => {
                    token = error.toString();

                    const pushDoc = { pushToken: token, userID: userID };

                    // Serialize the pushDoc object to a string
                    pushDocString = JSON.stringify(pushDoc);
                });



                await saveToSecureStore("pushNotification", pushDocString);

                // // Create doc for user's push token. This will run if the expo token is not stored or doesn't match.
                // const createTokenDoc = await database.createDocument(
                //     DATABASE_ID,
                //     USER_NOTIFICATION_TOKENS,
                //     ID.unique(),
                //     {
                //         ExpoPushToken: token,
                //         UID: userID
                //     }
                // );

                // if (createTokenDoc) {
                //     const pushDoc = { pushToken: token, docID: createTokenDoc.$id };

                //     // Serialize the pushDoc object to a string
                //     const pushDocString = JSON.stringify(pushDoc);

                //     const pushKey = "pushNotification";
                //     // Store the serialized object in secure storage
                //     await saveToSecureStore(pushKey, pushDocString);
                // }
            } catch (error) {
                console.warn(error);
            }
        };
        getPermissions();
    }, []);

    useEffect(() => {
        const testing = async () => {
            await getFromSecureStore("pushNotification").then((response) => {
                setPushInfo({
                    docID: response.userID,
                    pushToken: response.pushToken,
                    hasUpdated: true
                });
            });
        };

        testing();

    }, [pushInfo]);

    return (
        <SafeAreaView style={AppStyle.container}>
            <View style={AppStyle.imageContainer}>
                <Logo logoWidth={250} logoHeight={250} />
            </View>

            <View style={HomeStyle.dbContainer}>

                {/* {isSignedInLocal ?
                    (<Text style={HomeStyle.dbTitleText}>Welcome {profileInfo.name}</Text>) :
                    (<Text style={HomeStyle.dbTitleText}>Welcome to myPI</Text>)
                } */}

                <Text style={HomeStyle.dbTitleText}>USER ID: {pushInfo.docID}</Text>
                <Text style={HomeStyle.dbTitleText}>Push Token: {pushInfo.pushToken}</Text>


                <TouchableOpacity style={HomeStyle.dashboardDonoOpac} onPress={handleDonationNav}>
                    <MaterialIcons style={{ alignSelf: "center" }} name="volunteer-activism" size={24} color={appPrimaryColor} />
                    <Text style={HomeStyle.dashboardDonoText}>Donate Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}