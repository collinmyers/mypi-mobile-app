import React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";

export default function ParkInfoScreen() {
    return (
        <SafeAreaView style={AppStyle.container}>
        <View style={HomeStyle.dbContainer}>

            <Text style={HomeStyle.parkInfoText}>
            Presque Isle is a major recreational landmark for about four million visitors each year.
            </Text>
            <Text style={HomeStyle.parkInfoText}>
            The park offers visitors a beautiful, sandy coastline and many recreational activities, including swimming, boating, fishing, hiking, bicycling, and even surfing!
            </Text>
            <Text style={HomeStyle.parkInfoText}>
            The bay attracts many pleasure boats and worldwide freighters, making Erie an important Great Lakes shipping port.
            </Text>
            <Text style={HomeStyle.parkInfoText}>
            Whether you come to enjoy the sandy beaches, study ecological diversity, or learn about the historical significance of the peninsula, there is something for everyone at Presque Isle State Park.
            </Text>        
            </View>
        </SafeAreaView>
    );
}

