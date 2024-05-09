"use server";
import db from "@/lib/db";

export default async function getInvoiceStats() {
  try {
    const [[{ totalSells }], sec] = await db.$transaction([
      db.invoice.aggregateRaw({
        pipeline: [
          {
            $group: {
              _id: null,
              totalSells: {
                $sum: "$totalPrice",
              },
            },
          },
          {
            $project: {
              _id: 0,
              totalSells: 1,
            },
          },
        ],
      }),
      db.invoice.findFirst({
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          id: true,
          invoiceId: true,
          totalPrice: true,
        },
      }),
    ]);
    return { totalSells, ...sec };
  } catch (err) {
    throw new Error(err);
  }
}
