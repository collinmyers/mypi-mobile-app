import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import EventDetailsModal from "./EventDetails"; 

// import AppStyle from "../styling/AppStyling";
import HomeStyle from "../styling/HomeStyling";


export default function EventListScreen() {
    return (

        <SafeAreaView style={HomeStyle.eventContainer}>
            <ScrollView>
                    <TouchableOpacity onPress={toggleModal}>
                    <Card>
                     <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                     </Card>
                     </TouchableOpacity>
                <Card>
                    <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                </Card>
                <Card>
                    <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                </Card>
                <Card>
                    <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                </Card>
                <Card>
                    <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                </Card>
            </ScrollView>
                <EventDetailsModal isVisible={isModalVisible} onClose={toggleModal} />
        </SafeAreaView>


    );
}