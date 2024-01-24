import React, { useState } from "react";
import { Modal, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Card, Text } from "react-native-paper";
import { Account, Client } from "appwrite";
import PropTypes from "prop-types";
import HomeStyle from "../../styling/HomeStyle";
import { saveNavigationPreference, getNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";


export default function SettingsScreen({ navigation }) {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [currentNavPreference, setCurrentNavPreference] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isNavModalVisible, setIsNavModalVisible] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: "",
        email: "",
        identity: ""
    });


    const getNameAndEmail = async () => {
        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);
            const response = await account.get();

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

    const fetchNavPreference = async () => {
        try {
            const preference = await getNavigationPreference();

            switch (preference) {
                case "bike":
                    setCurrentNavPreference("Biking");
                    break;
                case "car":
                    setCurrentNavPreference("Driving");
                    break;
                case "walk":
                    setCurrentNavPreference("Walking");
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleNavPreferenceChange = async (newPreference) => {
        await saveNavigationPreference(newPreference);
        setCurrentNavPreference(currentNavPreference);
        setIsNavModalVisible(false);
    };

    const showNavModal = async () => {
        await fetchNavPreference();
        setIsNavModalVisible(true);
    };

    const NavPreferenceModal = () => {
        return (
            <Modal visible={isNavModalVisible} transparent>
                <View style={HomeStyle.modalNavContainer}>
                    <View style={HomeStyle.modalNavContentContainer}>
                        <Text style={HomeStyle.modalNavText}>Current Mode: {currentNavPreference}</Text>
                        <View style={HomeStyle.modalNavButtonContainer}>

                            <TouchableOpacity onPress={() => handleNavPreferenceChange("bike")} style={HomeStyle.modalNavButton}>
                                <Text style={HomeStyle.modalNavButtonText}>Biking</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleNavPreferenceChange("car")} style={HomeStyle.modalNavButton}>
                                <Text style={HomeStyle.modalNavButtonText}>Driving</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleNavPreferenceChange("walk")} style={HomeStyle.modalNavButton}>
                                <Text style={HomeStyle.modalNavButtonText}>Walking</Text>
                            </TouchableOpacity>
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

            // Client Side deletion doesnt work, will need to implement serverside solution

            // const client = new Client()
            //     .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
            //     .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);


            // console.log(typeof(profileInfo.identity));

            // const account = new Account(client);
            // await account.deleteIdentity(profileInfo.identity);

            // setProfileInfo({
            //     name: "",
            //     email: "",
            //     identity: ""
            // });

            // // Deletion of data from storage bucket and database will need to be implemented as well
            // setIsSignedIn(false);
            setIsDeleteModalVisible(false);
        } catch (error) {
            console.error(error);
        }

    };

    useFocusEffect(
        React.useCallback(() => {
            fetchNavPreference();
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
                                        style={HomeStyle.changeInfoOpac}
                                    >
                                        <Text style={HomeStyle.changeInfoText}>Change Name</Text>
                                    </TouchableOpacity>
                                </Card.Content>

                                <Card.Content style={HomeStyle.settingsCardContent}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Change Email")}
                                        style={HomeStyle.changeInfoOpac}
                                    >
                                        <Text style={HomeStyle.changeInfoText}>Change Email</Text>
                                    </TouchableOpacity>
                                </Card.Content>

                                <Card.Content style={HomeStyle.settingsCardContent}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Change Password")}
                                        style={HomeStyle.changeInfoOpac}
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
                                <TouchableOpacity onPress={() => navigation.navigate("Park Notifications")} style={HomeStyle.changeInfoOpac} >
                                    <Text style={HomeStyle.changeInfoText}>Park Alerts</Text>
                                </TouchableOpacity>
                            </Card.Content>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity onPress={() => navigation.navigate("Event Notifications")} style={HomeStyle.changeInfoOpac}>
                                    <Text style={HomeStyle.changeInfoText}>Events</Text>
                                </TouchableOpacity>
                            </Card.Content>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity onPress={() => navigation.navigate("Promotion Notifications")} style={HomeStyle.changeInfoOpac}>
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
                                    style={HomeStyle.changeInfoOpac}
                                >
                                    <Text style={HomeStyle.changeInfoText}>Directions Mode</Text>
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

// Android sucks