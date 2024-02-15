import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import HomeStyle from "../../styling/HomeStyle";
import * as Notifications from "expo-notifications";
import { RadioButton, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { database, DATABASE_ID, ALERTS_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { ID } from "appwrite";



Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
    }),
});

async function schedulePushNotification(notifTitle, notifBody) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: notifTitle,
            body: notifBody,
        },
        trigger: null, //Send immediately
        presentation: {
            style: "notification",
        },
    });
}


export default function PushNotificationScreen() {


    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [deliveryTypeChecked, setDeliveryTypeChecked] = useState("in-app");
    const [alertTypeChecked, setAlertTypeChecked] = useState("alerts");

    const alertData = {
        Title: title,
        Details: body,
        AlertType: deliveryTypeChecked,
        NotificationType: alertTypeChecked,
    };


    async function handleNotificationCreation(notificationTitle, notificationBody) {
        if (deliveryTypeChecked == "in-app") {
            //create doc for in app
            const createAlert = database.createDocument(
                DATABASE_ID,
                ALERTS_COLLECTION_ID,
                ID.unique(),
                alertData
            );
            createAlert.then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        }
        else if (deliveryTypeChecked == "push") {
            schedulePushNotification(notificationTitle, notificationBody); //Send out of app
        }
        else {
            //Create doc for in app
            const createAlert = database.createDocument(
                DATABASE_ID,
                ALERTS_COLLECTION_ID,
                ID.unique(),
                alertData
            );

            createAlert.then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });

            schedulePushNotification(notificationTitle, notificationBody); //Send out of app
        }
    }


    return (
        <SafeAreaView style={HomeStyle.alertContainer}>
            <ScrollView>

                <TextInput value={title} onChangeText={title => setTitle(title)} mode="outlined" placeholder="Title"></TextInput>
                <TextInput value={body} onChangeText={body => setBody(body)} mode="outlined" placeholder="Body"></TextInput>

                <View style={HomeStyle.radioGroup}>

                    <View style={HomeStyle.radioButton}>
                        <RadioButton.Android
                            value="in-app"
                            status={deliveryTypeChecked === "in-app" ? "checked" : "unchecked"}
                            onPress={() => setDeliveryTypeChecked("in-app")}
                        />
                        <Text>In App</Text>
                    </View>

                    <View style={HomeStyle.radioButton}>
                        <RadioButton.Android
                            value="push"
                            status={deliveryTypeChecked === "push" ? "checked" : "unchecked"}
                            onPress={() => setDeliveryTypeChecked("push")}
                        />
                        <Text>Out Of App Push</Text>
                    </View>

                    <View style={HomeStyle.radioButton}>
                        <RadioButton.Android
                            value="both"
                            status={deliveryTypeChecked === "both" ? "checked" : "unchecked"}
                            onPress={() => setDeliveryTypeChecked("both")}
                            style={HomeStyle.radioButton}
                        />
                        <Text>Both</Text>
                    </View>

                </View>


                <View style={HomeStyle.radioGroup}>

                    <View style={HomeStyle.radioButton}>
                        <RadioButton.Android
                            value="alerts"
                            status={alertTypeChecked === "alerts" ? "checked" : "unchecked"}
                            onPress={() => setAlertTypeChecked("alerts")}
                        />
                        <Text>Alert</Text>
                    </View>

                    <View style={HomeStyle.radioButton}>
                        <RadioButton.Android
                            value="events"
                            status={alertTypeChecked === "events" ? "checked" : "unchecked"}
                            onPress={() => setAlertTypeChecked("events")}
                        />
                        <Text>Event</Text>
                    </View>

                    <View style={HomeStyle.radioButton}>
                        <RadioButton.Android
                            value="promos"
                            status={alertTypeChecked === "promos" ? "checked" : "unchecked"}
                            onPress={() => setAlertTypeChecked("promos")}
                            style={HomeStyle.radioButton}
                        />
                        <Text>Promo</Text>
                    </View>

                </View>




                <TouchableOpacity style={HomeStyle.pushNotifOpac} onPress={() => handleNotificationCreation(title, body)}>
                    <Text style={HomeStyle.pushNotifText}>Send Notification</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}
