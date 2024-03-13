import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import HomeStyle from "../../styling/HomeStyle";

export default function DonationsScreen() {
    return (
        <SafeAreaView style={HomeStyle.donationsWebViewContainer}>
            <WebView source={{ uri: process.env.EXPO_PUBLIC_DONATION_PROVIDER_LINK }} style={HomeStyle.donationsWebView} />
        </SafeAreaView>
    );
}

