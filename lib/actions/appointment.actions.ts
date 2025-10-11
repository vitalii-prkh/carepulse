"use server";

import {ID, Query} from "node-appwrite";
import {revalidatePath} from "next/cache";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  tablesDB,
  messaging,
} from "@/lib/appwrite.config";
import {formatDateTime, parseStringify} from "@/lib/utils";

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

export async function updateAppointment(data: UpdateAppointmentParams) {
  try {
    const appointment = await tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: APPOINTMENT_COLLECTION_ID,
      rowId: data.appointmentId,
      data: data.appointment,
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    const smsMessage =
      data.appointment.status === "scheduled"
        ? `Hi, it's CarePulse. Your appointment has been scheduled ${formatDateTime(data.appointment.schedule).dateTime}.`
        : `Hi, it's CarePulse. We regret to inform you that your appointment has been cancelled. Reason: ${data.appointment.reason}`;

    await sendSMSNotification(data.userId, smsMessage);

    revalidatePath("/admin");
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

export async function getRecentAppointmentsList() {
  try {
    const appointments = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: APPOINTMENT_COLLECTION_ID,
      queries: [
        Query.orderDesc("$createdAt"),
        Query.select(["*", "patient.*"]),
      ],
    });

    const initialCounts = {
      scheduled: 0,
      pending: 0,
      cancelled: 0,
      total: appointments.rows.length,
    };
    const counts = appointments.rows.reduce((memo, appointment) => {
      if (appointment.status === "scheduled") {
        memo.scheduled++;
      }

      if (appointment.status === "pending") {
        memo.pending++;
      }

      if (appointment.status === "cancelled") {
        memo.cancelled++;
      }

      return memo;
    }, initialCounts);

    return parseStringify({
      ...counts,
      total: appointments.total,
      rows: appointments.rows,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function sendSMSNotification(userId: string, content: string) {
  try {
    const message = await messaging.createSMS({
      messageId: ID.unique(),
      content,
      users: [userId],
    });

    return parseStringify(message);
  } catch (error: unknown) {
    console.log(error);
  }
}
