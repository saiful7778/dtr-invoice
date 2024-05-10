"use server";
import db from "@/lib/db";

export default async function getInvoiceStats() {
  try {
    const [[totalSells], sec, allInvoice] = await db.$transaction([
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
      db.invoice.findMany({
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      }),
    ]);

    const profit = allInvoice?.reduce(
      (sum1, curr1) =>
        sum1 +
        curr1?.products?.reduce(
          (sum2, curr2) =>
            sum2 +
            (curr2.quantity * curr2.product.sell -
              curr2.quantity * curr2.product.cost),
          0,
        ),
      0,
    );

    return { ...totalSells, ...sec, profit };
  } catch (err) {
    throw new Error(err);
  }
}
