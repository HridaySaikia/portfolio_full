export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BlurBlob from "@/components/BlurBlob";
import { getProfileFromDB } from "@/lib/profile.service";

export default async function Home() {
  const profile = await getProfileFromDB();

  return (
    <div className="bg-[#050414]">
      {/* UI unchanged */}
    </div>
  );
}
