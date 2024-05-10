"use server";
import db from "@/lib/db";

export default async function updateProduct(productId, productData) {
  try {
    const isExist = await db.product.findUnique({ where: { id: productId } });
    if (!isExist) {
      return {
        success: false,
        message: "Product doesn't exist",
      };
    }
    const data = await db.product.update({
      where: {
        id: productId,
      },
      data: productData,
    });
    if (!data) {
      return {
        success: false,
        message: "Product is not updated",
      };
    }
    return {
      success: true,
      message: "Product is updated",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
