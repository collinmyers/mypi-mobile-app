import AsyncStorage from "@react-native-async-storage/async-storage";

const PUSH_NOTIFICATION_PREF_KEY = "push_notification_pref";

export const savePushNotificationPreference = async (value) => {
  try {
    await AsyncStorage.setItem(PUSH_NOTIFICATION_PREF_KEY, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving push notification preference:", error);
  }
};

export const getPushNotificationPreference = async () => {
  try {
    const value = await AsyncStorage.getItem(PUSH_NOTIFICATION_PREF_KEY);
    return value !== null ? JSON.parse(value) : false; // Default to false if no value is set
  } catch (error) {
    console.error("Error getting push notification preference:", error);
    return false; // Return false in case of error
  }
};