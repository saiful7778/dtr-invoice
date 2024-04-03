"use server";
import db from "@/lib/db";
import { createUserSchema } from "@/lib/schemas/authentication";
import { hash } from "bcryptjs";

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
    const hashedPassword = await hash(userData.password, 10);
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
