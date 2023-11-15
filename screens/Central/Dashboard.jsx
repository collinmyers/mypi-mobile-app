import React from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";

export default function Dashboard() {
    return (
        <SafeAreaView style={AppStyle.container}>
            <Text style={HomeStyle.centerText}>WELCOME!</Text>
        </SafeAreaView>
    );
}

