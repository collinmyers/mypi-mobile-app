import React, { useState, useEffect } from "react";
import { AppState, Modal, Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Card, RadioButton, Switch, Text } from "react-native-paper";
import PropTypes from "prop-types";
import HomeStyle from "../../styling/HomeStyle";
import { saveNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";
import { getAutoPlayPreference, saveAutoPlayPreference } from "../../utils/AsyncStorage/AutoPlayPreference";
import * as Notifications from "expo-notifications";
import { appPrimaryColor, appQuarternaryColor, appTertiaryColor } from "../../utils/colors/appColors";
import { MaterialCommunityIcons, Entypo, MaterialIcons, Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { account, functions } from "../../utils/Config/appwriteConfig";
import * as Linking from "expo-linking";
import { useAuth } from "../../components/navigation/AuthContext";

export default function SettingsScreen({ navigation }) {

    const { changeAuthState, setChangeAuthState, isSignedIn, setIsSignedIn } = useAuth();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isNavModalVisible, setIsNavModalVisible] = useState(false);
    const [navTypeChecked, setNavTypeChecked] = useState("car");
    const [isPushNotificationEnabled, setIsPushNotificationEnabled] = useState(false);
    const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: "",
        email: "",
        identity: ""
    });

    useFocusEffect(
        React.useCallback(() => {
            const getNameAndEmail = async () => {
                try {
                    const response = await account.get();

                    if (response.email === "") throw new Error("Not a email user (guest)");

                    setProfileInfo({
                        name: response.name,
                        email: response.email,
                        identity: response.$id
                    });

                    setIsSignedIn(true);
                } catch {
                    setIsSignedIn(false);
                }
            };
            getNameAndEmail();
            
        }, [changeAuthState])
    );

    const togglePushNotification = async () => {
        try {
            await Linking.openSettings(); // device system settings for app

            // Request push notification permissions
            const { status } = await Notifications.getPermissionsAsync();

            if (status !== "granted") {
                console.log("Permission to receive notifications denied.");
                setIsPushNotificationEnabled(false); // Revert the switch state if permission denied
                return;
            }

            setIsPushNotificationEnabled(true);

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

    const renderAccountSettings = () => {
        if (!isSignedIn) {
            return null;
        }

        return (
            <React.Fragment>
                {isSignedIn && (
                    <View style={HomeStyle.profileView}>
                        <Text style={HomeStyle.profileText}>{profileInfo.name}</Text>
                        <Text style={HomeStyle.profileText}>{profileInfo.email}</Text>
                    </View>
                )}

                {isSignedIn && (
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
                )}
            </React.Fragment>
        );
    };

    const deleteUserAndData = async () => {

        const DELETE_USER_FUNCTION_ID = process.env.EXPO_PUBLIC_DELETE_USER_AND_DATA_FUNCTION;

        await functions.createExecution(
            DELETE_USER_FUNCTION_ID,
            "",
            false,
            "/",
            "DELETE",
            {}
        )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        await account.deleteSession("current")
            .then(() => {
                setChangeAuthState(!changeAuthState);
                setIsSignedIn(false);
            });
        setIsDeleteModalVisible(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            const pushStatus = async () => {
                const { status } = await Notifications.getPermissionsAsync();
                if (status === "granted") {
                    setIsPushNotificationEnabled(true);
                } else {
                    setIsPushNotificationEnabled(false);
                }
            };
            pushStatus();

            const handleAppStateChange = (nextAppState) => {
                if (nextAppState === "active") {
                    pushStatus();
                }
            };

            const appSub = AppState.addEventListener("change", handleAppStateChange);

            // Cleanup: remove the event listener when the component unmounts
            return () => {
                appSub.remove();
            };

        }, [])
    );

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

                {renderAccountSettings()}

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
        </SafeAreaView >
    );
}

SettingsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};