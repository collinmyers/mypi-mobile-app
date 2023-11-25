import React from "react";
import { SafeAreaView } from "react-native";
// import { Text } from "react-native-paper";
import { WebView } from "react-native-webview";

export default function DonationsScreen() {
    return (
        <SafeAreaView style={{ justifyContent: "center", height: "100%" }}>
            <WebView source={{ uri: "https://www.discoverpi.com/support" }} style={{ flex: 1 }} />
        </SafeAreaView>
    );
}

