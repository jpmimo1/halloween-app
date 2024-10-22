
import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { listCostumes } from "./data";

export async function GET() {
  try {
    // const prisma = new PrismaClient();

    // await prisma.costume.createMany({ data: listCostumes })

    // await prisma.$disconnect();

    return NextResponse.json('success');
  } catch (ex) {
    return NextResponse.json({ error: ex }, { status: 500 });
  }
}
