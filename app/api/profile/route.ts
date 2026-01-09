import { NextResponse } from "next/server";
import { getProfileFromDB, upsertProfile } from "@/lib/getProfile";

export async function GET() {
  const profile = await getProfileFromDB();
  return NextResponse.json(profile);
}

export async function POST(req: Request) {
  const body = await req.json();
  const profile = await upsertProfile(body);
  return NextResponse.json(profile);
}
