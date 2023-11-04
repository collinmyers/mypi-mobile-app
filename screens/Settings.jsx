import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Account, Client } from "appwrite";
// import AppStyle from "../styling/AppStyling";
import HomeStyle from "../styling/HomeStyling";

export default function SettingsScreen() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    const getNameAndEmail = async () => {

        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const account = new Account(client);
            const response = await account.get();

            setName(response.name);
            setEmail(response.email);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getNameAndEmail();
    }, []);



    return (
        <SafeAreaView style={HomeStyle.settingsContainer}>
            <View style={HomeStyle.profileView}>
                <Text style={HomeStyle.profileText}>{name}</Text>
                <Text style={HomeStyle.profileText}>{email}</Text>
            </View>

            <View style={HomeStyle.changeInfoSection}>
                
                <TouchableOpacity style={HomeStyle.changeInfoOpac} >
                    <Text style={HomeStyle.changeInfoText}>Change Name</Text>
                </TouchableOpacity>

                <TouchableOpacity style={HomeStyle.changeInfoOpac}>
                    <Text style={HomeStyle.changeInfoText}>Change Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={HomeStyle.changeInfoOpac}>
                    <Text style={HomeStyle.changeInfoText}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={HomeStyle.deleteAccountOpac}>
                    <Text style={HomeStyle.changeInfoText}>Delete Account</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

