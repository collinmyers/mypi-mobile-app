import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { Card } from "react-native-elements";
import { Databases, Client } from "appwrite";
import { useNavigation } from "@react-navigation/native";


// import AppStyle from "../styling/AppStyling";
import HomeStyle from "../../styling/HomeStyling";


export default function EventListScreen() {
    const navigation = useNavigation();

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
                "655280f07e30eb37c8e8", //Collection ID
            );

            //Successful pull from db. Add data to array with set data in for loop...
            //
            promise.then(function (response) {
                    for (let index = 0; index < response.documents.length; index++) {   //Iterate over every document in db
                        let eventID = response["documents"][index]["$id"];
                        setData( data => [...data,  //Add document data to array that contains react-native code to render the events 
                            
                            <Pressable key={index} onPress={() => navigation.navigate("EventDetailsScreen",{EventDetailsID:eventID})}>
                                <Card >
                                    <Text>{response["documents"][index]["Name"]}</Text>
                                    <Text>{response["documents"][index]["ShortDescription"]}</Text>
                                </Card>
                            </Pressable>

                            ]
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
        setData([]);    //Empty the data array
        getEvents();    //Get Events 
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