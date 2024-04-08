import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import HomeStyle from "../../../styling/HomeStyle";
import { RadioButton, TextInput, Snackbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { database, DATABASE_ID, ALERTS_COLLECTION_ID } from "../../../utils/Config/appwriteConfig";
import { appSecondaryColor, appTertiaryColor, appQuarternaryColor } from "../../../utils/colors/appColors";
import AppStyle from "../../../styling/AppStyle";

export default function EditNotificationScreen() {

    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
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
            const stringError = error.toString();

            const missingField = "Error: Enter all required fields";
            const TitleLengthError = 'AppwriteException: Invalid document structure: Attribute "Title" has invalid type. Value must be a valid string and no longer than';
            const DetailsLengthTitle = 'AppwriteException: Invalid document structure: Attribute "Details" has invalid type. Value must be a valid string and no longer than';
            const networkError = "AppwriteException: Network request failed";

            if (stringError.includes(missingField)) {
                setErrorMessage("Please enter all fields and try again.");
                setIsSnackbarVisible(true);
            } else if (stringError.includes(TitleLengthError)) {
                setErrorMessage("The notification title exceeds the character limit. Please shorten it and try again.");
                setIsSnackbarVisible(true);
            } else if (stringError.includes(DetailsLengthTitle)) {
                setErrorMessage("The notification details exceeds the character limit. Please shorten it and try again.");
                setIsSnackbarVisible(true);
            } else if (error.toString() === networkError) {
                setErrorMessage("Network request failed, please check your connection and try again.");
                setIsSnackbarVisible(true);
            } else {
                setErrorMessage("Unknown error occured, please try again.");
                setIsSnackbarVisible(true);
            }
        }

    };

    return (
        <SafeAreaView style={HomeStyle.alertContainer}>
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
            <Snackbar
                visible={isSnackbarVisible}
                maxFontSizeMultiplier={1}
                style={AppStyle.snackBar}
                onDismiss={() => {
                    setIsSnackbarVisible(false);
                    setErrorMessage(""); // Clear the error message
                }}
                duration={3000}
            >
                {errorMessage}
            </Snackbar>
        </SafeAreaView>
    );
}
