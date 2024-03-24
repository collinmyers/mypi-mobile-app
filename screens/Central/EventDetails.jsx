import React, { useState } from "react";
import { Dimensions, SafeAreaView, Image, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { showLocation } from "react-native-map-link";
import HomeStyle from "../../styling/HomeStyle";
import { ScrollView } from "react-native-gesture-handler";
import { getNavigationPreference } from "../../utils/AsyncStorage/NavigationPreference";
import { useFocusEffect } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import { appPrimaryColor, appTertiaryColor } from "../../utils/colors/appColors";


export default function EventDetailsScreen() {
    const [currentNavPreference, setCurrentNavPreference] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;


    const route = useRoute();

    const { EventImages, EventName, EventDate, EventDetailsDescription, EventLatitude, EventLongitude, EventTime } = route.params;

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
                        {EventTime !== "Invalid Date" ? (<Text style={HomeStyle.eventDetailsDateTime}>{EventTime}</Text>) : (null)}
                        {EventImages.length > 1 ?
                            (
                                <>
                                    <Carousel
                                        loop
                                        width={deviceWidth * 0.79}
                                        height={deviceHeight * 0.27}
                                        data={EventImages}
                                        scrollAnimationDuration={750}
                                        snapEnabled={true}
                                        onSnapToItem={(index) => setActiveIndex(index)}
                                        renderItem={({ item }) => (
                                            <Image source={{ uri: item }} style={HomeStyle.eventDetailsImage} />
                                        )}
                                    />
                                    <View style={{ flexDirection: "row", justifyContent: "center" , marginVertical: "3%"}}>
                                        {EventImages.map((_, index) => (
                                            <View
                                                key={index}
                                                style={[
                                                    { width: 8, height: 8, borderRadius: 4, backgroundColor: appPrimaryColor, marginHorizontal: 4 },
                                                    index === activeIndex && { backgroundColor: appTertiaryColor },
                                                ]}
                                            />
                                        ))}
                                    </View>
                                </>
                            )
                            :
                            (
                                <Image
                                    source={{ uri: EventImages[0] }}
                                    style={HomeStyle.eventDetailsImage}
                                />
                            )
                        }

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
