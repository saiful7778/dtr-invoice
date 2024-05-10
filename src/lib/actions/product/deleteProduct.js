"use server";

import db from "@/lib/db";

export default async function deleteProduct(id) {
  try {
    const data = await db.product.delete({
      where: { id },
    });
    if (!data) {
      return {
        success: false,
        message: "Product is not deleted",
      };
    }
    return {
      success: true,
      message: "Product is deleted",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
