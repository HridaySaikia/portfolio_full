// app/api/profile/route.ts
import { connectDB } from "@/lib/db";
import { Profile } from "@/lib/models/Profile";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne();
    return NextResponse.json(profile);
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
