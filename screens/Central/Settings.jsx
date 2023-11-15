import React, { useState } from "react";
import { Modal, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Card, Text } from "react-native-paper";
import { Account, Client } from "appwrite";
import PropTypes from "prop-types";
import HomeStyle from "../../styling/HomeStyle";

export default function SettingsScreen({ navigation }) {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
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

    useFocusEffect(
        React.useCallback(() => {
            getNameAndEmail();
        }, [])
    );

    const showModal = () => {
        setIsModalVisible(true);
    };


    const DeleteConfirmationModal = () => {
        return (
            <Modal visible={isModalVisible} transparent>
                <View style={HomeStyle.modalContainer}>
                    <View style={HomeStyle.modalContentContainer}>
                        <Text style={HomeStyle.modalText}>Are you sure you want to delete your account? All information will be permanently removed.</Text>
                        <View style={HomeStyle.modalButtonContainer}>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={HomeStyle.modalCancelButton}>
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
            setIsModalVisible(false);
        } catch (error) {
            console.error(error);
        }

    };

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
                                        onPress={showModal}
                                        style={HomeStyle.deleteAccountOpac}>
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
                <DeleteConfirmationModal />
            </ScrollView>

        </SafeAreaView>
    );
}

// SettingsScreen.propTypes = {
//     navigation: PropTypes.shape({
//         navigate: PropTypes.object.isRequired,
//     }).isRequired,
// };

SettingsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};