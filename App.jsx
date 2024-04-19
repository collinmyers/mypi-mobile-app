import React, { useEffect } from "react";
import DrawerNavigator from "./components/navigation/DrawerNavigator";
import { setupURLPolyfill } from "react-native-url-polyfill";
import storage from "local-storage-fallback";
import { AuthProvider } from "./components/context/AuthContext";
import { NetworkProvider } from "./components/context/NetworkContext";
import { Platform } from "react-native";
import { account, database, DATABASE_ID, EXPO_PROJECT_ID, USER_NOTIFICATION_TOKENS } from "./utils/Config/config";
import { ID } from "appwrite";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";

export default function App() {
    setupURLPolyfill();
    if (!("localStorage" in window)) window.localStorage = storage;

    useEffect(() => {

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
                let userID = null;

                await account.get().then((response) => { // handles user already signed in
                    userID = response.$id;
                    if (response.email === "") console.log("User session already exists (guest user)");
                    else console.log("User session already exists (email user)");
                }).catch((error) => { // creates anonoymous session to send token to backend
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

                // If granted, get the token and create a document in appwrite
                const token = (await Notifications.getExpoPushTokenAsync({ projectId: EXPO_PROJECT_ID })).data;
                console.log(token);

                // Create doc for user's push token. This will run if the expo token is not stored or doesn't match.
                const createTokenDoc = await database.createDocument(
                    DATABASE_ID,
                    USER_NOTIFICATION_TOKENS,
                    ID.unique(),
                    {
                        ExpoPushToken: token,
                        UID: userID
                    }
                );

                if (createTokenDoc) {
                    const pushDoc = { pushToken: token, docID: createTokenDoc.$id };

                    // Serialize the pushDoc object to a string
                    const pushDocString = JSON.stringify(pushDoc);

                    const pushKey = "pushNotification";
                    // Store the serialized object in secure storage
                    await saveToSecureStore(pushKey, pushDocString);
                }
            } catch (error) {
                console.warn(error);
            }
        };
        getPermissions();
    }, []);


    return (
        <NetworkProvider>
            <AuthProvider>
                <DrawerNavigator />
            </AuthProvider>
        </NetworkProvider>
    );
}
