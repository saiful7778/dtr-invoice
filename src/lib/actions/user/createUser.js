"use server";
import db from "@/lib/db";
import { createUserSchema } from "@/lib/schemas/authentication";
import { genSalt, hash } from "bcryptjs";

export default async function createUser(userData) {
  try {
    const isValid = await createUserSchema.isValid(userData);
    if (!isValid) {
      throw "Invalid input!";
    }
    const exist = await db.user.findFirst({
      where: {
        email: userData.email,
      },
    });
    if (exist) {
      throw "user is already exist!";
    }
    const saltValue = await genSalt(10);
    const hashedPassword = await hash(userData.password, saltValue);

    await db.user.create({
      data: {
        name: userData.fullName,
        email: userData.email,
        hashedPassword,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
}
