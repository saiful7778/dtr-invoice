"use server";
import db from "@/lib/db";
import { addProductSchema } from "@/lib/schemas/Product";

export default async function createProduct(productData, userId) {
  try {
    const isValid = await addProductSchema.isValid(productData);
    if (!isValid) {
      throw "Invalid input data";
    }
    const data = await db.product.create({
      data: {
        ...productData,
        createdBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
    if (!data) {
      throw "Something went wrong";
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
}
