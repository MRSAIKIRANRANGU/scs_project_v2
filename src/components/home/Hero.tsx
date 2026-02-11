"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    type: "video",
    src: "/videos/hero.mp4",
    title: "Unlocking Student Potential",
    subtitle: "Empowering the next generation with world-class education",
  },
  {
    type: "video",
    src: "/videos/hero_1.mp4",
    title: "Excellence in Every Step",
    subtitle: "Building foundations for lifelong success",
  },
  {
    type: "image",
    src: "https://srichaitanyaapp.s3.ap-south-1.amazonaws.com/prod/assets/uploads/banner-home-corporate-9.jpg",
    title: "Innovative Learning Environments",
    subtitle: "State-of-the-art campuses designed for optimal learning",
  },
  {
    type: "image",
    src: "https://srichaitanyaapp.s3.ap-south-1.amazonaws.com/prod/assets/uploads/banner-home-corporate-8.jpg",
    title: "Holistic Development",
    subtitle: "Nurturing minds, bodies, and spirits",
  },
  {
    type: "image",
    src: "https://content.jdmagicbox.com/v2/comp/sircilla/w8/9999p8723.8723.231006121440.l6w8/catalogue/sri-chaitanya-school-rajanna-sircilla-sircilla-schools-2cBGn5RQE0.jpg",
    title: "Vibrant Campus Life",
    subtitle: "Where learning meets adventure",
  },
  {
    type: "image",
    src: "https://www.srichaitanyaschool.co.in/public/branch_img/rajasthan/Ajmer-Road-Jaipur.jpg",
    title: "Global Standards, Local Roots",
    subtitle: "International curriculum with Indian values",
  },
  {
    type: "image",
    src: "https://www.topbengaluru.com/wp-content/uploads/2024/04/IMG_20190216_110107.jpg",
    title: "Community Engagement",
    subtitle: "Fostering social responsibility from young age",
  },
  {
    type: "image",
    src: "https://content.jdmagicbox.com/comp/nalgonda/s8/9999p8682.8682.171014122213.z8s8/catalogue/sri-chaitanya-school-of-excellence-nalgonda-schools-msj7tx8ji1.jpg",
    title: "Academic Excellence",
    subtitle: "Proven track record of outstanding results",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="relative">
      {/* Hero Slider */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {slides[currentSlide].type === "video" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={slides[currentSlide].src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={slides[currentSlide].src}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a2a59]/55 via-[#3652a1]/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute z-10 flex h-full items-center inset-0">
          <div className="mx-auto max-w-7xl px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl font-serif text-white md:text-6xl">
                  {slides[currentSlide].title}
                </h1>
                <p className="mt-4 text-xl text-white/90 md:text-2xl">
                  {slides[currentSlide].subtitle}
                </p>
                <button className="mt-8 rounded-full bg-[var(--brand-red)] px-8 py-3 text-white font-semibold shadow-lg hover:bg-[var(--brand-red-light)] transition">
                  Learn More
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20"
        >
          <ArrowLeft className="size-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20"
        >
          <ArrowRight className="size-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentSlide ? 1 : -1);
                setCurrentSlide(i);
              }}
              className={`h-2 w-2 rounded-full transition ${
                i === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Below Slider Section */}
      {/* <div className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-4xl font-serif text-[var(--brand-blue)]">
            Featured Highlights
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://srichaitanyaapp.s3.ap-south-1.amazonaws.com/prod/assets/uploads/banner-home-corporate-9.jpg"
                alt="Corporate Banner 9"
                width={800}
                height={400}
                className="h-64 w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                Innovation in Education
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://srichaitanyaapp.s3.ap-south-1.amazonaws.com/prod/assets/uploads/banner-home-corporate-8.jpg"
                alt="Corporate Banner 8"
                width={800}
                height={400}
                className="h-64 w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                Excellence Recognized
              </p>
            </div>
            <a
              href="https://srichaitanya.net/blog/sushma-boppana-featured-in-forbes-india/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl shadow-xl block"
            >
              <Image
                src="https://srichaitanyaapp.s3.ap-south-1.amazonaws.com/prod/assets/uploads/banner-home-corporate-8.jpg" // Using the duplicate as placeholder, replace if needed
                alt="Sushma Boppana Featured in Forbes India"
                width={800}
                height={400}
                className="h-64 w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                Sushma Boppana Featured in Forbes India
              </p>
            </a>
          </div>
        </div>
      </div> */}
    </section>
  );
}
