"use server";
import db from "@/lib/db";

export default async function getProductStats() {
  try {
    const [data] = await db.product.aggregateRaw({
      pipeline: [
        {
          $group: {
            _id: null,
            totalCost: {
              $sum: "$cost",
            },
            totalStock: {
              $sum: "$quantity",
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalCost: 1,
            totalStock: 1,
          },
        },
      ],
    });
    const lastProduct = await db.product.findFirst({
      orderBy: { createdAt: "desc" },
      take: 1,
      select: {
        id: true,
        productName: true,
        quantity: true,
        cost: true,
        sell: true,
      },
    });

    return { ...data, ...lastProduct };
  } catch (err) {
    throw new Error(err);
  }
}
