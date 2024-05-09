"use server";

import db from "@/lib/db";

export default async function updateInvoice(id, invoiceData) {
  try {
    await db.invoice.update({
      where: {
        id,
      },
      data: invoiceData,
    });
  } catch (err) {
    throw new Error(err);
  }
}
