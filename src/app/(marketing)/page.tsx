"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Truck, MapPin, Phone, Anchor, ShieldCheck, 
  Clock, PackageCheck, Zap, Users, Shield, TrendingUp, ChevronDown, 
  Quote, Calendar, Building, Mail, MessageCircle, Star, Map, 
  Globe, Briefcase, Heart, CheckCircle2, Factory, Navigation, Route
} from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { FleetCarousel } from "@/components/marketing/fleet-carousel";
import { useUIStore } from "@/lib/store/ui-store";
import { fleet } from "@/lib/fleet-data";

// ---- DATA ----
const services = [
  { icon: Truck, title: "Transportation Services", desc: "Reliable, pan-India heavy and light commercial transportation with real-time tracking." },
  { icon: Anchor, title: "Logistics Services", desc: "End-to-end logistics solutions customized for your specific enterprise requirements." },
  { icon: Zap, title: "Truck Rental", desc: "Dedicated truck rentals with experienced drivers for short or long term hauling." },
  { icon: PackageCheck, title: "Container Transportation", desc: "Safe and secure containerized movement of goods across major trade routes." },
  { icon: Shield, title: "Close Body Container", desc: "High-security closed body containers for premium, weather-sensitive cargo." },
  { icon: Clock, title: "Cold Chain Logistics", desc: "Temperature-controlled transport for perishable goods, pharmaceuticals, and FMCG." },
  { icon: Briefcase, title: "Contract Logistics", desc: "Long-term contract logistics providing stability and cost-efficiency for businesses." },
  { icon: Factory, title: "Commercial Freight", desc: "Specialized B2B commercial freight handling for high-value industrial goods." },
  { icon: TrendingUp, title: "Full Truck Load (FTL)", desc: "Dedicated full truck load services ensuring faster transit times and zero transshipment." },
  { icon: MapPin, title: "Local Logistics", desc: "Efficient intracity and local logistics for seamless last-mile distribution." },
  { icon: Navigation, title: "Door to Door Delivery", desc: "Complete door-to-door pickup and delivery management for total peace of mind." },
  { icon: Route, title: "Supply Chain Management", desc: "Optimized supply chain strategies to reduce costs and improve delivery efficiency." }
];



const directors = [
  { name: "Parveen Kamal", role: "Director" },
  { name: "Zaib Kamal", role: "Director" },
  { name: "Shabista Sumbul", role: "Director" }
];

const reasons = [
  { text: "11+ Years Experience", icon: Calendar },
  { text: "Reliable Fleet", icon: Truck },
  { text: "Professional Team", icon: Users },
  { text: "51–100 Employees", icon: Briefcase },
  { text: "Fast Delivery", icon: Zap },
  { text: "24×7 Support", icon: Phone },
  { text: "Safe Transportation", icon: ShieldCheck },
  { text: "Affordable Pricing", icon: TrendingUp },
  { text: "Pan India Network", icon: Map },
  { text: "Trusted Logistics Partner", icon: Heart }
];

const stats = [
  { label: "Years Experience", value: "11+" },
  { label: "Completed Deliveries", value: "1000+" },
  { label: "Active Employees", value: "51–100" },
  { label: "Customer Rating", value: "4.5★" },
  { label: "Support Available", value: "24×7" },
  { label: "Service Network", value: "Pan India" }
];

const faqs = [
  { q: "How can I book a truck with A P Star Movers?", a: "Booking is seamless. Simply click the 'Book Truck' button, enter your pickup and drop-off locations, select the required vehicle type, and confirm. Our system instantly assigns the nearest available truck to your location." },
  { q: "Do you provide Pan-India transportation services?", a: "Yes, A P Star Movers provides comprehensive commercial logistics and transportation services across all major cities, industrial hubs, and routes across India." },
  { q: "How can I track my commercial shipment?", a: "Every booking is assigned a unique tracking ID. You can enter this ID in our tracking portal to see real-time GPS updates, estimated arrival times, and status of your cargo." },
  { q: "Are my goods insured during transit?", a: "Yes, we offer comprehensive transit insurance options for all shipments, ensuring your high-value commercial goods are completely protected against any unforeseen circumstances." }
];

