import React, { useEffect } from "react";
import DrawerNavigator from "./components/navigation/DrawerNavigator";
import { setupURLPolyfill } from "react-native-url-polyfill";
import storage from "local-storage-fallback";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { database, DATABASE_ID, USER_NOTIFICATION_TOKENS } from "./utils/Config/appwriteConfig";
import { ID } from "appwrite";
import * as FileSystem from "expo-file-system";

export default function App() {
    setupURLPolyfill();
    if (!("localStorage" in window)) window.localStorage = storage;

    useEffect(() => {
        const getPermissions = async () => {
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

                // Check if expoToken is stored. If it is, do nothing. Else create a new doc...
                const { exists } = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "expoPushToken.json");

                if (exists) {
                    const fileUri = FileSystem.documentDirectory + "expoPushToken.json";
                    const fileContents = await FileSystem.readAsStringAsync(fileUri);
                    const data = JSON.parse(fileContents);
                    console.log("Loaded Stored Token: " + data);
                    if (data === token) {
                        console.log("Already Stored");
                        return;
                    }
                }

                // Create doc for user's push token. This will run if the expo token is not stored or doesn't match.
                const createTokenDoc = database.createDocument(
                    DATABASE_ID,
                    USER_NOTIFICATION_TOKENS,
                    ID.unique(),
                    { ExpoPushToken: token }
                );
                createTokenDoc.then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.log(error);
                });

                writeFile(token);
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        getPermissions();
    }, []);

    const writeFile = async (data) => {
        try {
            const fileUri = FileSystem.documentDirectory + "expoPushToken.json";
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
            console.log("Data saved to file: ", fileUri);
        } catch (error) {
            console.error("Error saving data to file: ", error);
        }
    };


    return (
        <DrawerNavigator />
    );
}
