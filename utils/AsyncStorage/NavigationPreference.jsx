import AsyncStorage from "@react-native-async-storage/async-storage";

const NAVIGATION_PREFERENCE_KEY = "navigation_preference";
const DEFAULT_NAVIGATION_PREFERENCE = "car";

export const saveNavigationPreference = async (preference) => {
    try {
        await AsyncStorage.setItem(NAVIGATION_PREFERENCE_KEY, preference);
        console.log("Navigation preference saved successfully:", preference);
    } catch (error) {
        console.error("Error saving navigation preference:", error);
    }
};

export const getNavigationPreference = async () => {
    try {
        const preference = await AsyncStorage.getItem(NAVIGATION_PREFERENCE_KEY);
        if (preference !== null) {
            console.log("Retrieved navigation preference:", preference);
            return preference;
        } else {
            console.log("No navigation preference found, using default:", DEFAULT_NAVIGATION_PREFERENCE);
            await saveNavigationPreference(DEFAULT_NAVIGATION_PREFERENCE);
            return DEFAULT_NAVIGATION_PREFERENCE;
        }
    } catch (error) {
        console.error("Error retrieving navigation preference:", error);
        return DEFAULT_NAVIGATION_PREFERENCE;
    }
};
