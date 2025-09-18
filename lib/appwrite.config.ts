import {Client, Databases, Storage, Messaging, Users} from "node-appwrite";

export const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

export const API_KEY = process.env.NEXT_PUBLIC_APPWRITE_API_KEY!;

export const DATABASE_ID = process.env.DATABASE_ID!;

export const PATIENT_COLLECTION_ID = process.env.PATIENT_COLLECTION_ID!;

export const DOCTOR_COLLECTION_ID = process.env.DOCTOR_COLLECTION_ID ?? "";

export const APPOINTMENT_COLLECTION_ID =
  process.env.APPOINTMENT_COLLECTION_ID ?? "";

export const BUCKED_ID = process.env.NEXT_PUBLIC_BUCKED_ID!;

export const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;

const client = new Client();

client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

export {client};

export const databases = new Databases(client);

export const storage = new Storage(client);

export const messaging = new Messaging(client);

export const users = new Users(client);
