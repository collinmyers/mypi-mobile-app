import React from "react";
import { View, SafeAreaView, Pressable, Image, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { showLocation } from "react-native-map-link";
import HomeStyle from "../../styling/HomeStyle";

import { useDirections } from "../../components/Contexts/DirectionProvider";

export default function EventDetailsScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { directionsPreference } = useDirections();

    const { EventImage, EventName, EventDescription, EventLatitude, EventLongitude } = route.params;

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


    return (
        <SafeAreaView style={HomeStyle.eventContainer}>
            <Card style={HomeStyle.eventDetailsCard} >

                <View style={{ alignItems: "left", padding: 10 }}>
                    <Pressable onPress={navigation.goBack}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </Pressable>
                </View>

                <Card.Content style={HomeStyle.eventDetailsCardContent}>
                    <Text style={HomeStyle.eventDetailsTitle}>{EventName}</Text>
                    <Image source={{ uri: EventImage }} style={HomeStyle.eventDetailsImage} />

                    <Text style={HomeStyle.eventDetailsDescription}>{EventDescription}</Text>
                    <Card.Content style={HomeStyle.directionsButton}>
                        <TouchableOpacity
                            onPress={() => { getDirections(EventLatitude, EventLongitude, directionsPreference); }}
                            style={HomeStyle.homeButtonOpacity}>
                            <Text style={HomeStyle.homeButtonText}>Get Directions</Text>
                        </TouchableOpacity>
                    </Card.Content>

                </Card.Content>
            </Card>
        </SafeAreaView>
    );
}

