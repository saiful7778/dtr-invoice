"use server";

import db from "@/lib/db";

export default async function deleteProduct(id) {
  try {
    const data = await db.product.delete({
      where: { id },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
