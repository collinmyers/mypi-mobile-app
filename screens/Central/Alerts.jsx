import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import * as Notifications from "expo-notifications";

export default function AlertsScreen() {
  const [notificationCount, setNotificationCount] = useState(0);

  const sendNotification = async () => {
    // Create a simple notification
    console.log("new notification");

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Park Alert",
        body: "There is a tree down near Beach 8, use caution.",
      },
      trigger: null,
      presentation: {
        style: "notification",
      },
    });

    setNotificationCount(notificationCount + 1);
  };

  useEffect(() => {
    // Request notification permissions when the component mounts
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to receive notifications denied.");
        return;
      }
    })();

    // Define the notification handler
    const notificationHandler = {
      handleNotification: async (notification) => {
        // Handle the presented notification here
        const { title, body } = notification.request.content;

        // For example, show an alert with the notification content
        Alert.alert(title, body);

        // You can add more customized behavior here, such as navigating to a specific screen.
      },
    };

    // Set the notification handler
    Notifications.setNotificationHandler(notificationHandler);
  }, []);

  
  return (
    <View style={{ justifyContent: "center", height: "100%" }}>
      <Text style={{ textAlign: "center" }}>Alerts</Text>
      <TouchableOpacity onPress={sendNotification} style={{alignSelf: "center"}}>
        <View style={{ backgroundColor: "blue", padding: 20, borderRadius: 50, justifyContent: "center" }}>
          <Text style={{ color: "white" , textAlign: "center"}}>Send New Notification</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
