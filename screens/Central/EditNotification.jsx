import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import HomeStyle from "../../styling/HomeStyle";
import { RadioButton, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { database, DATABASE_ID, ALERTS_COLLECTION_ID } from "../../utils/Config/appwriteConfig";
import { appSecondaryColor, appTertiaryColor, appQuarternaryColor } from "../../utils/colors/appColors";

export default function EditNotificationScreen() {

    const navigation = useNavigation();
    const route = useRoute();

    const { DocumentID, Title, Body, Category } = route.params;

    const [editInfo, setEditInfo] = useState({
        DBDocumentID: DocumentID,
        DBTitle: Title,
        DBDetails: Body,
        DBCategory: Category
    });

    const [alertTypeChecked, setAlertTypeChecked] = useState(editInfo.DBCategory);

    const handleEditNotification = async () => {
        try {
            if (editInfo.DBTitle.length === 0 || editInfo.DBDetails.length == 0) throw new Error("Enter all required fields");

            const data = {
                Title: editInfo.DBTitle,
                Details: editInfo.DBDetails,
                NotificationType: alertTypeChecked,
            };

            await database.updateDocument(DATABASE_ID, ALERTS_COLLECTION_ID, editInfo.DBDocumentID, data);

            navigation.goBack();
        }
        catch (error) {
            console.error(error);
        }

    };

    // TODO: make sure to see what max length of title and message field is to set limits
    return (

        <SafeAreaView style={HomeStyle.alertContainer}>
            {console.log(editInfo)}
            <ScrollView>
                <TextInput
                    value={editInfo.DBTitle || ""}
                    onChangeText={title => setEditInfo({ ...editInfo, DBTitle: title })}
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
                    value={editInfo.DBDetails || ""}
                    onChangeText={body => setEditInfo({ ...editInfo, DBDetails: body })}
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

                <TouchableOpacity style={HomeStyle.pushNotifOpac} onPress={() => handleEditNotification()}>
                    <Text style={HomeStyle.pushNotifText}>Update Notification</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}