import { connectDB } from "@/lib/db";
import { Profile } from "@/lib/models/Profile";

export async function getProfileFromDB() {
  await connectDB();
  const profile = await Profile.findOne().lean();
  return JSON.parse(JSON.stringify(profile));
}

export async function upsertProfile(data: any) {
  await connectDB();
  const profile = await Profile.findOneAndUpdate(
    {},
    data,
    { upsert: true, new: true }
  ).lean();

  return JSON.parse(JSON.stringify(profile));
}
