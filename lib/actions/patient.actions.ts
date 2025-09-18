import {ID, Query, AppwriteException} from "node-appwrite";
import {client, users} from "@/lib/appwrite.config";
import {parseStringify} from "@/lib/utils";

export async function createUser(user: CreateUserParams) {
  try {
    await client.ping();
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
      const documents = await users.list([Query.equal("email", user.email)]);

      return documents?.users[0];
    }
  }
}
