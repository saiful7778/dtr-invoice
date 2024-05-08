import db from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const q = await req.nextUrl.searchParams.get("q");

    const data = await db.product.findMany({
      where: {
        productName: {
          contains: q,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        productName: true,
        sell: true,
        quantity: true,
      },
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
}
