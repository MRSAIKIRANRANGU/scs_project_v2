"use client";

import { MapPin, Search } from "lucide-react";

const options = [
  { label: "Select Board", items: ["CBSE", "ICSE", "State Board"] },
  { label: "Select State", items: ["Telangana", "Andhra Pradesh", "Karnataka"] },
  { label: "Select City", items: ["Hyderabad", "Bengaluru", "Chennai"] },
  { label: "Select Branch", items: ["Madhapur", "Kukatpally", "Kompally"] },
];

export default function HeroSearchOverlay() {
  return (
    <section className="relative z-30 -mt-24 pb-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-[28px] border border-slate-200/90 bg-white/95 p-6 shadow-[0_30px_50px_-36px_rgba(15,23,42,0.45)] backdrop-blur-sm md:p-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto] xl:items-end">
            {options.map((field) => (
              <div key={field.label}>
                <label className="mb-2 block text-sm font-medium text-slate-600">{field.label}</label>
                <select className="h-[52px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-700 outline-none transition focus:border-[var(--brand-blue)]">
                  <option>{field.label}</option>
                  {field.items.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            ))}

            <button className="flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-[var(--brand-blue-dark)] px-8 font-semibold text-white shadow-lg transition hover:bg-[var(--brand-blue)]">
              <Search className="size-5" />
              Find School
            </button>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-slate-600">Popular Locations:</span>
              {["Hyderabad", "Bengaluru", "Chennai", "Mumbai", "Delhi"].map((city) => (
                <button
                  key={city}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-[var(--brand-blue)] transition hover:bg-slate-200"
                >
                  <MapPin className="size-4" />
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
