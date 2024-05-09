"use server";

import db from "@/lib/db";

export default async function deleteInvoice(id) {
  try {
    const data = await db.invoice.delete({
      where: {
        id,
      },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
