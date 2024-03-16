import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import HomeStyle from "../../styling/HomeStyle";
import * as Notifications from "expo-notifications";
import { RadioButton, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { database, functions, DATABASE_ID, ALERTS_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { ID } from "appwrite";
import { appQuarternaryColor, appSecondaryColor, appTertiaryColor } from "../../utils/colors/appColors";

export const PUSH_NOTIFICATION_ID = process.env.EXPO_PUBLIC_PUSH_NOTIFICATION_FUNCTION_ID;


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
    }),
});

async function schedulePushNotification(notifTitle, notifBody) {

    // Function parameters
    const params = {
        title: notifTitle,
        body: notifBody
    };

    try {
        const execution = await functions.createExecution(
            PUSH_NOTIFICATION_ID,
            JSON.stringify(params),
            false,
            "/",
            "POST",
            params
        );
        console.log(execution);
    } catch (err) {
        console.error(err.message);
    }

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

    const navigation = useNavigation();


    async function handleNotificationCreation(notificationTitle, notificationBody) {
        try {
            if (title.length === 0 || body.length == 0) throw new Error("Enter all required fields");
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

            navigation.goBack();

        } catch (error) {
            console.error(error);
        }

    }

    // TODO: make sure to see what max length of title and message field is to set limits
    return (
        <SafeAreaView style={HomeStyle.alertContainer}>
            <ScrollView>
                <TextInput
                    value={title}
                    onChangeText={title => setTitle(title)}
                    mode="flat"
                    placeholder="Notification title"
                    multiline={true}
                    placeholderTextColor='gray'
                    textColor={appSecondaryColor}
                    style={HomeStyle.notificatonMessage}
                    underlineColor={appQuarternaryColor}
                    activeUnderlineColor={appQuarternaryColor}
                    selectionColor={appQuarternaryColor}
                    returnKeyType="done"
                    blurOnSubmit={true}
                />

                <TextInput
                    value={body}
                    onChangeText={body => setBody(body)}
                    mode="flat"
                    placeholder="Notification message"
                    multiline={true}
                    placeholderTextColor='gray'
                    textColor={appSecondaryColor}
                    style={HomeStyle.notificatonMessage}
                    underlineColor={appQuarternaryColor}
                    activeUnderlineColor={appQuarternaryColor}
                    selectionColor={appQuarternaryColor}
                    returnKeyType="done"
                    blurOnSubmit={true}
                />

                <View style={HomeStyle.radioGroup}>

                    <Text style={HomeStyle.radioTitle}>Notification Type</Text>
                    <View style={HomeStyle.radioButtons}>
                        <View style={HomeStyle.radio}>
                            <RadioButton.Android
                                value="in-app"
                                status={deliveryTypeChecked === "in-app" ? "checked" : "unchecked"}
                                onPress={() => setDeliveryTypeChecked("in-app")}
                                uncheckedColor={appTertiaryColor}
                                color={appTertiaryColor}
                            />
                            <Text style={HomeStyle.pushRadioText}>In App</Text>
                        </View>

                        <View style={HomeStyle.radio}>
                            <RadioButton.Android
                                value="push"
                                status={deliveryTypeChecked === "push" ? "checked" : "unchecked"}
                                onPress={() => setDeliveryTypeChecked("push")}
                                uncheckedColor={appTertiaryColor}
                                color={appTertiaryColor}
                            />
                            <Text style={HomeStyle.pushRadioText}>Push</Text>
                        </View>

                        <View style={HomeStyle.radio}>
                            <RadioButton.Android
                                value="both"
                                status={deliveryTypeChecked === "both" ? "checked" : "unchecked"}
                                onPress={() => setDeliveryTypeChecked("both")}
                                style={HomeStyle.radioButtons}
                                uncheckedColor={appTertiaryColor}
                                color={appTertiaryColor}
                            />
                            <Text style={HomeStyle.pushRadioText}>Both</Text>
                        </View>
                    </View>


                    <View>
                        <Text style={HomeStyle.radioTitle}>Category</Text>
                        <View style={HomeStyle.radioButtons}>
                            <View style={HomeStyle.radio}>
                                <RadioButton.Android
                                    value="alerts"
                                    status={alertTypeChecked === "alerts" ? "checked" : "unchecked"}
                                    onPress={() => setAlertTypeChecked("alerts")}
                                    uncheckedColor={appTertiaryColor}
                                    color={appTertiaryColor}
                                />
                                <Text style={HomeStyle.pushRadioText}>Alert</Text>
                            </View>

                            <View style={HomeStyle.radio}>
                                <RadioButton.Android
                                    value="events"
                                    status={alertTypeChecked === "events" ? "checked" : "unchecked"}
                                    onPress={() => setAlertTypeChecked("events")}
                                    uncheckedColor={appTertiaryColor}
                                    color={appTertiaryColor}
                                />
                                <Text style={HomeStyle.pushRadioText}>Event</Text>
                            </View>

                            <View style={HomeStyle.radio}>
                                <RadioButton.Android
                                    value="promos"
                                    status={alertTypeChecked === "promos" ? "checked" : "unchecked"}
                                    onPress={() => setAlertTypeChecked("promos")}
                                    style={HomeStyle.radioButtons}
                                    uncheckedColor={appTertiaryColor}
                                    color={appTertiaryColor}
                                />
                                <Text style={HomeStyle.pushRadioText}>Promo</Text>
                            </View>
                        </View>
                    </View>

                </View>




                <TouchableOpacity style={HomeStyle.pushNotifOpac} onPress={() => handleNotificationCreation(title, body)}>
                    <Text style={HomeStyle.pushNotifText}>Send Notification</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}
