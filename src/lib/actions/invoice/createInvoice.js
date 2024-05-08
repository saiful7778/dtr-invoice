"use server";
import db from "@/lib/db";

export default async function createInvoice(customerData, inputData) {
  try {
    const customer = await db.customer.create({
      data: customerData,
    });
    if (!customer?.id) {
      throw "Customer data not created";
    }

    const invoice = await db.invoice.create({
      data: {
        ...inputData,
        customer: {
          connect: {
            id: customer.id,
          },
        },
      },
    });

    if (!invoice?.id) {
      throw "Invoice data not created";
    }
    for (let x of inputData.products.create) {
      await db.product.update({
        where: {
          id: x.productId,
        },
        data: {
          quantity: { decrement: x.quantity },
        },
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}
