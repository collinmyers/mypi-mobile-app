import React, { useEffect } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { Card } from "react-native-elements";
import { Databases, Client } from "appwrite";

// import AppStyle from "../styling/AppStyling";
import HomeStyle from "../styling/HomeStyling";


export default function EventListScreen() {

    const getEvents = async() =>{
        try{
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);
            
            const database = new Databases(client);

            let promise = database.listDocuments(
                "653ae4b2740b9f0a5139", //DB ID
                "6543f2c30111d4e20bde", //Collection ID
            );
            promise.then(function (response){
                console.log(response);  
            }, function(error){
                console.log(error);
            });
        }
        catch(error){
            console.error(error);
        }
    };

    useEffect(()=> {
        getEvents();
    },[]);

    return (

        <SafeAreaView style={HomeStyle.eventContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                <Card>
                    <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                </Card>
            </ScrollView>
        </SafeAreaView>


    );
}