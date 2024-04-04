"use server";
import db from "@/lib/db";

export default async function createProduct(productData) {
  try {
    const data = await db.product.create({
      data: productData,
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
