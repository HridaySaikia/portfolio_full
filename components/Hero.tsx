"use client";

import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import type { Profile } from "@/types";
import CVDownloadModal from "./CVDownloadModal";

export default function Hero({ profile }: { readonly profile: Profile | null }) {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  return (
    <>
      <section
        id="about"
        className="
          pt-40 pb-16
          px-6 sm:px-[7vw] lg:px-[15vw]
          font-sans
        "
      >
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12 lg:gap-20">

          {/* Left */}
          <div className="md:w-1/2 text-center md:text-left">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Hi, I am
            </h1>

            <h2
              className="
                text-4xl sm:text-5xl md:text-6xl
                font-bold text-white mb-4
                leading-tight
                whitespace-normal md:whitespace-nowrap
              "
            >
              {profile?.name ?? "Hridayananda Saikia"}
            </h2>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-10 mb-10 text-cyan-400 leading-tight 
               flex items-center whitespace-nowrap">
                <span className="text-white mr-2">I am a</span>

                <span className="inline-block min-w-[22ch]">
                  <Typewriter
                    words={[
                      "Coder",
                      "Web Developer",
                      "Tech | Electronics Enthusiast",
                    ]}
                    loop
                    cursor
                    cursorStyle="_"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </h3>


            <p className="text-base sm:text-lg text-gray-400 mt-4 mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
              {profile?.bio ??
                "I'm a passionate web developer and coder with a strong interest in electronics projects. I love building responsive websites, solving problems through code, and experimenting with innovative tech-driven solutions that blend software and hardware."}
            </p>

            <button
              onClick={() => setIsCVModalOpen(true)}
              className="
                inline-block
                text-white text-base sm:text-lg font-medium
                px-6 py-3
                rounded-xl
                transition-transform duration-300
                hover:scale-105
                border border-cyan-400
                bg-cyan-400/10
                backdrop-blur-md
              "
            >
              DOWNLOAD CV
            </button>
          </div>

          {/* Right */}
          <div className="md:w-1/2 flex justify-center md:justify-end md:translate-x-6 lg:translate-x-16">

            <Tilt
              className="
                w-40 h-40
                sm:w-56 sm:h-56
                md:w-80 md:h-80
                lg:w-[26rem] lg:h-[26rem]
                border-4 border-cyan-400
                rounded-full
              "
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              gyroscope
            >
              <Image
                src={
                  profile?.profilePic?.trim()
                    ? profile.profilePic
                    : "/profile.png"
                }
                alt={profile?.name || "Hridayananda Saikia"}
                fill
                className="rounded-full object-cover"
                priority
              />
            </Tilt>
          </div>

        </div>
      </section>

      <CVDownloadModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />
    </>
  );
}
