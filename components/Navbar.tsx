"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface MenuItem {
  id: string;
  label: string;
}

interface ProfileData {
  github?: string;
  linkedin?: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const menuItems: MenuItem[] = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .finally(() => setLoading(false));
  }, []);

  const handleMenuItemClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition duration-300 
      px-[7vw] md:px-[7vw] lg:px-[15vw]
      ${isScrolled ? "bg-[#050414]/60 backdrop-blur-md shadow-md" : "bg-transparent"}`}
    >
      <div className="text-white py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold cursor-pointer whitespace-nowrap">
          <span className="text-cyan-400">&lt;</span>
          <span>Hridayananda</span>
          <span className="text-cyan-400">/</span>
          <span>Saikia</span>
          <span className="text-cyan-400">&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-300">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer hover:text-cyan-400 ${
                activeSection === item.id ? "text-cyan-400" : ""
              }`}
            >
              <button onClick={() => handleMenuItemClick(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex space-x-5">
          {!loading && profile?.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} className="hover:text-cyan-400" />
            </a>
          )}
          {!loading && profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="hover:text-cyan-400" />
            </a>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {isOpen ? (
            <X className="text-3xl text-cyan-400" onClick={() => setIsOpen(false)} />
          ) : (
            <Menu className="text-3xl text-cyan-400" onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4/5 
        bg-[#050414]/60 backdrop-blur-lg rounded-lg shadow-lg md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-300">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`hover:text-white ${
                    activeSection === item.id ? "text-cyan-400" : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <div className="flex space-x-4 pt-2">
              {profile?.github && <FaGithub size={24} />}
              {profile?.linkedin && <FaLinkedin size={24} />}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
