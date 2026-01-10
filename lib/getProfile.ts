import { connectDB } from "@/lib/db";
import { Profile } from "@/lib/models/Profile";

export async function getProfileFromDB() {
  try {
    await connectDB();
    const profile = await Profile.findOne().lean();
    return profile ? JSON.parse(JSON.stringify(profile)) : null;
  } catch (error) {
    console.error("getProfileFromDB error:", error);
    return null; // 🔥 prevents crash
  }
}

export async function upsertProfile(data: any) {
  try {
    await connectDB();
    const profile = await Profile.findOneAndUpdate(
      {},
      data,
      { upsert: true, new: true }
    ).lean();

    return profile ? JSON.parse(JSON.stringify(profile)) : null;
  } catch (error) {
    console.error("upsertProfile error:", error);
    return null;
  }
}
