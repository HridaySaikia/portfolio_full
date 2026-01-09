import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function getProfile() {
  await connectDB();
  const profile = await Profile.findOne().lean();

  return JSON.parse(JSON.stringify(profile));
}