// ---- REUSABLE COMPONENTS ----
const SectionHeading = ({ children, subtitle, centered = false }: { children: React.ReactNode, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 md:mb-24 relative z-10 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    {subtitle && (
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-lime-500/20 bg-lime-500/5 backdrop-blur-md mb-6">
        <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span></span>
        <span className="text-xs font-bold text-lime-400 uppercase tracking-[0.2em]">{subtitle}</span>
      </motion.div>
    )}
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
      {children}
    </motion.h2>
  </div>
);

// ---- MAIN PAGE ----
export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { openBookTruckModal } = useUIStore();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string; // Added phone input below
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const whatsappMessage = `Hello A P Star Movers,

I would like to contact you.

Name:
${name}

Phone:
${phone}

Email:
${email}

Subject:
${subject}

Message:
${message}

Please contact me.

Thank You.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/918048615828?text=${encodedMessage}`;
    
    try {
      window.open(whatsappUrl, '_blank');
    } catch {
      alert("Unable to open WhatsApp. Please call us directly at +91 8048615828.");
    }
  };

  return (
    <div className="bg-black min-h-screen overflow-hidden selection:bg-lime-500/30 selection:text-lime-200 font-manrope">
      
      {/* GLOBAL MOUSE GLOW */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 hidden lg:block"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(163,230,21,0.03), transparent 40%)`
        }}
      />

      {/* 1. CINEMATIC HERO SECTION */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Cinematic Parallax Background */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime-500/10 via-transparent to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop" 
            alt="Truck on Night Highway" 
            className="w-full h-full object-cover object-center scale-105"
          />
        </motion.div>

        <div className="container relative z-20 flex flex-col items-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl mx-auto space-y-10 flex flex-col items-center">
            
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span></span>
              <span className="text-sm font-bold text-zinc-300 uppercase tracking-widest">A P Star Movers Private Limited</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tighter">
              We Deliver <br className="hidden sm:block"/>
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-green-500">
                  Trust
                </span>
                <span className="absolute inset-0 bg-lime-500/20 blur-3xl rounded-full z-0" />
              </span><br/>
              Across India.
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed font-medium px-4">
              Established in 2014, we provide premium commercial transportation, logistics, and full truck load services with unwavering reliability and safety.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-4 px-4 sm:px-0 w-full sm:w-auto">
              <button onClick={() => openBookTruckModal()} className="group relative flex items-center justify-center h-14 sm:h-16 px-8 sm:px-10 rounded-full bg-lime-400 text-black font-extrabold text-base sm:text-lg overflow-hidden transition-all active:scale-95 sm:hover:scale-105 sm:hover:shadow-[0_0_40px_rgba(163,230,21,0.4)] w-full sm:w-auto shrink-0">
                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  Book a Truck <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button onClick={() => openBookTruckModal()} className="group relative flex items-center justify-center h-14 sm:h-16 px-8 sm:px-10 rounded-full bg-white/5 border border-white/10 text-white font-bold text-base sm:text-lg backdrop-blur-xl hover:bg-white/10 transition-colors w-full sm:w-auto shrink-0">
                Get Quote
              </button>

              <a href="tel:+918048615828" className="group relative flex items-center justify-center h-14 sm:h-16 px-8 sm:px-10 rounded-full bg-transparent text-white font-bold text-base sm:text-lg hover:text-lime-400 transition-colors w-full sm:w-auto shrink-0">
                Call Now
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Scroll Down</span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-lime-400"
              animate={{ top: ["-50%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* 2. ABOUT US (COMPANY STORY) */}
      <section id="about" className="py-24 bg-zinc-950/50 relative z-10 border-y border-white/5">
        <div className="container px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} className="space-y-8">
              <SectionHeading subtitle="Company Story">More Than Just<br/>Logistics.</SectionHeading>
              
              <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
                <p>
                  <strong className="text-white">Established in 2014</strong>, A P Star Movers Private Limited has evolved into one of India's most trusted logistics and transportation enterprises based out of Prayagraj, Uttar Pradesh.
                </p>
                <p>
                  With more than a decade of specialized experience, we pride ourselves on delivering comprehensive solutions ranging from Full Truck Load (FTL) and Cold Chain Logistics to Contract and Door-to-Door Delivery.
                </p>
                <p>
                  Our <strong className="text-lime-400">Mission</strong> is to ensure the absolute safety and timely delivery of commercial freight. Our <strong className="text-lime-400">Vision</strong> is to build a pan-India network fueled by customer satisfaction and uncompromising reliability. 
                </p>
              </div>
              
              <div className="pt-4">
                <button onClick={() => openBookTruckModal()} className="inline-flex items-center gap-2 text-lime-400 font-bold hover:text-lime-300 transition-colors group">
                  Partner with us today <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-lime-500/5 blur-[100px] pointer-events-none rounded-full" />
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }} 
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[32px] bg-black border border-white/5 hover:border-lime-500/30 transition-colors group relative z-10"
                >
                  <div className="text-3xl md:text-5xl font-black text-white mb-3 group-hover:text-lime-400 transition-colors">{stat.value}</div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider leading-relaxed">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CEO LEADERSHIP SECTION */}
      <section className="py-32 bg-black relative overflow-hidden border-b border-white/5">
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-lime-500/5 blur-[120px] -translate-y-1/2 rounded-full pointer-events-none" />
        <div className="container px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <SectionHeading subtitle="Leadership">Driven By Vision & Excellence</SectionHeading>
            
            <div className="mt-16 bg-zinc-950 border border-white/10 rounded-[40px] p-8 md:p-16 relative overflow-hidden group hover:border-lime-500/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Quote className="w-64 h-64 text-white" />
              </div>
              
              <div className="grid md:grid-cols-12 gap-12 items-center relative z-10">
                <div className="md:col-span-5 relative">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 relative shadow-2xl shadow-black group-hover:border-lime-500/30 transition-colors">
                    <img 
                      src="/images/ceo.png" 
                      alt="M Ayub - CEO of A P Star Movers" 
                      className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-lime-400 text-black p-6 rounded-2xl shadow-2xl border border-lime-300">
                    <h4 className="text-xl font-bold">M Ayub</h4>
                    <p className="text-sm font-extrabold uppercase tracking-widest mt-1 opacity-80">Chief Executive Officer</p>
                  </div>
                </div>
                
                <div className="md:col-span-7 space-y-8">
                  <Quote className="w-12 h-12 text-lime-400" />
                  <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    "Leading A P Star Movers towards innovation, reliability, and customer trust across India."
                  </h3>
                  <p className="text-xl text-zinc-400 leading-relaxed font-medium">
                    Under the visionary leadership of CEO M Ayub, A P Star Movers has established itself as a premier logistics provider. His unwavering commitment to quality and pan-India operational excellence drives the core values of our enterprise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PREMIUM SERVICES */}
      <section id="services" className="py-32 bg-black relative">
        <div className="container px-4 sm:px-6">
          <SectionHeading subtitle="Enterprise Services" centered>Comprehensive Logistics<br/>Solutions</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group relative bg-zinc-950 border border-white/5 p-8 rounded-[32px] overflow-hidden hover:border-lime-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(163,230,21,0.05)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-14 w-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:bg-lime-400 group-hover:border-lime-400 transition-all duration-500">
                    <s.icon className="h-6 w-6 text-lime-400 group-hover:text-black transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-400 transition-colors">{s.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium mb-6 flex-grow">{s.desc}</p>
                  <button onClick={() => openBookTruckModal()} className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-lime-400 transition-colors mt-auto self-start">
                    Get Quote <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section id="why-us" className="py-24 bg-zinc-950 border-y border-white/5 relative">
        <div className="container px-4 sm:px-6">
          <SectionHeading subtitle="Why Choose Us" centered>The A P Star Advantage</SectionHeading>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-16 max-w-6xl mx-auto">
            {reasons.map((reason, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-black border border-white/5 rounded-2xl p-6 text-center group hover:border-lime-500/30 hover:bg-zinc-900/50 transition-all"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-lime-400/10 transition-colors">
                  <reason.icon className="w-5 h-5 text-zinc-400 group-hover:text-lime-400 transition-colors" />
                </div>
                <h4 className="text-white font-bold text-sm leading-snug">{reason.text}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FLEET SHOWCASE */}
      <section id="fleet" className="py-24 md:py-32 bg-black relative">
        <div className="absolute right-0 top-0 w-8 md:w-32 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 w-8 md:w-32 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        <div className="container px-0 md:px-6 relative z-20">
          <div className="px-4 md:px-0">
            <SectionHeading subtitle="Our Fleet" centered>Modern Commercial Vehicles</SectionHeading>
          </div>
          
          <div className="mt-8 md:mt-16">
            <FleetCarousel vehicles={fleet} />
          </div>
        </div>
      </section>

      {/* 7. BOARD OF DIRECTORS */}
      <section className="py-24 bg-zinc-950 relative border-t border-white/5">
        <div className="container px-4 sm:px-6 relative z-10">
          <SectionHeading subtitle="Board of Directors" centered>The Pillars of Our Success</SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            {directors.map((director, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }} 
                transition={{ delay: i * 0.15 }}
                className="bg-black border border-white/5 p-8 rounded-[32px] text-center group hover:border-lime-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(163,230,21,0.15)]"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-zinc-900 border-2 border-white/10 mb-6 flex items-center justify-center group-hover:border-lime-400 transition-colors duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-2xl font-black text-white/20 group-hover:text-lime-400 transition-colors duration-500">
                    {director.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-1">{director.name}</h4>
                <p className="text-lime-400 font-bold uppercase tracking-widest text-[10px]">{director.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COMPANY DETAILS & CONTACT */}
      <section id="contact" className="py-32 bg-black relative border-t border-white/5">
        <div className="container px-4 sm:px-6">
          <SectionHeading subtitle="Corporate Details">Connect With Us</SectionHeading>
          
          <div className="grid lg:grid-cols-12 gap-12 mt-16">
            
            {/* Corporate Info Glass Card */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-5 bg-zinc-950 border border-white/10 rounded-[40px] p-10 relative overflow-hidden group hover:border-lime-500/30 transition-colors flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 blur-[80px] rounded-full pointer-events-none" />
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-8">A P Star Movers <br/><span className="text-zinc-500 text-xl">Private Limited</span></h3>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 text-lime-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Corporate Office</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed font-medium">452/5, Neem Sarai, Near Banney Miya Ka Bagh,<br/>Dhoomanganj, Prayagraj, UP - 211011</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-lime-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Phone</h4>
                      <a href="tel:+918048615828" className="text-zinc-400 text-sm font-medium hover:text-lime-400 transition-colors">+91 8048615828</a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-lime-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Email</h4>
                      <a href="mailto:zaibapstar786@gmail.com" className="text-zinc-400 text-sm font-medium hover:text-lime-400 transition-colors">zaibapstar786@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-y-6 gap-x-4 text-sm relative z-10 bg-black/30 p-6 rounded-3xl border border-white/5">
                <div>
                  <div className="text-zinc-500 mb-1 text-xs uppercase tracking-wider">Established</div>
                  <div className="text-white font-bold">2014</div>
                </div>
                <div>
                  <div className="text-zinc-500 mb-1 text-xs uppercase tracking-wider">Status</div>
                  <div className="text-lime-400 font-bold">Active Pvt Ltd</div>
                </div>
                <div className="col-span-2">
                  <div className="text-zinc-500 mb-1 text-xs uppercase tracking-wider">CIN</div>
                  <div className="text-white font-mono bg-black px-3 py-1.5 rounded-lg border border-white/5 inline-block text-xs">U60200UP2014PTC063248</div>
                </div>
                <div className="col-span-2">
                  <div className="text-zinc-500 mb-1 text-xs uppercase tracking-wider">GST</div>
                  <div className="text-white font-mono bg-black px-3 py-1.5 rounded-lg border border-white/5 inline-block text-xs">09AAMCA5859Q1ZM</div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form & Actions */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="lg:col-span-7 space-y-8">
              
              <div className="bg-zinc-950 border border-white/10 rounded-[40px] p-8 sm:p-10">
                <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input type="text" id="name" name="name" required className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-lime-400 peer transition-colors" placeholder=" " />
                      <label htmlFor="name" className="absolute left-6 top-4 text-zinc-500 transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-zinc-950 peer-focus:px-2 peer-valid:-top-3 peer-valid:left-4 peer-valid:text-xs peer-valid:bg-zinc-950 peer-valid:px-2 pointer-events-none">Your Name</label>
                    </div>
                    <div className="relative group">
                      <input type="tel" id="phone" name="phone" required className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-lime-400 peer transition-colors" placeholder=" " />
                      <label htmlFor="phone" className="absolute left-6 top-4 text-zinc-500 transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-zinc-950 peer-focus:px-2 peer-valid:-top-3 peer-valid:left-4 peer-valid:text-xs peer-valid:bg-zinc-950 peer-valid:px-2 pointer-events-none">Phone Number</label>
                    </div>
                  </div>
                  <div className="relative group">
                    <input type="email" id="email" name="email" required className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-lime-400 peer transition-colors" placeholder=" " />
                    <label htmlFor="email" className="absolute left-6 top-4 text-zinc-500 transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-zinc-950 peer-focus:px-2 peer-valid:-top-3 peer-valid:left-4 peer-valid:text-xs peer-valid:bg-zinc-950 peer-valid:px-2 pointer-events-none">Email Address</label>
                  </div>
                  <div className="relative group">
                    <input type="text" id="subject" name="subject" required className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-lime-400 peer transition-colors" placeholder=" " />
                    <label htmlFor="subject" className="absolute left-6 top-4 text-zinc-500 transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-zinc-950 peer-focus:px-2 peer-valid:-top-3 peer-valid:left-4 peer-valid:text-xs peer-valid:bg-zinc-950 peer-valid:px-2 pointer-events-none">Subject</label>
                  </div>
                  <div className="relative group">
                    <textarea id="message" name="message" required rows={4} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-lime-400 peer transition-colors resize-none" placeholder=" "></textarea>
                    <label htmlFor="message" className="absolute left-6 top-4 text-zinc-500 transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-zinc-950 peer-focus:px-2 peer-valid:-top-3 peer-valid:left-4 peer-valid:text-xs peer-valid:bg-zinc-950 peer-valid:px-2 pointer-events-none">Message</label>
                  </div>
                  <button type="submit" className="w-full py-5 rounded-full bg-lime-400 text-black font-extrabold text-lg hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,21,0.3)] transition-all">
                    Send on WhatsApp
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a href="https://wa.me/918048615828" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-[#25D366]/20 hover:border-[#25D366]/50 hover:text-[#25D366] transition-all">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
                <a href="tel:+918048615828" className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-lime-500/20 hover:border-lime-400/50 hover:text-lime-400 transition-all">
                  <Phone className="w-5 h-5" /> Call Now
                </a>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. PREMIUM CTA SECTION */}
      <section className="relative py-40 overflow-hidden border-t border-white/5 bg-zinc-950">
        <div className="absolute inset-0 bg-lime-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime-500/20 via-transparent to-transparent opacity-60" />
        
        <div className="container px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-lime-500/30 bg-black/50 backdrop-blur-xl mb-8">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span></span>
              <span className="text-sm font-bold text-lime-400 uppercase tracking-widest">Ready to scale?</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight leading-[1.05]">Let's Move Your <br/>Business <span className="text-lime-400">Forward.</span></h2>
            
            <p className="text-xl md:text-2xl text-zinc-400 mb-16 max-w-3xl mx-auto font-medium">
              Join enterprise clients who trust A P Star Movers for seamless, Pan-India logistics and commercial transportation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => openBookTruckModal()} className="relative group overflow-hidden rounded-full bg-lime-400 px-12 py-6 text-xl font-black text-black transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(163,230,21,0.5)]">
                <span className="relative z-10 flex items-center gap-3">
                  Book Your Truck Now <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
