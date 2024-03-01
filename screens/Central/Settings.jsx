import React, { useState } from "react";
import { Modal, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Card, RadioButton, Text } from "react-native-paper";
import { account } from "../../utils/Config/appwriteConfig";
import PropTypes from "prop-types";
import HomeStyle from "../../styling/HomeStyle";
import { saveNavigationPreference, getNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";
import { appSecondaryColor, appTertiaryColor } from "../../utils/colors/appColors";


export default function SettingsScreen({ navigation }) {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isNavModalVisible, setIsNavModalVisible] = useState(false);
    const [navTypeChecked, setNavTypeChecked] = useState("car");
    const [profileInfo, setProfileInfo] = useState({
        name: "",
        email: "",
        identity: ""
    });


    const getNameAndEmail = async () => {
        try {
            const response = await account.get();
            console.log(response);

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



    const handleNavPreferenceChange = async (newPreference) => {
        setIsNavModalVisible(false);
        setNavTypeChecked(newPreference);
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
                                    style={HomeStyle.radioButton}
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
        try {
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error(error);
        }

    };

    useFocusEffect(
        React.useCallback(() => {
            getNameAndEmail();
        }, [])
    );

    return (
        <SafeAreaView style={HomeStyle.settingsContainer}>

            <ScrollView showsVerticalScrollIndicator={false}>

                {isSignedIn && (
                    <View style={HomeStyle.profileView}>
                        <Text style={HomeStyle.profileText}>{profileInfo.name}</Text>
                        <Text style={HomeStyle.profileText}>{profileInfo.email}</Text>
                    </View>
                )}

                {isSignedIn && (
                    <View style={HomeStyle.cardView}>
                        <Card style={HomeStyle.settingsCard}>
                            <Card.Content style={HomeStyle.settingsCardContentContainer}>
                                <Text style={HomeStyle.settingsSectionHeader}>Account Settings</Text>

                                <Card.Content style={HomeStyle.settingsCardContent}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Change Name")}
                                        style={HomeStyle.settingsButtonOpac}
                                    >
                                        <Text style={HomeStyle.changeInfoText}>Change Name</Text>
                                    </TouchableOpacity>
                                </Card.Content>

                                <Card.Content style={HomeStyle.settingsCardContent}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Change Email")}
                                        style={HomeStyle.settingsButtonOpac}
                                    >
                                        <Text style={HomeStyle.changeInfoText}>Change Email</Text>
                                    </TouchableOpacity>
                                </Card.Content>

                                <Card.Content style={HomeStyle.settingsCardContent}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Change Password")}
                                        style={HomeStyle.settingsButtonOpac}
                                    >
                                        <Text style={HomeStyle.changeInfoText}>Change Password</Text>
                                    </TouchableOpacity>
                                </Card.Content>

                                <Card.Content style={HomeStyle.settingsCardContent}>
                                    <TouchableOpacity
                                        onPress={showDeleteModal}
                                        style={HomeStyle.deleteAccountOpac}
                                    >
                                        <Text style={HomeStyle.changeInfoText}>Delete Account</Text>
                                    </TouchableOpacity>
                                </Card.Content>
                            </Card.Content>
                        </Card>
                    </View>
                )}



                <View style={HomeStyle.cardView}>
                    <Card style={HomeStyle.settingsCard}>

                        <Card.Content style={HomeStyle.settingsCardContentContainer}>

                            <Text style={HomeStyle.settingsSectionHeader}>Notification Settings</Text>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity onPress={() => navigation.navigate("Park Notifications")} style={HomeStyle.settingsButtonOpac} >
                                    <Text style={HomeStyle.changeInfoText}>Park Alerts</Text>
                                </TouchableOpacity>
                            </Card.Content>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity onPress={() => navigation.navigate("Event Notifications")} style={HomeStyle.settingsButtonOpac}>
                                    <Text style={HomeStyle.changeInfoText}>Events</Text>
                                </TouchableOpacity>
                            </Card.Content>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity onPress={() => navigation.navigate("Promotion Notifications")} style={HomeStyle.settingsButtonOpac}>
                                    <Text style={HomeStyle.changeInfoText}>Promotions</Text>
                                </TouchableOpacity>
                            </Card.Content>

                        </Card.Content>

                    </Card>
                </View>

                <View style={HomeStyle.cardView}>
                    <Card style={HomeStyle.settingsCard}>

                        <Card.Content style={HomeStyle.settingsCardContentContainer}>

                            <Text style={HomeStyle.settingsSectionHeader}>App Settings</Text>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity
                                    onPress={showNavModal}
                                    style={HomeStyle.settingsButtonOpac}
                                >
                                    <Text style={HomeStyle.changeInfoText}>Navigation</Text>
                                </TouchableOpacity>
                            </Card.Content>

                        </Card.Content>

                    </Card>
                </View>

                <DeleteConfirmationModal />
                <NavPreferenceModal />

            </ScrollView>
        </SafeAreaView>
    );
}

SettingsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};