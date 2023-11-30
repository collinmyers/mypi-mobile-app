import React from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";

export default function FAQScreen() {
    return (
        <SafeAreaView style={AppStyle.container}>
            <Text style={HomeStyle.dbText}>FAQ Page</Text>
            <Text style={HomeStyle.dbText}>Do I need to sign up to use this app?</Text>
            <Text style={HomeStyle.dbText}>Where are all the food trucks at?</Text>
        </SafeAreaView>
    );
}

