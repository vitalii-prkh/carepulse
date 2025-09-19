"use server";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "@/lib/appwrite.config";
import {ID} from "node-appwrite";
import {parseStringify} from "@/lib/utils";

export async function createAppointment(data: CreateAppointmentParams) {
  try {
    const appointment = await databases.createDocument({
      databaseId: DATABASE_ID,
      collectionId: APPOINTMENT_COLLECTION_ID,
      documentId: ID.unique(),
      data,
    });

    return parseStringify(appointment);
  } catch (error: unknown) {
    console.log(error);
  }
}
