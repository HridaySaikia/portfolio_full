export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// other imports...

async function getProfile() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const profile = await getProfile(); // ✅ SAFE

  return (
    <div className="bg-[#050414]">
      <Navbar />
      <Hero profile={profile} /> {/* handle null */}
      {/* rest */}
    </div>
  );
}
