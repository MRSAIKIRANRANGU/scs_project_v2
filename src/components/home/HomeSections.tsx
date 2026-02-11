"use client";

import { AnimatePresence, motion, useScroll, useTransform, useInView } from "framer-motion";
import { Star, ChevronRight, ArrowUpRight, Sparkles, Award, Users, BookOpen, Target, Globe, Brain, Trophy, GraduationCap, MapPin, Phone, Mail, Clock, CheckCircle, BarChart3, Heart, Shield, BookCheck, Globe2, Target as TargetIcon, Users2, Award as AwardIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";


type Particle = {
  left: string;
  top: string;
  duration: number;
  delay: number;
};

type ParticlesState = {
  hero: Particle[];
  mission: Particle[];
  cta: Particle[];
};


// Top Achievers Data
const topAchievers = [
  {
    name: "CHARAN D.J.",
    rollNo: "18104088",
    score: "98.6%",
    grade: "CBSE X Grade",
    rank: "School Topper",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=500&fit=crop&crop=face"
  },
  {
    name: "ANANYA SHARMA",
    rollNo: "18104235",
    score: "97.8%",
    grade: "CBSE X Grade",
    rank: "2nd Rank",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
  },
  {
    name: "RAJAT VERMA",
    rollNo: "18104167",
    score: "97.2%",
    grade: "CBSE XII Science",
    rank: "School Topper",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
  },
  {
    name: "PRIYA PATEL",
    rollNo: "18104389",
    score: "96.9%",
    grade: "CBSE XII Commerce",
    rank: "School Topper",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=500&fit=crop&crop=face"
  }
];

// Statistics data
const stats = [
  { label: "Campuses", value: 120, icon: Globe, suffix: "+", color: "from-blue-600 to-cyan-500" },
  { label: "Students", value: 95000, icon: Users, suffix: "+", color: "from-purple-600 to-pink-500" },
  { label: "Faculty", value: 4500, icon: GraduationCap, suffix: "+", color: "from-orange-600 to-red-500" },
  { label: "Toppers", value: 12000, icon: Trophy, suffix: "+", color: "from-green-600 to-emerald-500" },
  { label: "Years", value: 38, icon: Award, suffix: "+", color: "from-indigo-600 to-blue-500" },
  { label: "Success Rate", value: 96, icon: BarChart3, suffix: "%", color: "from-rose-600 to-pink-500" },
];

// Testimonials data
const testimonials = [
  {
    name: "CHARAN D.J.",
    role: "CBSE X - 98.6%",
    text: "Sri Chaitanya's structured curriculum and dedicated faculty helped me achieve my academic goals.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "ANANYA SHARMA",
    role: "CBSE X - 97.8%",
    text: "The regular assessments and personalized attention made all the difference in my preparation.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "RAJAT VERMA",
    role: "JEE ADVANCED - AIR 245",
    text: "The rigorous training and mock test series prepared me perfectly for competitive exams.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "PRIYA PATEL",
    role: "CA FOUNDATION - RANK 12",
    text: "Excellent guidance and study materials helped me excel in professional courses.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face"
  },
];

// Campus Locations
const campuses = [
  { city: "Hyderabad", state: "Telangana", students: "15000+", established: "1986" },
  { city: "Bengaluru", state: "Karnataka", students: "12000+", established: "1998" },
  { city: "Chennai", state: "Tamil Nadu", students: "9000+", established: "2002" },
  { city: "Pune", state: "Maharashtra", students: "8000+", established: "2005" },
  { city: "Delhi", state: "Delhi NCR", students: "7500+", established: "2008" },
  { city: "Kolkata", state: "West Bengal", students: "6000+", established: "2010" },
];

export default function HomeSections() {


  const statsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  });
  const [particles, setParticles] = useState<ParticlesState>({
    hero: [],
    mission: [],
    cta: [],
  });

  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "management">("mission");

  const whoWeData = {
    mission: {
      title: "Our Mission",
      heading: "Shaping Future Global Leaders",
      content: `To provide holistic education that prepares students for academic excellence 
    and global success through innovative teaching methodologies, disciplined training, 
    and value-based learning systems.`,
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    },
    vision: {
      title: "Our Vision",
      heading: "Creating Global Citizens",
      content: `To nurture responsible, confident, and innovative learners who are equipped 
    with 21st-century skills and strong moral foundations to lead the world with integrity.`,
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    },
    management: {
      title: "Our Leadership",
      heading: "Driven by Academic Excellence",
      content: `Our management team consists of visionary educators and academic experts 
    committed to maintaining world-class standards across all campuses while ensuring 
    continuous innovation and student success.`,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },
  };

  useEffect(() => {
    const generate = (count: number) =>
      Array.from({ length: count }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 4,
        delay: i * 0.2,
      }));

    setParticles({
      hero: generate(15),
      mission: generate(8),
      cta: generate(12),
    });
  }, []);


  const [statsActive, setStatsActive] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(() => stats.map(() => 0));
  const statsFormatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

  // Intersection observers for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    if (!statsActive) return;
    let rafId = 0;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setStatsAnimated(stats.map((stat) => Math.round(stat.value * eased)));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [statsActive]);

  return (
    <main className="bg-gradient-to-b from-white via-blue-50/30 to-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      

        
      

      {/* Who We Are Section */}

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50/30" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row gap-12 items-start">

            {/* LEFT SIDE */}
            <div className="md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                  WHO WE ARE
                </span>
              </h2>

              <div className="space-y-4">
                {["mission", "vision", "management"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all w-full text-left
                ${activeTab === tab
                        ? "bg-blue-600 text-white shadow-xl border-blue-600"
                        : "bg-white border-blue-100 hover:border-blue-300"
                      }
              `}
                  >
                    {tab === "mission" && <TargetIcon className="w-5 h-5" />}
                    {tab === "vision" && <Globe2 className="w-5 h-5" />}
                    {tab === "management" && <Users2 className="w-5 h-5" />}
                    <span className="font-semibold capitalize">{tab}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-2/3"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-100">

                <div className="grid md:grid-cols-2 gap-8 items-center">

                  {/* Text Content */}
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
                      {whoWeData[activeTab].title}
                    </h3>

                    <h4 className="text-2xl font-bold text-gray-900 mb-6">
                      {whoWeData[activeTab].heading}
                    </h4>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {whoWeData[activeTab].content}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      READ MORE
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Image */}
                  <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={whoWeData[activeTab].image}
                      alt={whoWeData[activeTab].title}
                      fill
                      className="object-cover"
                    />
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>
      


      {/* Mission Section */}
      <section ref={missionRef} className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-cyan-900/95">
        <div className="absolute inset-0">
          {particles.mission.map((p, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -50, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: p.left,
                top: p.top,
              }}

            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4">
              <Target className="w-4 h-4" />
              OUR COMMITMENT TO EXCELLENCE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Mission & Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description: "To provide holistic education that prepares students for academic excellence and global success through innovative teaching methodologies.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Globe2,
                title: "Our Vision",
                description: "Creating global citizens and future leaders who can thrive in an interconnected world and contribute meaningfully to society.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Our Values",
                description: "Integrity, Excellence, Innovation, and Empathy - the core principles that guide every aspect of our educational journey.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Heart,
                title: "Our Commitment",
                description: "Dedicated to nurturing each student's unique potential through personalized attention and comprehensive development programs.",
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative h-full bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-blue-100/80">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Achievers Section */}
      <section ref={resultsRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 text-red-600 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4" />
              OUTSTANDING ACHIEVEMENTS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                Sri Chaitanya's Top Mark Achievers
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Celebrating excellence and dedication - Our students continue to set new benchmarks in academic performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topAchievers.map((achiever, index) => (
              <motion.div
                key={achiever.rollNo}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100 hover:shadow-3xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={achiever.image}
                      alt={achiever.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-sm rounded-xl p-4">
                        <h3 className="text-xl font-bold text-white">{achiever.name}</h3>
                        <p className="text-blue-100 text-sm">Roll No: {achiever.rollNo}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                        {achiever.score}
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {achiever.rank}
                      </span>
                    </div>
                    <p className="text-gray-600">{achiever.grade}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <AwardIcon className="w-4 h-4" />
                          Merit Certificate
                        </span>
                        <span>2023-24</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            {/* <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all group">
              VIEW ALL RESULTS
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button> */}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-r from-blue-50 via-white to-cyan-50"
      >
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  className="group"
                >
                  <div className="relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-4xl font-bold text-gray-900 mb-2">
                      {statsFormatter.format(statsAnimated[index])}{item.suffix}
                    </p>
                    <p className="text-gray-600 font-medium">{item.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Campus Locations Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/30" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4" />
              OUR PRESENCE ACROSS INDIA
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                Campuses Nationwide
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campuses.map((campus, index) => (
              <motion.div
                key={`${campus.city}-${campus.state}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100 hover:shadow-2xl transition-all duration-300">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{campus.city}</h3>
                        <p className="text-gray-600">{campus.state}</p>
                      </div>
                      <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        Est. {campus.established}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Students</span>
                        <span className="font-semibold">{campus.students}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Programs</span>
                        <span className="font-semibold">CBSE • State • IIT/NEET</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Facilities</span>
                        <span className="font-semibold">Smart Classes • Labs • Sports</span>
                      </div>
                    </div>
                    <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-xl font-semibold hover:from-blue-100 hover:to-cyan-100 transition-all">
                      Explore Campus
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Life Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-cyan-900/95">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop')] bg-cover bg-center" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Student Life & Admissions
            </h2>
            <p className="text-blue-100/80 text-lg max-w-3xl mx-auto">
              Experience holistic development through academics, extracurricular activities, and personality development programs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">STUDENT LIFE</h3>
              <div className="space-y-4">
                {[
                  "Academic Excellence Programs",
                  "Sports & Athletics",
                  "Cultural Activities",
                  "Science & Innovation Clubs",
                  "Community Service",
                  "Leadership Development"
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-blue-100"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">ADMISSIONS & CAREERS</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Admissions 2024-25</h4>
                  <p className="text-blue-100/80 mb-4">
                    Admissions open for CBSE, State Boards, and Competitive Exam preparation programs
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Apply Now
                  </button>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Career Opportunities</h4>
                  <p className="text-blue-100/80">
                    Join our team of passionate educators and contribute to shaping future generations
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <Users className="w-4 h-4 mr-2" />
              VOICES OF SUCCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                What Our Community Says
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative h-full bg-white rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16" />
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{testimonial.name}</h4>
                        <p className="text-blue-600 text-sm font-medium">{testimonial.role}</p>
                        <div className="flex gap-1 mt-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900">
        <div className="absolute inset-0">
          {particles.cta.map((p, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -80, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                left: p.left,
                top: p.top,
              }}

            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="w-20 h-20 text-white/20 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Begin Your Journey to Excellence
            </h2>
            <p className="text-xl text-blue-100/90 mb-10 max-w-3xl mx-auto">
              Join thousands of successful students who have transformed their dreams into reality with Sri Chaitanya's proven educational approach
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-white text-blue-900 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Apply for Admissions 2024
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Download Brochure
              </motion.button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3 text-blue-100">
                <Phone className="w-5 h-5" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-blue-100">
                <Mail className="w-5 h-5" />
                <span>admissions@srichaitanya.net</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-blue-100">
                <MapPin className="w-5 h-5" />
                <span>120+ Campuses Nationwide</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </main>
  );
}