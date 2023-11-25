import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import HomeStyle from "../../styling/HomeStyle";

export default function DonationsScreen() {
    return (
        <SafeAreaView style={HomeStyle.donationsWebViewContainer}>
            <WebView source={{ uri: "https://www.discoverpi.com/support" }} style={HomeStyle.donationsWebView} />
        </SafeAreaView>
    );
}

