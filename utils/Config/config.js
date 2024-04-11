// Imports needed to function
import { Client, Account, Databases, Storage, Functions } from "appwrite";

// Named Exports
export const API_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
export const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
export const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
export const MAP_COLLECTION_ID = process.env.EXPO_PUBLIC_MAP_COLLECTION_ID;
export const EVENTS_COLLECTION_ID = process.env.EXPO_PUBLIC_EVENT_COLLECTION_ID;
export const ALERTS_COLLECTION_ID = process.env.EXPO_PUBLIC_ALERTS_COLLECTION_ID;
export const RECOVERY_DOMAIN = process.env.EXPO_PUBLIC_RECOVERY_DOMAIN;
export const USER_NOTIFICATION_TOKENS = process.env.EXPO_PUBLIC_USER_NOTIFICATION_TOKENS_COLLECTION_ID;
export const USER_ALIAS_TABLE_ID = process.env.EXPO_PUBLIC_USER_ALIAS_TABLE_COLLECTION_ID;
export const FOOD_TRUCK_POI = process.env.EXPO_PUBLIC_FOOD_TRUCK_POI_COLLECTION_ID;
export const BUNDLER_PACKAGE_IDENTIFIER = process.env.EXPO_PUBLIC_BUNDLE_AND_PACKAGE_IDENTIFIER;
export const FILE_BUCKET_ID = process.env.EXPO_PUBLIC_FILE_BUCKET_ID;
export const PUSH_NOTIFICATION_ID = process.env.EXPO_PUBLIC_PUSH_NOTIFICATION_FUNCTION_ID;
export const DELETE_USER_FUNCTION_ID = process.env.EXPO_PUBLIC_DELETE_USER_AND_DATA_FUNCTION;
export const DONATIONS_PROVIDER_LINK = process.env.EXPO_PUBLIC_DONATION_PROVIDER_LINK;

// Create a client to connect
const client = new Client()
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID);


export const account = new Account(client); // Named export use {account} when importing
export const database = new Databases(client); // Named export use {databases} when importing
export const storage = new Storage(client); // Named export use {storage} when importing
export const functions = new Functions(client); // Named export use {functions} when importing

export const subscribeToRealTimeUpdates = (handleSubscription, CURRENT_COLLECTION_ID) => {
    // Subscribe to real-time updates
    return client.subscribe(
        `databases.${DATABASE_ID}.collections.${CURRENT_COLLECTION_ID}.documents`,
        handleSubscription
    );
};

export default client; // default export use the word client when exporting