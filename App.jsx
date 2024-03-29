import React, { useEffect } from "react";
import DrawerNavigator from "./components/navigation/DrawerNavigator";
import { setupURLPolyfill } from "react-native-url-polyfill";
import storage from "local-storage-fallback";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { account, database, DATABASE_ID, USER_NOTIFICATION_TOKENS } from "./utils/Config/appwriteConfig";
import { ID } from "appwrite";
import { AuthProvider } from "./components/navigation/AuthContext";
import * as SecureStore from "expo-secure-store";

export default function App() {
    setupURLPolyfill();
    if (!("localStorage" in window)) window.localStorage = storage;

    useEffect(() => {

        let userID = null;

        const handleUserSession = async () => {
            try {
                const authUserStatus = await account.get();
                userID = authUserStatus.$id;

                if (authUserStatus.email === "") console.log("User session already exists (guest user)");

                else console.log("User session already exists (email user)");

            } catch {
                account.createAnonymousSession();
                console.log("Created guest sessions");
            }
        };

        const saveToSecureStore = async (key, value) => {
            try {
                console.log("Saving to secure storage");
                await SecureStore.setItemAsync(key, value);
            } catch (err) {
                console.error(err);
            }
        };

        const getPermissions = async () => {
            await handleUserSession();
            try {
                let token = "";
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
                token = (await Notifications.getExpoPushTokenAsync({ projectID: "myPI" })).data;

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
            } catch (err) {
                console.log(err);
            }
        };
        getPermissions();
    }, []);

    return (
        <AuthProvider>
            <DrawerNavigator />
        </AuthProvider>
    );
}
