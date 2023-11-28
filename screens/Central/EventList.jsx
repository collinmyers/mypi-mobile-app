import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { ScrollView, SafeAreaView, Pressable, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { Databases, Client, Storage } from "appwrite";
import { useNavigation } from "@react-navigation/native";
import HomeStyle from "../../styling/HomeStyle";

export default function EventListScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
    // Initialize Appwrite client
    const client = new Client()
      .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);

    // Function to handle real-time updates
    const handleSubscription = () => {
      getEvents();
    };
    // Subscribe to real-time updates
    const subscription = client.subscribe(
      "databases.653ae4b2740b9f0a5139.collections.655280f07e30eb37c8e8.documents",
      handleSubscription
    );

    getEvents();
 
  }, [])); // Empty dependency array means this effect will only run once when the component mounts

  const getEvents = async () => {
    try {
      const client = new Client()
        .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT);
  
      const database = new Databases(client);
      const storage = new Storage(client);
  
      const response = await database.listDocuments(
        "653ae4b2740b9f0a5139", // DB ID
        "655280f07e30eb37c8e8" // Collection ID
      );
   
 
      // Build a new array with updated data
      const newData = response.documents.map((document, index) => {
        const ShortDescription = document.ShortDescription;
        const EventName = document.Name;
        const LongDescription = document.LongDescription;
        const EventLatitude = document.Latitude;
        const EventLongitude = document.Longitude;
  
        const EventImage = storage.getFileView(
          "653ae4d2b3fcc68c10bf", // BucketID
          document.FileID // File ID
        ).toString();
  
        return (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate("EventDetailsScreen", {
                EventImage: EventImage,
                EventName: EventName,
                EventDescription: LongDescription,
                EventLatitude: EventLatitude,
                EventLongitude: EventLongitude,
              })
            }
          >
            <Card style={HomeStyle.eventCard}>
              <Card.Content style={HomeStyle.eventCardContent}>
                <Image source={{ uri: EventImage }} style={HomeStyle.eventListImage} />
                <Text style={HomeStyle.eventListTitle}>{EventName}</Text>
                <Text style={HomeStyle.eventListDescription}>{ShortDescription}</Text>
              </Card.Content>
            </Card>
          </Pressable>
        );
      });
      // Update state with the new array
     setData(newData);
      } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <SafeAreaView style={HomeStyle.eventContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>{data}</ScrollView>
    </SafeAreaView>
  );
}
