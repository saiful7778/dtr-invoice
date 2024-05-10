"use server";
import db from "@/lib/db";

export default async function createProduct(productData, userId) {
  try {
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
      return {
        success: false,
        message: "Product is not created",
      };
    }
    return {
      success: true,
      message: "Product is created",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
