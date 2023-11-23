import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, Pressable, View, Image } from "react-native";
import { Card, Text } from "react-native-paper";
// import { Card } from "react-native-elements";
import { Databases, Client, Storage } from "appwrite";
import { useNavigation } from "@react-navigation/native";
import HomeStyle from "../../styling/HomeStyle";


export default function EventListScreen() {
    const navigation = useNavigation();

    const [data, setData] = useState([]);

    // Rest of your code
    // const client = new Client()
    //     .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    //     .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

    // client.subscribe("databases.653ae4b2740b9f0a5139.collections.655280f07e30eb37c8e8.documents", response => {
    //     console.log(response);
    // });

    const getEvents = async () => {

        try {
            const client = new Client()
                .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
                .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

            const database = new Databases(client);
            const storage = new Storage(client);

            //Get docs from specified collection from db
            let promise = database.listDocuments(
                "653ae4b2740b9f0a5139", //DB ID
                "655280f07e30eb37c8e8", //Collection ID
            );

            //Successful pull from db. Add data to array with set data in for loop...
            //
            promise.then(async function (response) {
                for (let index = 0; index < response.documents.length; index++) {   //Iterate over every document in db

                    let LongDescription = response["documents"][index]["LongDescription"];

                    let result = storage.getFileView(
                        "653ae4d2b3fcc68c10bf", //BucketID
                        response["documents"][index]["FileID"] //File ID
                    );

                    console.log(result);

                    setData(data => [...data,  //Add document data to array that contains react-native code to render the events 

                    <Pressable key={index} onPress={() => navigation.navigate("EventDetailsScreen", { EventDescription: LongDescription })}>
                        <Card style={HomeStyle.eventCard} >
                            <Card.Content style={HomeStyle.eventCardContent}>
                                <Image source={{ uri: result.toString() }} style={HomeStyle.eventShortImage} />
                                <Text style={HomeStyle.eventShortTitle}>{response["documents"][index]["Name"]}</Text>
                                <Text style={HomeStyle.eventShortDescription}>{response["documents"][index]["ShortDescription"]}</Text>
                            </Card.Content>
                        </Card>
                    </Pressable>
                    ]);
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
            </ScrollView>
        </SafeAreaView>


    );
}