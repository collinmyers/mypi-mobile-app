import React, { useState } from "react";
import { Dimensions, SafeAreaView, Image, TouchableOpacity, View, Linking } from "react-native";
import { Card, Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { showLocation } from "react-native-map-link";
import HomeStyle from "../../../styling/HomeStyle";
import { ScrollView } from "react-native-gesture-handler";
import { getNavigationPreference } from "../../../utils/AsyncStorage/NavigationPreference";
import { useFocusEffect } from "@react-navigation/native";
import { getAutoPlayPreference } from "../../../utils/AsyncStorage/AutoPlayPreference";
import Carousel from "react-native-reanimated-carousel";
import { appPrimaryColor, appTertiaryColor } from "../../../utils/colors/appColors";


export default function EventDetailsScreen() {
    const [currentNavPreference, setCurrentNavPreference] = useState(null);
    const [currentAutoPlayPreference, setCurrentAutoPlayPreference] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;


    const route = useRoute();

    const { EventImages, EventName, EventDate, EventDetailsDescription, EventLatitude, EventLongitude, EventTime, ExtranInfoTitle, ExtraInfoURL } = route.params;

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

    const fetchAutoPlayPreference = async () => {
        try {
            const preference = await getAutoPlayPreference();
            setCurrentAutoPlayPreference(preference);
        } catch (error) {
            console.error(error);
        }
    };
    const handlePress = (url) => {
        Linking.openURL(url)
            .catch(err => console.error("An error occurred", err));
    };

    const renderExtraBtns = () => {
        return ExtranInfoTitle.map((item, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={HomeStyle.homeButtonOpacity}
                    onPress={() => handlePress(ExtraInfoURL[index])}
                >
                    <Text key={index} style={HomeStyle.homeButtonText}>{item} </Text>
                </TouchableOpacity>
            );


        });
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchNavPreference();
            if (currentNavPreference !== null) {
                setCurrentNavPreference(currentNavPreference);
            }
        }, [currentNavPreference])
    );

    useFocusEffect(
        React.useCallback(() => {
            fetchAutoPlayPreference();
            if (currentAutoPlayPreference !== null) {
                setCurrentAutoPlayPreference(currentAutoPlayPreference);
            }
        }, [currentAutoPlayPreference])
    );

    return (
        <SafeAreaView style={HomeStyle.eventContainer}>
            <ScrollView contentContainerStyle={HomeStyle.scrollableView} showsVerticalScrollIndicator={false}>
                <Card style={HomeStyle.eventDetailsCard}>
                    <Card.Content style={HomeStyle.eventDetailsCardContent}>
                        <Text style={HomeStyle.eventDetailsTitle}>{EventName}</Text>
                        <Text style={HomeStyle.eventDetailsDateTime}>{EventDate}</Text>
                        {EventTime !== "" ?
                            (<Text style={[HomeStyle.eventDetailsDateTime, { marginBottom: "5%" }]}>{EventTime}</Text>)
                            :
                            (<Text style={[HomeStyle.eventDetailsDateTime]}>{EventTime}</Text>)
                        }
                        {EventImages.length > 1 ?
                            (
                                <>
                                    <Carousel
                                        loop
                                        width={deviceWidth * 0.79}
                                        height={deviceHeight * 0.25}
                                        data={EventImages}
                                        autoPlay={currentAutoPlayPreference}
                                        autoPlayInterval={3500}
                                        scrollAnimationDuration={700}
                                        snapEnabled={true}
                                        onSnapToItem={(index) => setActiveIndex(index)}
                                        renderItem={({ item }) => (
                                            <Image source={{ uri: item }} style={[HomeStyle.eventDetailsImage, { marginVertical: 0 }]} />
                                        )}
                                        style={HomeStyle.imageCarousel}
                                    />
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        {EventImages.map((_, index) => (
                                            <View
                                                key={index}
                                                style={[HomeStyle.pageDots, { backgroundColor: index === activeIndex ? appTertiaryColor : appPrimaryColor }]}
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

                        {renderExtraBtns()}

                    </Card.Content>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}