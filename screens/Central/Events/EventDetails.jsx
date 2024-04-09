import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, TouchableOpacity, View, Linking } from "react-native";
import { Image } from "expo-image";
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
import { FontAwesome } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";


export default function EventDetailsScreen() {
    const [currentNavPreference, setCurrentNavPreference] = useState(null);
    const [currentAutoPlayPreference, setCurrentAutoPlayPreference] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAdditionalInfoAvailable, setIsAdditionalInfoAvailable] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;


    const route = useRoute();

    const { EventImages, EventName, EventDate, EventDetailsDescription, EventLatitude, EventLongitude, EventTime, ExtraInfoTitle, ExtraInfoURL } = route.params;

    const getDirections = (lat, long, directionsPreference) => {
        showLocation({
            latitude: lat,
            longitude: long,
            appsWhiteList: [],
            googleForceLatLon: true,
            alwaysIncludeGoogle: true,
            naverCallerName: process.env.EXPO_PUBLIC_BUNDLE_AND_PACKAGE_IDENTIFIER,
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
        return ExtraInfoTitle.map((item, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={HomeStyle.additionalInfoListOpacity}
                    onPress={() => handlePress(ExtraInfoURL[index])}
                >
                    <Text key={index} style={HomeStyle.additionalInfoListText}>{item} </Text>
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

    useEffect(() => {
        // console.log(ExtraInfoTitle.length);
        if (ExtraInfoTitle.length > 0 && ExtraInfoURL.length > 0) {
            setIsAdditionalInfoAvailable(true);
        }
    }, []);

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
                                            <Image
                                                placeholder={"blurhash"}
                                                contentFit="cover"
                                                source={{ uri: item }}
                                                style={[HomeStyle.eventDetailsImage, { marginVertical: 0 }]} />
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
                                    placeholder={"blurhash"}
                                    contentFit="cover"
                                    source={{ uri: EventImages[0] }}
                                    style={HomeStyle.eventDetailsImage}
                                />
                            )
                        }

                        <Text style={HomeStyle.eventDetailsDescription}>{EventDetailsDescription}</Text>

                        {isAdditionalInfoAvailable && (
                            <View style={HomeStyle.additionalInfoContainer}>
                                <TouchableOpacity
                                    onPress={() => setIsExpanded(!isExpanded)}
                                    style={HomeStyle.additionalOptions}
                                >
                                    <Text style={HomeStyle.additionalOptionsText}>Additional Information</Text>
                                    {isExpanded ? (
                                        <FontAwesome name="angle-up" size={24} color={appTertiaryColor} />
                                    ) : (
                                        <FontAwesome name="angle-down" size={24} color={appTertiaryColor} />
                                    )}
                                </TouchableOpacity>
                                <Collapsible collapsed={!isExpanded}>{renderExtraBtns()}</Collapsible>
                            </View>
                        )}


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