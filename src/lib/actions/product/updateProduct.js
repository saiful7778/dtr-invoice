"use server";

import db from "@/lib/db";
import { addProductSchema } from "@/lib/schemas/Product";

export default async function updateProduct(productId, productData) {
  try {
    const isValid = await addProductSchema.isValid(productData);
    if (!isValid) {
      throw "Invalid input data";
    }
    const isExist = await db.product.findUnique({ where: { id: productId } });
    if (!isExist) {
      throw "No data found";
    }
    await db.product.update({
      where: {
        id: productId,
      },
      data: productData,
    });
  } catch (err) {
    throw new Error(err);
  }
}
