import React, { useState } from "react";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import { SafeAreaView, View } from "react-native";
import { Account, Client } from "appwrite";
import { useFocusEffect } from "@react-navigation/native";
import Logo from "../../components/logo/AuthLogo";

export default function Dashboard() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: "",
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

    return (
        <SafeAreaView style={AppStyle.container}>
            <View style={AppStyle.imageContainer}>
                <Logo />
            </View>

            <View style={HomeStyle.dbContainer}>
                
                {isSignedIn ?
                    (<Text style={HomeStyle.dbTitleText}>Welcome {profileInfo.name}</Text>) :
                    (<Text style={HomeStyle.dbTitleText}>Welcome to myPI</Text>)
                }

                <Text style={HomeStyle.dbText}>
                    See our Events Page to view a list of upcoming events for Presque Isle Park.
                </Text>
                <Text style={HomeStyle.dbText}>
                    See our Alerts Page to view a list of alerts such as beach closures, tornados, sharknados, and more.
                </Text>
                <Text style={HomeStyle.dbText}>
                    See our Map Page to view a map of the park and get directions to points of interests on the map.
                </Text>
                <Text style={HomeStyle.dbText}>
                    See our Settings Page to change your notification settings.
                </Text>
                <Text style={HomeStyle.dbText}>
                    Check the sidebar menu to see other options such as the FAQ page and the Park Info page.
                </Text>
            </View>
        </SafeAreaView>
    );
}