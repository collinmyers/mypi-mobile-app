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
            <Text style={HomeStyle.dbText}>Will I ever find true love?</Text>
            <Text style={HomeStyle.dbText}>Will I get answers to this questions?</Text>
            <Text style={HomeStyle.dbText}>Will these questions get buttons that expand to display the answers?</Text>
        </SafeAreaView>
    );
}

