import React from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import HomeStyle from "../../styling/HomeStyling";


export default function EventDetailsScreen() {
    const route = useRoute();
    const navigation = useNavigation();


    const {EventDescription} = route.params;



    return (
        <SafeAreaView style={HomeStyle.eventContainer}>

            <View style={{alignItems:"left", padding:40}}>
                <Pressable onPress={navigation.goBack}>
                    <AntDesign name="leftcircle" size={24} color="#8FA063" />
                </Pressable>
            </View>


            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", padding:5 }}>

                <Text style={{color:"white"}}>This is the Event Details:</Text>
                <Text style={{color:"white"}}>{EventDescription}</Text>

            </View>
        </SafeAreaView>
    );
}

