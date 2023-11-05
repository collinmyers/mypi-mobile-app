import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Account, Client } from "appwrite";
// import AppStyle from "../styling/AppStyling";
import HomeStyle from "../../styling/HomeStyling";

export default function SettingsScreen() {

    const [profileInfo, setProfileInfo] = useState({
        name: "",
        email: ""
    });

    const [isSignedIn, setIsSignedIn] = useState(false);

    const getNameAndEmail = async () => {

        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);
            const response = await account.get();

            setProfileInfo({
                name: response.name,
                email: response.email
            });

            setIsSignedIn(true);

        } catch (error) {
            setIsSignedIn(false);
        }
    };

    useEffect(() => {
        getNameAndEmail();
    }, []);



    return (
        <SafeAreaView style={HomeStyle.settingsContainer}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={HomeStyle.profileView}>
                    <Text style={HomeStyle.profileText}>{profileInfo.name}</Text>
                    <Text style={HomeStyle.profileText}>{profileInfo.email}</Text>
                </View>

                <View style={HomeStyle.cardView}>
                    <Card style={HomeStyle.settingsCard}>
                        <Card.Content style={HomeStyle.settingsCardContentContainer}>

                            <Text style={HomeStyle.settingsSectionHeader}>Account Settings</Text>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity style={HomeStyle.changeInfoOpac} >
                                    <Text style={HomeStyle.changeInfoText}>Change Name</Text>
                                </TouchableOpacity>
                            </Card.Content>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity style={HomeStyle.changeInfoOpac}>
                                    <Text style={HomeStyle.changeInfoText}>Change Email</Text>
                                </TouchableOpacity>
                            </Card.Content>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity style={HomeStyle.changeInfoOpac}>
                                    <Text style={HomeStyle.changeInfoText}>Change Password</Text>
                                </TouchableOpacity>
                            </Card.Content>


                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity style={HomeStyle.deleteAccountOpac}>
                                    <Text style={HomeStyle.changeInfoText}>Delete Account</Text>
                                </TouchableOpacity>
                            </Card.Content>
                        </Card.Content>
                    </Card>
                </View>

                <View style={HomeStyle.cardView}>
                    <Card style={HomeStyle.settingsCard}>

                        <Card.Content style={HomeStyle.settingsCardContentContainer}>
                            <Text style={HomeStyle.settingsSectionHeader}>Notification Settings</Text>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity style={HomeStyle.changeInfoOpac} >
                                    <Text style={HomeStyle.changeInfoText}>Park Alerts</Text>
                                </TouchableOpacity>
                            </Card.Content>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity style={HomeStyle.changeInfoOpac}>
                                    <Text style={HomeStyle.changeInfoText}>Events</Text>
                                </TouchableOpacity>
                            </Card.Content>

                            <Card.Content style={HomeStyle.settingsCardContent}>
                                <TouchableOpacity style={HomeStyle.changeInfoOpac}>
                                    <Text style={HomeStyle.changeInfoText}>Promotions</Text>
                                </TouchableOpacity>
                            </Card.Content>

                        </Card.Content>


                    </Card>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

