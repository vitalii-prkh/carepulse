"use server";

import {ID, Query, AppwriteException} from "node-appwrite";
import {InputFile} from "node-appwrite/file";
import {
  BUCKED_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "@/lib/appwrite.config";
import {parseStringify} from "@/lib/utils";

export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await users.create({
      userId: ID.unique(),
      email: user.email,
      phone: user.phone,
      password: undefined,
      name: user.name,
    });

    return parseStringify(newUser);
  } catch (error: unknown) {
    if (error instanceof AppwriteException && error?.code === 409) {
      const documents = await users.list({
        queries: [Query.equal("email", user.email)],
        search: undefined,
      });

      return documents?.users[0];
    }
  }
}

export async function getUser(userId: string) {
  try {
    const user = await users.get({userId});

    return parseStringify(user);
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function getPatient(userId: string) {
  try {
    const patients = await databases.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: PATIENT_COLLECTION_ID,
      queries: [Query.equal("userId", userId)],
    });

    return parseStringify(patients.documents[0]);
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function registerPatient(patient: RegisterUserParams) {
  const {identificationDocument, ...values} = patient;

  try {
    let file;

    if (identificationDocument instanceof FormData) {
      file = await storage.createFile({
        bucketId: BUCKED_ID,
        fileId: ID.unique(),
        file: InputFile.fromBuffer(
          identificationDocument.get("blobFile") as Blob,
          identificationDocument.get("fileName") as string,
        ),
      });
    }

    const patient = await databases.createDocument({
      databaseId: DATABASE_ID,
      collectionId: PATIENT_COLLECTION_ID,
      documentId: ID.unique(),
      data: {
        ...values,
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file
          ? `${ENDPOINT}/storage/buckets/${BUCKED_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
      },
    });

    return parseStringify(patient);
  } catch (error: unknown) {
    console.log(error);
  }
}
