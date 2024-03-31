import React, { useCallback, useState, useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { View, ScrollView, RefreshControl } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import HomeStyle from "../../styling/HomeStyle";
import { appPrimaryColor, appQuarternaryColor, appSecondaryColor } from "../../utils/colors/appColors";

const WebViewComponent = ({ uri, onError }) => {
  const webViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Reload the WebView if it's mounted
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, []);

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
      refreshControl={
        <RefreshControl
          style={{ backgroundColor: appQuarternaryColor }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[appPrimaryColor]}
          tintColor={appPrimaryColor}
        />
      }
    />
  );
};

const ErrorScreen = ({ onRefresh, refreshing }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: appPrimaryColor }}
      refreshControl={
        <RefreshControl
          style={{ backgroundColor: appQuarternaryColor }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[appPrimaryColor]}
          tintColor={appPrimaryColor}
        />
      }
    >
      <Text style={{ color: appSecondaryColor, fontWeight: "500", fontSize: 18 }}>No internet connection. Swipe down to refresh.</Text>
    </ScrollView>
  );
};

export default function DonationsScreen() {
  const [isErrored, setIsErrored] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      {!isErrored ? (
        <WebViewComponent
          uri={process.env.EXPO_PUBLIC_DONATION_PROVIDER_LINK}
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