import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";



export default function EventDetailsScreen() {
    const route = useRoute();


    const {EventDescription} = route.params;



    return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <Text>This is the Event Details:</Text>
                    <Text>{EventDescription}</Text>

            </View>
    );
}

