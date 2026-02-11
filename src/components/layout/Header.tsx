// "use client";

// import { Apple, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

// export default function Header() {
//   return (
//     <div className="hidden bg-[var(--brand-blue)] text-white lg:block">
//       <div className=" flex h-11 w-[100vw] items-center justify-between px-4 text-sm">
//         <div className="flex items-center gap-6">
//           <div className="flex items-center gap-2 text-white/95">
//             <MapPin className="size-4" />
//             <span>Hyderabad, Telangana</span>
//           </div>
//           <div className="flex items-center gap-2 text-white/95">
//             <Phone className="size-4" />
//             <span>+91 1800-XXX-XXXX</span>
//           </div>
//           <div className="flex items-center gap-2 text-white/95">
//             <Mail className="size-4" />
//             <span>admissions@srichaitanya.net</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-5">
//           <a href="#" className="text-white/90 hover:text-white transition" aria-label="Facebook">
//             <Facebook className="size-4" />
//           </a>
//           <a href="#" className="text-white/90 hover:text-white transition" aria-label="Instagram">
//             <Instagram className="size-4" />
//           </a>
//           <a href="#" className="text-white/90 hover:text-white transition" aria-label="YouTube">
//             <Youtube className="size-4" />
//           </a>
//           <a href="#" className="text-white/90 hover:text-white transition">Google Play</a>
//           <a href="#" className="flex items-center gap-1 text-white/90 hover:text-white transition">
//             <Apple className="size-4" />
//             <span>App Store</span>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { Apple, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-[#002856] to-[#0d3a6c] text-white">
      <div className=" flex h-12 items-center justify-between px-4 text-sm md:px-8 max-w-[100vw]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 transition-all hover:text-[#ffd166]">
            <MapPin className="size-4 text-[#ffd166]" />
            <span>Hyderabad, Telangana</span>
          </div>
          <div className="hidden md:flex items-center gap-2.5 transition-all hover:text-[#ffd166]">
            <Phone className="size-4 text-[#ffd166]" />
            <span>+91 1800-XXX-XXXX</span>
          </div>
          <div className="hidden md:flex items-center gap-2.5 transition-all hover:text-[#ffd166]">
            <Mail className="size-4 text-[#ffd166]" />
            <span>admissions@srichaitanya.net</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 border-r border-white/20 pr-4">
            <a 
              href="#" 
              className="group flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="size-4 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="#" 
              className="group flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="size-4 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="#" 
              className="group flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              aria-label="YouTube"
            >
              <Youtube className="size-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href="#" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
            >
              <div className="size-5 flex items-center justify-center bg-gradient-to-br from-[#4285F4] to-[#0F9D58] rounded">
                <span className="text-xs font-bold">G</span>
              </div>
              <span className="text-xs font-medium">Play Store</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
            >
              <Apple className="size-5" />
              <span className="text-xs font-medium">App Store</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}