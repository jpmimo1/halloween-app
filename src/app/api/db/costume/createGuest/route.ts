import { guest } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  try {
    const prisma = new PrismaClient();

    const params = await req.json() as guest;

    const guest = await prisma.guest.create({ data: params });

    await prisma.$disconnect();

    return NextResponse.json({ guestId: guest.id });
  } catch (ex) {
    return NextResponse.json({ error: ex }, { status: 500 });
  }
}
