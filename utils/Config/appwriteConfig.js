// Imports needed to function
import { Client, Account, Databases, Storage } from "appwrite";

// Named Exports
export const API_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
export const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
export const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
export const MAP_COLLECTION_ID = process.env.EXPO_PUBLIC_MAP_COLLECTION_ID;
export const EVENTS_COLLECTION_ID = process.env.EXPO_PUBLIC_EVENT_COLLECTION_ID;
export const ALERTS_COLLECTION_ID = process.env.EXPO_PUBLIC_ALERTS_COLLECTION_ID;
export const ACCOUNT_RECOVERY_DOMAIN = process.env.EXPO_PUBLIC_RECOVERY_DOMAIN;

// Create a client to connect
const client = new Client()
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID);


export const account = new Account(client); // Named export use {account} when importing
export const database = new Databases(client); // Named export use {databases} when importing
export const storage = new Storage(client); // Named export use {storage} when importing

export default client; // default export use the word client when exporting