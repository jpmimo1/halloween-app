import { signUploadWidget } from "@/cloudinary/signUploadWidget";
import { NextRequest, NextResponse } from "next/server";
import { SignApiOptions } from 'cloudinary';

export async function POST(req: NextRequest) {
  try {
    const params = await req.json() as SignApiOptions;

    const sig = signUploadWidget(params);
    return NextResponse.json(sig);
  } catch (ex) {
    return NextResponse.json({ error: ex }, { status: 500 });
  }
}
