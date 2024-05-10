"use server";
import db from "@/lib/db";

export default async function updateInvoice(id, invoiceData) {
  try {
    const data = await db.invoice.update({
      where: {
        id,
      },
      data: invoiceData,
    });
    if (!data) {
      return {
        success: false,
        message: "Invoice is not updated",
      };
    }

    return {
      success: true,
      message: "Invoice is updated",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
