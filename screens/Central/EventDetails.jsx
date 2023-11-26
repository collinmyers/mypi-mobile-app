import React, { useState } from "react";
import { View, SafeAreaView, Pressable, Image, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { showLocation } from "react-native-map-link";
import HomeStyle from "../../styling/HomeStyle";
import { ScrollView } from "react-native-gesture-handler";
import { getNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";
import { useFocusEffect } from "@react-navigation/native";

export default function EventDetailsScreen() {
    const [currentNavPreference, setCurrentNavPreference] = useState(null);

    const route = useRoute();
    const navigation = useNavigation();

    const appWhite = "#FFFFFF";

    const { EventImage, EventName, EventDateTime, EventDetailsDescription, EventLatitude, EventLongitude } = route.params;

    const getDirections = (lat, long, directionsPreference) => {
        // console.log("directions preference: " + directionsPreference);
        showLocation({
            latitude: lat,
            longitude: long,
            appsWhiteList: [],
            googleForceLatLon: true,
            alwaysIncludeGoogle: true,
            naverCallerName: "com.discoverpi.mypi",
            directionsMode: directionsPreference,
        });
    };

    const fetchNavPreference = async () => {
        try {
            const preference = await getNavigationPreference();

            setCurrentNavPreference(preference);
        } catch (error) {
            console.error(error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchNavPreference();
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            // Add a check to ensure currentNavPreference is not null before using it
            if (currentNavPreference !== null) {
                setCurrentNavPreference(currentNavPreference);
            }
        }, [currentNavPreference])
    );

    return (
        <SafeAreaView style={HomeStyle.eventContainer}>
            <ScrollView contentContainerStyle={HomeStyle.scrollableView} showsVerticalScrollIndicator={false}>
                <Card style={HomeStyle.eventDetailsCard}>
                    <View style={HomeStyle.eventDetailsBackButton}>
                        <Pressable onPress={navigation.goBack}>
                            <Ionicons name="arrow-back" size={24} color={appWhite} />
                        </Pressable>
                    </View>
                    <Card.Content style={HomeStyle.eventDetailsCardContent}>
                        <Text style={HomeStyle.eventDetailsTitle}>{EventName}</Text>
                        <Text style={HomeStyle.eventDetailsDateTime}>{EventDateTime}</Text>
                        <Image source={{ uri: EventImage }} style={HomeStyle.eventDetailsImage} />
                        <Text style={HomeStyle.eventDetailsDescription}>{EventDetailsDescription}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                getDirections(EventLatitude, EventLongitude, currentNavPreference);
                            }}
                            style={HomeStyle.homeButtonOpacity}
                        >
                            <Text style={HomeStyle.homeButtonText}>Get Directions</Text>
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
