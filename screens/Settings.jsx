import React from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

import AppStyle from "../styling/AppStyling";
import HomeStyle from "../styling/HomeStyling";

export default function SettingsScreen() {

    return (
        <SafeAreaView style={AppStyle.container}>
            <Text style={HomeStyle.centerText}>Settings</Text>
        </SafeAreaView>
    );
}

