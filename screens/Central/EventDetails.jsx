import React, { useState } from "react";
import { SafeAreaView, Image, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { showLocation } from "react-native-map-link";
import HomeStyle from "../../styling/HomeStyle";
import { ScrollView } from "react-native-gesture-handler";
import { getNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";
import { useFocusEffect } from "@react-navigation/native";

export default function EventDetailsScreen() {
    const [currentNavPreference, setCurrentNavPreference] = useState(null);

    const route = useRoute();

    const { EventImage, EventName, EventDate, EventDetailsDescription, EventLatitude, EventLongitude, EventTime } = route.params;

    const getDirections = (lat, long, directionsPreference) => {
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
            if (currentNavPreference !== null) {
                setCurrentNavPreference(currentNavPreference);
            }
        }, [currentNavPreference])
    );

    return (
        <SafeAreaView style={HomeStyle.eventContainer}>
            <ScrollView contentContainerStyle={HomeStyle.scrollableView} showsVerticalScrollIndicator={false}>
                <Card style={HomeStyle.eventDetailsCard}>
                    <Card.Content style={HomeStyle.eventDetailsCardContent}>
                        <Text style={HomeStyle.eventDetailsTitle}>{EventName}</Text>
                        <Text style={HomeStyle.eventDetailsDateTime}>{EventDate}</Text>
                        <Text style={HomeStyle.eventDetailsDateTime}>{EventTime}</Text>
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
