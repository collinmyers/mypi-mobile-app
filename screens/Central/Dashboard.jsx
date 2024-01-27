import React, { useState } from "react";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Account, Client } from "appwrite";
import { useFocusEffect } from "@react-navigation/native";
import Logo from "../../components/logo/AuthLogo";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {

    const navigation = useNavigation();

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: "",
    });

    const appTextColor = "#FFFFFF";

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

                <TouchableOpacity style={HomeStyle.dashboardDonoOpac} onPress={() => { navigation.navigate("Donate"); }}>
                    <MaterialIcons name="volunteer-activism" size={24} color={appTextColor} />
                    <Text style={HomeStyle.dashboardDonoText}>Donate Here</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}