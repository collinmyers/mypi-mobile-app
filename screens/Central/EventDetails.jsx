import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Databases, Client } from "appwrite";



export default function EventDetailsScreen() {
    const route = useRoute();

    const [EventDescription,SetEventDetails] = useState("");

    const {EventDetailsID} = route.params;


    const getEvents = async () => {

        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const database = new Databases(client);

            //Get docs from specified collection from db
            let promise = database.getDocument(
                "653ae4b2740b9f0a5139", //DB ID
                "6543f2c30111d4e20bde", //Collection ID
                EventDetailsID //Document ID
            );

            //Successful pull from db. Add data to array with set data in for loop...
            //
            promise.then(function (response) {
                console.log(response);
                SetEventDetails(response["eventsDetails"]["Description"]);
            }, function (error) {
                console.error(error); //promise failure
            });
        }

        catch (error) {
            console.error(error); //catch error
        }
    };


    useEffect(()=>{
        getEvents();
    });

    return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <Text>This is the Event Details:</Text>
                    <Text>{EventDescription}</Text>

            </View>
    );
}

