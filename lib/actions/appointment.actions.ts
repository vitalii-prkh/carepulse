"use server";

import {ID, Query} from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "@/lib/appwrite.config";
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

export async function getAppointment(appointmentId: string) {
  try {
    const patients = await databases.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: APPOINTMENT_COLLECTION_ID,
      queries: [Query.equal("$id", appointmentId)],
    });

    return parseStringify(patients.documents[0]);
  } catch (error: unknown) {
    console.log(error);
  }
}
