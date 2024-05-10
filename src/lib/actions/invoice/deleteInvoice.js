"use server";

import db from "@/lib/db";

export default async function deleteInvoice(id) {
  try {
    const data = await db.invoice.delete({
      where: {
        id,
      },
    });
    if (!data) {
      return {
        success: false,
        message: "Invoice is not deleted",
      };
    }

    return {
      success: true,
      message: "Invoice is deleted",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
