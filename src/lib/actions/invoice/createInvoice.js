"use server";
import db from "@/lib/db";

export default async function createInvoice(customerData, inputData) {
  try {
    const customer = await db.customer.create({
      data: customerData,
    });
    if (!customer?.id) {
      return {
        success: false,
        message: "Customer data not created",
      };
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
      return {
        success: false,
        message: "Invoice is not created",
      };
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
    return {
      success: true,
      message: "Invoice is created",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
