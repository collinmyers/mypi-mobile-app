import React, { useState, useEffect } from "react";
import { Modal, Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Card, RadioButton, Switch, Text } from "react-native-paper";
import PropTypes from "prop-types";
import HomeStyle from "../../../styling/HomeStyle";
import { saveNavigationPreference } from "../../../utils/AsyncStorage/NavigationPreference";
import { getAutoPlayPreference, saveAutoPlayPreference } from "../../../utils/AsyncStorage/AutoPlayPreference";
import * as Notifications from "expo-notifications";
import { appPrimaryColor, appQuarternaryColor, appSecondaryColor, appTertiaryColor, appTextColor } from "../../../utils/colors/appColors";
import { MaterialCommunityIcons, Entypo, MaterialIcons, Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { account, database, DATABASE_ID, functions, USER_NOTIFICATION_TOKENS, DELETE_USER_FUNCTION_ID, EXPO_PROJECT_ID } from "../../../utils/Config/config";
import { ID } from "appwrite";
import * as Linking from "expo-linking";
import { useAuth } from "../../../components/context/AuthContext";
import { Snackbar } from "react-native-paper";
import AppStyle from "../../../styling/AppStyle";
import * as SecureStore from "expo-secure-store";
import { useNetwork } from "../../../components/context/NetworkContext";
import { useRoute } from "@react-navigation/native";
import { useAppState } from "../../../components/context/AppStateContext";

export default function SettingsScreen({ navigation }) {

    const route = useRoute();
    const { isAppActive } = useAppState();
    const { changeAuthState, setChangeAuthState, isSignedIn, setIsSignedIn } = useAuth();
    const [localSignInState, setLocalSignInState] = useState(false);
    const { isInternetReachable } = useNetwork();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isNavModalVisible, setIsNavModalVisible] = useState(false);
    const [navTypeChecked, setNavTypeChecked] = useState("car");
    const [isPushNotificationEnabled, setIsPushNotificationEnabled] = useState(false);
    const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [isActionOcurring, setIsActionOccuring] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: "",
        email: "",
        identity: ""
    });

    useEffect(() => {
        const getNameAndEmail = async () => {
            try {
                const response = await account.get();

                if (response.email === "") {
                    setLocalSignInState(false);
                    setIsSignedIn(false);
                    throw new Error("Not a email user (guest)");
                }

                setProfileInfo({
                    name: response.name,
                    email: response.email,
                    identity: response.$id
                });
                setLocalSignInState(true);
                setIsSignedIn(true);
            } catch {
                setLocalSignInState(false);
                setIsSignedIn(false);
            }
        };
        getNameAndEmail();

    }, [changeAuthState, isSignedIn, isInternetReachable]);

    useEffect(() => {
        if (route.params?.updateProfileInfo === true) {
            const getNameAndEmail = async () => {
                try {
                    const response = await account.get();

                    if (response.email === "") {
                        setLocalSignInState(false);
                        setIsSignedIn(false);
                        throw new Error("Not a email user (guest)");
                    }

                    setProfileInfo({
                        name: response.name,
                        email: response.email,
                        identity: response.$id
                    });
                    setLocalSignInState(true);
                    setIsSignedIn(true);
                } catch {
                    setLocalSignInState(false);
                    setIsSignedIn(false);
                }
            };
            getNameAndEmail();
        }
    }, [route.params]);

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

    const saveToSecureStore = async (key, value) => {
        try {
            const result = await SecureStore.setItemAsync(key, value);
            if (result) {
                return result;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteFromSecureStore = async (key) => {
        try {
            const result = await SecureStore.deleteItemAsync(key);
            if (result) {
                return result;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    };

    const togglePushNotification = async () => {
        try {
            await Linking.openSettings(); // open device system settings for app
        } catch (error) {
            console.error(error);
        }
    };

    const toggleAutoPlay = async () => {
        const newValue = !isAutoPlayEnabled;
        setIsAutoPlayEnabled(newValue);
        await saveAutoPlayPreference(newValue);
    };

    const handleNavPreferenceChange = async (newPreference) => {
        setNavTypeChecked(newPreference);
        setTimeout(() => {
            setIsNavModalVisible(false);
        }, 300);
        await saveNavigationPreference(newPreference);
    };

    const showNavModal = async () => {
        setIsNavModalVisible(true);
    };

    const NavPreferenceModal = () => {
        return (
            <Modal visible={isNavModalVisible} transparent>
                <View style={HomeStyle.modalNavContainer}>
                    <View style={HomeStyle.modalNavContentContainer}>
                        <Text style={HomeStyle.modalNavText}>Navigation Preference</Text>
                        <View style={HomeStyle.modalNavButtonContainer}>
                            <View style={HomeStyle.settingsRadio}>
                                <RadioButton.Android
                                    value="bike"
                                    status={navTypeChecked === "bike" ? "checked" : "unchecked"}
                                    onPress={() => handleNavPreferenceChange("bike")}
                                    color={appTertiaryColor}
                                    uncheckedColor={appTertiaryColor}
                                />
                                <Text style={HomeStyle.radioText}>Biking</Text>
                            </View>

                            <View style={HomeStyle.settingsRadio}>
                                <RadioButton.Android
                                    value="car"
                                    status={navTypeChecked === "car" ? "checked" : "unchecked"}
                                    onPress={() => handleNavPreferenceChange("car")}
                                    color={appTertiaryColor}
                                    uncheckedColor={appTertiaryColor}
                                />
                                <Text style={HomeStyle.radioText}>Driving</Text>
                            </View>

                            <View style={HomeStyle.settingsRadio}>
                                <RadioButton.Android
                                    value="walk"
                                    status={navTypeChecked === "walk" ? "checked" : "unchecked"}
                                    onPress={() => handleNavPreferenceChange("walk")}
                                    color={appTertiaryColor}
                                    uncheckedColor={appTertiaryColor}
                                />
                                <Text style={HomeStyle.radioText}>Walking</Text>
                            </View>
                        </View>

                        <View style={HomeStyle.modalNavCancelContentContainer}>
                            <TouchableOpacity onPress={() => setIsNavModalVisible(false)} style={HomeStyle.modalNavCancelButton}>
                                <Text style={HomeStyle.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        );
    };

    const showDeleteModal = () => {
        setIsDeleteModalVisible(true);
    };

    const DeleteConfirmationModal = () => {
        return (
            <Modal visible={isDeleteModalVisible} transparent>
                <View style={HomeStyle.modalContainer}>
                    <View style={HomeStyle.modalContentContainer}>
                        <Text style={HomeStyle.modalText}>Are you sure you want to delete your account? All information will be permanently removed.</Text>
                        <View style={HomeStyle.modalButtonContainer}>
                            <TouchableOpacity onPress={() => setIsDeleteModalVisible(false)} style={HomeStyle.modalCancelButton}>
                                <Text style={HomeStyle.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteUserAndData()} style={HomeStyle.modalDeleteButton}>
                                <Text style={HomeStyle.modalButtonText}>Delete Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const deleteUserAndData = async () => {
        if (!isActionOcurring) {
            setIsActionOccuring(true);
            try {
                setIsDeleteModalVisible(false);

                await functions.createExecution(
                    DELETE_USER_FUNCTION_ID,
                    "",
                    false,
                    "/",
                    "DELETE",
                    {}
                )
                    .then((response) => {
                        if (response.responseStatusCode === 200) {
                            setIsErrorMessage(false);
                            setErrorMessage("Account successfully deleted");
                            setIsSnackbarVisible(true);
                        } else {
                            setIsErrorMessage(true);
                            setErrorMessage("Error deleting account, please try again");
                            setIsSnackbarVisible(true);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        setIsErrorMessage(true);
                        setErrorMessage("Error deleting account, please try again");
                        setIsSnackbarVisible(true);
                    });
                setChangeAuthState(!changeAuthState);
                setLocalSignInState(false);
                setIsSignedIn(false);
            } catch (err) {
                console.error(err);
            } finally {
                setIsActionOccuring(false);
                account.createAnonymousSession().then(() => {
                    console.log("created anonomyous session");
                }).catch((error) => console.error(error));
            }
        }
    };

    useFocusEffect(React.useCallback(() => {
        const pushStatus = async () => {
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

                // Request push notification permissions
                const { status } = await Notifications.getPermissionsAsync();

                const pushKey = "pushNotification";
                const pushObject = await getFromSecureStore(pushKey);


                if (status !== "granted") { // if the current status is granted we are in the process of turning off
                    setIsPushNotificationEnabled(false);

                    if (!pushObject) { // user went to settings and didnt change push status
                        return;
                    }

                    const result = await database.deleteDocument(
                        DATABASE_ID, // databaseId
                        USER_NOTIFICATION_TOKENS, // collectionId
                        pushObject.docID // documentId
                    );

                    if (result) {
                        await deleteFromSecureStore(pushKey);
                    }
                    return;

                } else {
                    setIsPushNotificationEnabled(true);

                    if (pushObject) { // if the document is already in secure storage it exists on appwrite
                        return;
                    }
                    // If granted, get the token and create a document in appwrite
                    const token = (await Notifications.getExpoPushTokenAsync({ projectId: EXPO_PROJECT_ID })).data;

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

                        // Store the serialized object in secure storage
                        await saveToSecureStore(pushKey, pushDocString);
                    }

                }
            } catch (err) {
                console.error(err);
            }
        };
        pushStatus();

    }, [isAppActive]));

    useEffect(() => {
        const getAutoPlayPreferenceAsync = async () => {
            const preference = await getAutoPlayPreference();
            setIsAutoPlayEnabled(preference);
        };
        getAutoPlayPreferenceAsync();
    }, [isAutoPlayEnabled]);

    return (
        <SafeAreaView style={HomeStyle.settingsContainer}>

            <ScrollView showsVerticalScrollIndicator={false}>

                {localSignInState && isSignedIn ? (
                    <View style={HomeStyle.profileView}>
                        <Text style={HomeStyle.profileText}>{profileInfo.name}</Text>
                        <Text style={HomeStyle.profileText}>{profileInfo.email}</Text>
                    </View>
                ) : null}

                {localSignInState && isSignedIn ? (
                    <View style={HomeStyle.cardView}>
                        <Text style={HomeStyle.settingsSectionHeader}>Account Settings</Text>
                        <Card style={HomeStyle.settingsCard}>

                            <Card.Content style={[HomeStyle.settingsCardContent, { paddingTop: "3%" }]}>
                                <Ionicons style={{ paddingBottom: "4%" }} name="person" size={24} color={appPrimaryColor} />
                                <View style={HomeStyle.ClickableSettingsOption}>
                                    <TouchableOpacity onPress={() => navigation.navigate("Change Name")} style={HomeStyle.clickableRow}>
                                        <Text style={HomeStyle.changeInfoText} >Change Name</Text>
                                        <MaterialIcons style={{ alignSelf: "center" }} name="navigate-next" size={24} color={appPrimaryColor} />
                                    </TouchableOpacity>
                                    <View style={HomeStyle.touchableOptionArea} />
                                </View>
                            </Card.Content>


                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <Entypo style={{ paddingBottom: "4%" }} name="email" size={24} color={appPrimaryColor} />
                                <View style={HomeStyle.ClickableSettingsOption}>
                                    <TouchableOpacity onPress={() => navigation.navigate("Change Email")} style={HomeStyle.clickableRow}>
                                        <Text style={HomeStyle.changeInfoText}>Change Email</Text>
                                        <MaterialIcons style={{ alignSelf: "center" }} name="navigate-next" size={24} color={appPrimaryColor} />
                                    </TouchableOpacity>
                                    <View style={HomeStyle.touchableOptionArea} />
                                </View>
                            </Card.Content>


                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <MaterialIcons style={{ paddingBottom: "4%" }} name="password" size={24} color={appPrimaryColor} />
                                <View style={HomeStyle.ClickableSettingsOption}>
                                    <TouchableOpacity onPress={() => navigation.navigate("Change Password")} style={HomeStyle.clickableRow}>
                                        <Text style={HomeStyle.changeInfoText}>Change Password</Text>
                                        <MaterialIcons style={{ alignSelf: "center" }} name="navigate-next" size={24} color={appPrimaryColor} />
                                    </TouchableOpacity>
                                    <View style={HomeStyle.touchableOptionArea} />
                                </View>
                            </Card.Content>


                            <Card.Content style={[HomeStyle.settingsCardContent, { paddingBottom: "3%" }]}>
                                <MaterialIcons style={{ paddingBottom: 0 }} name="delete" size={24} color={appPrimaryColor} />
                                <View style={HomeStyle.ClickableSettingsOption}>
                                    <TouchableOpacity onPress={showDeleteModal} style={HomeStyle.clickableRow}>
                                        <Text style={HomeStyle.changeInfoText} >Delete Account</Text>
                                        <MaterialIcons style={{ alignSelf: "center" }} name="navigate-next" size={24} color={appPrimaryColor} />
                                    </TouchableOpacity>
                                </View>
                            </Card.Content>

                        </Card>
                    </View>
                ) : null}

                <View style={HomeStyle.cardView}>
                    <Text style={HomeStyle.settingsSectionHeader}>App Settings</Text>

                    <Card style={HomeStyle.settingsCard}>

                        <Card.Content style={[HomeStyle.settingsCardContent, { paddingTop: "3%" }]}>
                            <MaterialCommunityIcons style={{ paddingBottom: "4%" }} name="directions-fork" size={24} color={appPrimaryColor} />
                            <View style={HomeStyle.ClickableSettingsOption}>
                                <TouchableOpacity onPress={showNavModal} style={HomeStyle.clickableRow}>
                                    <Text style={HomeStyle.changeInfoText}>Navigation Preference</Text>
                                    <MaterialIcons style={{ alignSelf: "center" }} name="navigate-next" size={24} color={appPrimaryColor} />
                                </TouchableOpacity>

                                <View style={HomeStyle.touchableOptionArea} />
                            </View>
                        </Card.Content>

                        <Card.Content style={[HomeStyle.settingsCardContent, Platform == "ios" ? { marginBottom: "3%" } : { marginBottom: 0 }]}>
                            <MaterialIcons style={{ paddingBottom: "4%" }} name="notifications-on" size={24} color={appPrimaryColor} />
                            <View style={HomeStyle.ClickableSettingsOption}>
                                <View style={HomeStyle.clickableRowToggle}>
                                    <Text style={[HomeStyle.changeInfoText, { marginLeft: "16%" }]}>Push Notifications</Text>
                                    <Switch
                                        value={isPushNotificationEnabled}
                                        onValueChange={togglePushNotification}
                                        color={appTertiaryColor}
                                        ios_backgroundColor={appQuarternaryColor}
                                        style={HomeStyle.toggle}
                                    />
                                </View>

                                <View style={HomeStyle.touchableOptionArea} />
                            </View>
                        </Card.Content>

                        <Card.Content style={[HomeStyle.settingsCardContent, { paddingBottom: "3%" }]}>
                            <FontAwesome6 style={{ paddingBottom: "0%", marginLeft: "1%", marginRight: "1%" }} name="play" size={24} color={appPrimaryColor} />
                            <View style={HomeStyle.ClickableSettingsOption}>
                                <View style={HomeStyle.clickableRowToggle}>
                                    <Text style={HomeStyle.changeInfoText}>Auto Play Images</Text>
                                    <Switch
                                        value={isAutoPlayEnabled}
                                        onValueChange={toggleAutoPlay}
                                        color={appTertiaryColor}
                                        ios_backgroundColor={appQuarternaryColor}
                                        style={HomeStyle.toggle}
                                    />
                                </View>
                            </View>
                        </Card.Content>

                    </Card>
                </View>

                <DeleteConfirmationModal />
                <NavPreferenceModal />

            </ScrollView>
            <Snackbar
                visible={isSnackbarVisible}
                maxFontSizeMultiplier={1}
                style={isErrorMessage ? AppStyle.snackBar : [AppStyle.snackBar, { backgroundColor: appSecondaryColor }]}
                onDismiss={() => {
                    setIsSnackbarVisible(false);
                    setErrorMessage(""); // Clear the error message
                }}
                action={{
                    textColor: appTextColor,
                    label: "Close",
                }}
                duration={3000}
            >
                {errorMessage}
            </Snackbar>
        </SafeAreaView >
    );
}

SettingsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};