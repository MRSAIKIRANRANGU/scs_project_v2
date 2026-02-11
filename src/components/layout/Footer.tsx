"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
  ChevronRight,
  Award,
  Globe,
  BookOpen,
  Users,
  Sparkles,
  GraduationCap,
  Navigation,
  Clock,
  Building2,
  Locate,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

type FooterProps = {
  onNavigate?: (section: string) => void;
};

// Sri Chaitanya Corporate Office Location
const CORPORATE_OFFICE = {
  name: "Sri Chaitanya School Corporate Office",
  address: "Sri Sai Plaza, Plot No. 80, Ayyappa Society Main Rd, Guttala_Begumpet, Kavuri Hills, Madhapur",
  city: "Hyderabad",
  state: "Telangana",
  pincode: "500081",
  landmark: "Near Kavuri Hills Junction",
  coordinates: { lat: 17.446156294852543, lng: 78.39222245770425 },
  phone: "+91 1800-XXX-XXXX",
  email: "corporate@srichaitanya.net",
  hours: "Mon-Sat: 9:00 AM - 6:00 PM",
};

// Nearby branches (would be dynamically filtered based on user location)
const NEARBY_BRANCHES = [
  {
    name: "Madhapur Campus",
    area: "Kavuri Hills",
    phone: "+91 1800-XXX-1122",
    coordinates: { lat: 17.4461, lng: 78.3922 },
  },
  {
    name: "Hitech City Campus",
    area: "Hitech City",
    phone: "+91 1800-XXX-1133",
    coordinates: { lat: 17.4435, lng: 78.3772 },
  },
  {
    name: "Jubilee Hills Campus",
    area: "Jubilee Hills",
    phone: "+91 1800-XXX-1144",
    coordinates: { lat: 17.4294, lng: 78.4090 },
  },
  {
    name: "Banjara Hills Campus",
    area: "Banjara Hills",
    phone: "+91 1800-XXX-1155",
    coordinates: { lat: 17.4156, lng: 78.4340 },
  },
];

const getDistanceInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [showNearby, setShowNearby] = useState(false);
  const [detectedCity, setDetectedCity] = useState("Hyderabad");

  // Simulate user location detection
  useEffect(() => {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });

      // Optional: you can reverse geocode using API later
      console.log("User location:", latitude, longitude);
    },
    (error) => {
      console.log("Location permission denied or error:", error);
      setDetectedCity("Your Area");
    }
  );
}, []);


  const goTo = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
      return;
    }
    const target = document.getElementById(section);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nearbyBranches = userLocation
  ? NEARBY_BRANCHES.map((branch) => {
      const distance = getDistanceInKm(
        userLocation.lat,
        userLocation.lng,
        branch.coordinates.lat,
        branch.coordinates.lng
      );

      return {
        ...branch,
        distance: distance.toFixed(1),
      };
    })
      .sort((a, b) => Number(a.distance) - Number(b.distance))
      .slice(0, 4)
  : [];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${CORPORATE_OFFICE.address}, ${CORPORATE_OFFICE.city}, ${CORPORATE_OFFICE.state} ${CORPORATE_OFFICE.pincode}`
    )}`;
    window.open(url, '_blank');
  };

  const socialLinks = [
    { icon: Facebook, label: "Facebook", color: "hover:bg-[#1877F2]", href: "#" },
    { icon: Instagram, label: "Instagram", color: "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F56040]", href: "#" },
    { icon: Twitter, label: "Twitter", color: "hover:bg-[#1DA1F2]", href: "#" },
    { icon: Youtube, label: "YouTube", color: "hover:bg-[#FF0000]", href: "#" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:bg-[#0A66C2]", href: "#" },
  ];

  const quickLinks = [
    { name: "Home", section: "home" },
    { name: "About Us", section: "about" },
    { name: "Academics", section: "academics" },
    { name: "Admissions", section: "admissions" },
    { name: "Campuses", section: "campuses" },
    { name: "Results", section: "results" },
    { name: "Careers", section: "careers" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#002856] to-[#0d3a6c] text-white">
      {/* Decorative Elements - Reduced */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ffd166]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ffd166]/50 to-transparent" />
      </div>

      {/* Main Footer Content - Medium Size */}
      <div className="relative w-[100vw] px-4 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand Column - 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center">
  <div className="bg-white rounded-2xl p-2 shadow-md transition-all duration-300 group-hover:shadow-lg">
                <Image
                  src="/logo-scs.svg"
                  alt="Sri Chaitanya Crest"
                  width={60}
                  height={60}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
</div>

              <div>
                <h2 className="text-xl font-bold">Sri Chaitanya</h2>
                <p className="text-xs font-medium text-[#ffd166]">SCHOOL OF EXCELLENCE</p>
              </div>
            </div>
            
            <p className="text-sm text-white/70 leading-relaxed">
              Transforming education since 1986. Shaping future leaders through innovation, excellence, and holistic development.
            </p>
            
            <div className="flex gap-2 pt-2">
              {socialLinks.slice(0, 5).map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/10 backdrop-blur-sm transition-all ${social.color}`}
                >
                  <social.icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="h-5 w-1 bg-gradient-to-b from-[#ffd166] to-[#a41f2a] rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => goTo(link.section)}
                    className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <ChevronRight className="size-3 text-[#ffd166] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Corporate Office Location with Map - 4 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-4"
          >
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="h-5 w-1 bg-gradient-to-b from-[#ffd166] to-[#a41f2a] rounded-full" />
              Corporate Office
            </h3>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 space-y-3">
              {/* Location Header */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-gradient-to-br from-[#a41f2a]/20 to-[#c62834]/20 flex items-center justify-center border border-[#a41f2a]/30">
                  <Building2 className="size-5 text-[#ffd166]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-base">{CORPORATE_OFFICE.name}</h4>
                  <p className="text-xs text-white/60 mt-0.5">Est. 1986 • ISO 9001:2015</p>
                </div>
              </div>

              {/* Full Address */}
              <div className="flex gap-3">
                <MapPin className="size-4 text-[#ffd166] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {CORPORATE_OFFICE.address}
                  </p>
                  <p className="text-sm text-white/80">
                    {CORPORATE_OFFICE.city}, {CORPORATE_OFFICE.state} - {CORPORATE_OFFICE.pincode}
                  </p>
                  <p className="text-xs text-white/60 mt-1">{CORPORATE_OFFICE.landmark}</p>
                </div>
              </div>

              {/* Contact & Hours */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-[#ffd166]" />
                  <span className="text-xs text-white/70">{CORPORATE_OFFICE.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-[#ffd166]" />
                  <span className="text-xs text-white/70">{CORPORATE_OFFICE.email}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Clock className="size-3.5 text-[#ffd166]" />
                  <span className="text-xs text-white/70">{CORPORATE_OFFICE.hours}</span>
                </div>
              </div>

              {/* Map & Directions Button */}
              <div className="flex gap-2 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openGoogleMaps}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#a41f2a] to-[#c62834] text-white rounded-lg px-4 py-2.5 text-xs font-semibold hover:shadow-lg transition-all"
                >
                  <Navigation className="size-3.5" />
                  Get Directions
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowNearby(!showNearby)}
                  className="flex items-center justify-center gap-2 bg-white/10 text-white rounded-lg px-4 py-2.5 text-xs font-semibold hover:bg-white/20 transition-all border border-white/10"
                >
                  <Locate className="size-3.5" />
                  Nearby
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Nearby Branches & Newsletter - 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Nearby Branches */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                  <Locate className="size-4 text-[#ffd166]" />
                  Near {detectedCity}
                </h4>
                <span className="text-[10px] bg-[#ffd166]/20 text-[#ffd166] px-2 py-1 rounded-full border border-[#ffd166]/30">
                  Based on your location
                </span>
              </div>
              
              <AnimatePresence>
                {showNearby ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    {nearbyBranches.map((branch) => (
  <div key={branch.name} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
    <div>
      <p className="text-sm font-medium text-white">{branch.name}</p>
      <p className="text-xs text-white/60">{branch.area}</p>
    </div>
    <div className="text-right">
      <span className="text-xs text-[#ffd166] font-semibold">
        {branch.distance} km
      </span>
      <p className="text-[10px] text-white/50">{branch.phone}</p>
    </div>
  </div>
))}

                    <button className="w-full mt-2 text-xs text-[#ffd166] hover:text-white transition-colors flex items-center justify-center gap-1">
                      View all 25+ branches in Hyderabad
                      <ChevronRight className="size-3" />
                    </button>
                  </motion.div>
                ) : (
                  <p className="text-xs text-white/60">
                    {NEARBY_BRANCHES.length} Sri Chaitanya branches within 5km of your location
                  </p>
                )}
              </AnimatePresence>
            </div>

            {/* Compact Newsletter */}
            <form onSubmit={handleSubscribe} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="size-4 text-[#ffd166]" />
                <h4 className="font-semibold text-white text-sm">Stay Updated</h4>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#ffd166] focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-[#a41f2a] to-[#c62834] text-white rounded-lg px-4 py-2.5"
                >
                  <Send className="size-4" />
                </motion.button>
              </div>
              <AnimatePresence>
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-green-400 mt-2"
                  >
                    ✓ Thanks for subscribing!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span>© 2026 Sri Chaitanya Schools</span>
              <span className="hidden md:inline">•</span>
              <span>All rights reserved</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {["Privacy Policy", "Terms", "Sitemap", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/50 hover:text-[#ffd166] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top - Smaller */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#a41f2a] to-[#c62834] shadow-lg"
        aria-label="Back to top"
      >
        <ChevronRight className="size-4 -rotate-90 text-white" />
      </motion.button>
    </footer>
  );
}