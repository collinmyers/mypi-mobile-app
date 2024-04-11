import React, { useState, useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { View, ScrollView, RefreshControl } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import PropTypes from "prop-types";
import HomeStyle from "../../styling/HomeStyle";
import { appPrimaryColor, appQuarternaryColor, appSecondaryColor } from "../../utils/colors/appColors";
import { DONATIONS_PROVIDER_LINK } from "../../utils/Config/config";

const WebViewComponent = ({ uri, onError }) => {
    const webViewRef = useRef(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!refreshing) {
            setRefreshing(false);
        }
    }, [refreshing]);

    return (
        <WebView
            ref={webViewRef}
            source={{ uri }}
            style={HomeStyle.donationsWebView}
            onError={onError}
            renderLoading={() => (
                <View style={HomeStyle.activityIndicatorContainer}>
                    <ActivityIndicator animating={true} color={appSecondaryColor} size="large" />
                </View>
            )}
        />
    );
};

WebViewComponent.propTypes = {
    uri: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
};

const ErrorScreen = ({ onRefresh, refreshing }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: appPrimaryColor }}
            refreshControl={
                <RefreshControl
                    style={{ backgroundColor: appPrimaryColor }}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[appQuarternaryColor]}
                    tintColor={appQuarternaryColor}
                />
            }
        >
            <Text style={{ color: appSecondaryColor, fontWeight: "500", fontSize: 18 }}>No internet connection. Swipe down to refresh.</Text>
        </ScrollView>
    );
};

ErrorScreen.propTypes = {
    onRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
};

export default function DonationsScreen() {
    const [isErrored, setIsErrored] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    return (
        <>
            {!isErrored ? (
                <WebViewComponent
                    uri={DONATIONS_PROVIDER_LINK}
                    onError={() => setIsErrored(true)}
                    refreshing={refreshing}
                    setRefreshing={setRefreshing}
                />
            ) : (
                <ErrorScreen onRefresh={() => setIsErrored(false)} refreshing={refreshing} />
            )}
        </>
    );
}