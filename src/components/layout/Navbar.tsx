"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type MenuItem = {
  id: string;
  label: string;
  submenu?: { id: string; label: string }[];
};

const menuItems: MenuItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  {
    id: "academics",
    label: "Academics",
    submenu: [
      { id: "curriculum", label: "Curriculum" },
      { id: "methodology", label: "Teaching Methodology" },
      { id: "programs", label: "Programs Offered" },
    ],
  },
  { id: "admissions", label: "Admissions" },
  { id: "campuses", label: "Campuses" },
  { id: "results", label: "Results" },
  { id: "news", label: "News & Events" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderItem = (item: MenuItem, isMobile = false) => {
    const dropdownState = isMobile ? mobileOpenDropdown : openDropdown;
    const setDropdown = isMobile ? setMobileOpenDropdown : setOpenDropdown;

    return (
      <div
        key={item.id}
        className={`relative ${isMobile ? "w-full" : ""}`}
        onMouseEnter={() => !isMobile && item.submenu && setDropdown(item.id)}
        onMouseLeave={() => !isMobile && setDropdown(null)}
      >
        <button
          onClick={() => {
            if (item.submenu) {
              setDropdown(dropdownState === item.id ? null : item.id);
            } else {
              setActiveItem(item.id);
              if (isMobile) setIsMobileMenuOpen(false);
              setDropdown(null);
            }
          }}
          className={`group relative flex items-center justify-between gap-1 rounded-xl px-4 py-2 text-[15px] font-medium w-full text-left
            ${activeItem === item.id 
  ? "text-[#002856]" 
  : "text-slate-700 hover:bg-slate-100 hover:text-[#002856]"
}

            }
            ${isMobile && activeItem === item.id ? "bg-[#002856] text-white" : ""}
          `}
        >
          <span>{item.label}</span>
          {item.submenu && (
            <ChevronDown
              className={`size-4 transition-transform ${dropdownState === item.id ? "rotate-180" : ""}`}
            />
          )}
          {!isMobile && (
            <span
              className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#a41f2a] transition-transform 
                ${activeItem === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
              `}
            />
          )}
        </button>

        <AnimatePresence>
          {item.submenu && dropdownState === item.id && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.3 }}

              className={`${isMobile ? "ml-3 mt-1 space-y-1" : "absolute left-0 top-full z-30 mt-2 min-w-[250px] rounded-xl border border-slate-200 bg-white py-2 shadow-2xl"}`}
            >
              {item.submenu.map((subItem) => (
                <button
                  key={subItem.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    setDropdown(null);
                    if (isMobile) setIsMobileMenuOpen(false);
                  }}
                  className={`${isMobile ? "block w-full rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#002856]" : "block w-full px-5 py-2.5 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-[#002856]"}`}
                >
                  {subItem.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.nav
      initial={{ opacity: 0, filter: "blur(20px)", scale: 1 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`sticky top-0 z-50 
border-b border-slate-200/60
bg-white/80 backdrop-blur-xl
${isScrolled 
  ? "shadow-[0_10px_40px_rgba(0,0,0,0.12)]" 
  : "shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
}`}

    >
      <div className="max-w-[100vw] px-4">
        <motion.div
          animate={{ height: isScrolled ? 58 : 80 }}
          transition={{ type: "spring", stiffness: 250, damping: 24 }}
          className="relative flex items-center justify-between"
        >
          <motion.a
            href="#"
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center gap-4 group"
          >
            {/* Logo Badge */}
            <div className="bg-white rounded-2xl p-2 shadow-md transition-all duration-300 group-hover:shadow-lg">
              <Image
                src="/logo-scs.svg"
                alt="Sri Chaitanya Crest"
                width={isScrolled?45:60}
                height={60}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>

            {/* Text Section */}
            <div className="text-left leading-tight">
              <p className="font-serif text-[30px] tracking-tight text-[#002856] group-hover:text-[#a41f2a] transition-colors duration-300">
                Sri Chaitanya
              </p>
              <p className="text-[13px] uppercase tracking-[0.35em] text-slate-600">
                School of Excellence
              </p>
            </div>
          </motion.a>


          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => renderItem(item))}
          </div>

          <div className="hidden lg:flex items-center">
            <button
              className="ml-3 rounded-full bg-[#a41f2a] px-7 py-2.5 text-sm font-semibold text-white shadow-[0_20px_36px_-24px_rgba(164,31,42,0.85)] transition hover:bg-[#8c1a24] hover:shadow-xl"
            >
              Apply Admission
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden rounded-md p-2 text-slate-700 hover:bg-slate-100"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </motion.div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(6px)", scale: 0.98 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(6px)", scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}


              className="overflow-hidden border-t border-slate-200 lg:hidden"
            >
              <div className="space-y-1 py-3 px-2">
                {menuItems.map((item) => renderItem(item, true))}
                <button className="mt-2 w-full rounded-full bg-[#a41f2a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#8c1a24]">
                  Apply Admission
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}