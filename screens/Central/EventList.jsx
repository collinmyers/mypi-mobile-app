import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { Card } from "react-native-elements";
import { Databases, Client } from "appwrite";

// import AppStyle from "../styling/AppStyling";
import HomeStyle from "../../styling/HomeStyling";


export default function EventListScreen() {

    const [data, setData] = useState([]);

    const getEvents = async () => {

        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const database = new Databases(client);

            //Get docs from specified collection from db
            let promise = database.listDocuments(
                "653ae4b2740b9f0a5139", //DB ID
                "6543f2c30111d4e20bde", //Collection ID
            );

            //Successful pull from db.  I tried doing a for loop to create a card for each
            //event, but I think there are sync issues with the promise... not sure how to handle
            //
            promise.then(function (response) {
                    for (let index = 0; index < response.documents.length; index++) {
                        setData(
                            <Card key={index}>
                                <Text>{response["documents"][index]["Name"]}</Text>
                                <Text>{response["documents"][index]["Description"]}</Text>
                            </Card>
                        );
                        
                    }
            }, function (error) {
                console.error(error); //promise failure
            });
        }

        catch (error) {
            console.error(error); //catch error
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (

        <SafeAreaView style={HomeStyle.eventContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {data} 

                <Card>
                    <Card.Image source={require("../../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                </Card>
                <Card>
                    <Card.Image source={require("../../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                </Card>
                <Card>
                    <Card.Image source={require("../../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                </Card>
                <Card>
                    <Card.Image source={require("../../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                </Card>
                <Card>
                    <Card.Image source={require("../../assets/my-pi-2-alt.png")}></Card.Image>
                    <Text>I am a placeholder event!</Text>
                </Card>
            </ScrollView>
        </SafeAreaView>


    );
}