import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTOPLAY_PREFERENCE_KEY = "auto_play_preference";

export const saveAutoPlayPreference = async (preference) => {
    try {
        await AsyncStorage.setItem(AUTOPLAY_PREFERENCE_KEY, JSON.stringify(preference));
        console.log("Autoplay preference saved successfully:", preference);
    } catch (error) {
        console.error("Error saving auto play preference:", error);
    }
};

export const getAutoPlayPreference = async () => {
    try {
        const preference = await AsyncStorage.getItem(AUTOPLAY_PREFERENCE_KEY);
        console.log("Retrieved autoplay preference:", preference);
        return preference !== null ? JSON.parse(preference) : false; // Default to false if no value is set
    } catch (error) {
        console.error("Error getting auto play preference:", error);
        return false; // Return false in case of error
    }
};