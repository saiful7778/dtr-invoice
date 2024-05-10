"use server";
import db from "@/lib/db";
import { genSalt, hash } from "bcryptjs";

export default async function createUser(userData) {
  try {
    const exist = await db.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (exist) {
      return {
        success: false,
        message: "user is already exist!",
      };
    }
    const saltValue = await genSalt(10);
    const hashedPassword = await hash(userData.password, saltValue);

    const data = await db.user.create({
      data: {
        name: userData.fullName,
        email: userData.email,
        hashedPassword,
      },
    });
    if (!data) {
      return {
        success: false,
        message: "user is not created!",
      };
    }
    return {
      success: true,
      message: "user is created!",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
