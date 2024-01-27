import React from "react";
import { SafeAreaView, ScrollView, Text  } from "react-native";
import HomeStyle from "../../styling/HomeStyle";




export default function PushNotificationScreen() {


    return (
        <SafeAreaView style={HomeStyle.alertContainer}>
            <ScrollView contentContainerStyle={HomeStyle.scrollableView} showsVerticalScrollIndicator={false}>
            
            <Text style={{color:"white"}}>This screen will be used by admins to send in-app and out of app notifications</Text>

            </ScrollView>
        </SafeAreaView>
    );
}
