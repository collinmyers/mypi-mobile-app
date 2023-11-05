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
        title: "Presque Isle",
        body: "There is a Tornado",
      },
      trigger: null, // Send immediately
      presentation: {
        style: "notification", // or 'notification'
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
      <TouchableOpacity onPress={sendNotification}>
        <View style={{ backgroundColor: "blue", padding: 10, borderRadius: 50, width: 200, marginLeft: 100 }}>
          <Text style={{ color: "white" }}>Send New Notification</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
