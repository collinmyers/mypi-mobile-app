import AsyncStorage from "@react-native-async-storage/async-storage";

const PUSH_NOTIFICATION_PREF_KEY = "push_notification_pref";

export const savePushNotificationPreference = async (preference) => {
  try {
    await AsyncStorage.setItem(PUSH_NOTIFICATION_PREF_KEY, JSON.stringify(preference));
    console.log("Push Notification preference saved successfully:", preference);
  } catch (error) {
    console.error("Error saving push notification preference:", error);
  }
};

export const getPushNotificationPreference = async () => {
  try {
    const preference = await AsyncStorage.getItem(PUSH_NOTIFICATION_PREF_KEY);
    console.log("Retrieved autoplay preference:", preference);
    return preference !== null ? JSON.parse(preference) : false; // Default to false if no value is set
  } catch (error) {
    console.error("Error getting autoplay preference:", error);
    return false; // Return false in case of error
  }
};