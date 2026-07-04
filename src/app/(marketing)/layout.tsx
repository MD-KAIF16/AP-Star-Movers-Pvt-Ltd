"use client";

import Link from "next/link";
import { Truck, ArrowUp, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import { MobileCTA } from "@/components/marketing/mobile-cta";
import { BookTruckModal } from "@/components/marketing/book-truck-modal";
import { VehicleDetailsModal } from "@/components/marketing/vehicle-details-modal";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store/ui-store";
import { useActiveSection } from "@/hooks/use-active-section";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookTruckModal } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = useMemo(() => [
    { name: "Home", href: "/", id: "hero" },
    { name: "About Us", href: "/#about", id: "about" },
    { name: "Services", href: "/#services", id: "services" },
    { name: "Fleet", href: "/#fleet", id: "fleet" },
    { name: "Why Us", href: "/#why-us", id: "why-us" },
    { name: "Contact Us", href: "/#contact", id: "contact" }
  ], []);

  const activeSection = useActiveSection(navLinks.map(l => l.id));

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (pathname !== "/") {
      router.push(href);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll natively or via window.scrollTo
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen bg-black text-white selection:bg-lime-500/30 selection:text-lime-200 font-manrope antialiased tracking-tight">
        
        {/* Premium Floating Navbar */}
        <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-6'}`}>
          <div className="container px-4 sm:px-6 flex justify-center">
            <div className={`flex items-center justify-between w-full max-w-6xl transition-all duration-500 rounded-full border ${scrolled ? 'bg-zinc-950/80 border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl h-16 px-6' : 'bg-transparent border-transparent h-16 px-2'}`}>
              
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group relative z-50">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-white/10 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-lime-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Truck className="h-5 w-5 text-lime-400 relative z-10" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-white leading-none">A P STAR</span>
                  <span className="text-[9px] font-bold text-zinc-400 tracking-[0.2em] mt-1">MOVERS</span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-2 py-1.5 backdrop-blur-md">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id || (activeSection === "" && link.id === "hero");
                  return (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      onClick={(e) => handleNavClick(e, link.href, link.id)}
                      className={`relative px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 group`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="desktop-nav-pill" 
                          className="absolute inset-0 bg-white/10 rounded-full" 
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      
                      <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-lime-400 drop-shadow-[0_0_8px_rgba(163,230,21,0.5)]' : 'text-zinc-300 group-hover:text-white'}`}>
                        {link.name}
                      </span>
                      
                      {/* Premium Hover Glow Line */}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-lime-400 opacity-0 group-hover:w-3/4 group-hover:opacity-100 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(163,230,21,0.8)] rounded-full" />
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-4 relative z-50">
                <button onClick={() => openBookTruckModal()} className="group relative flex items-center justify-center h-10 px-6 rounded-full bg-lime-400 text-black font-bold text-sm overflow-hidden transition-transform hover:scale-105">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 flex items-center gap-2">Book Truck</span>
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="lg:hidden relative z-50 flex flex-col justify-center items-center h-10 w-10 gap-[5px]"
              >
                <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 translate-x-2' : ''}`} />
                <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </button>

            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              />
              
              {/* Sliding Drawer */}
              <motion.div 
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-zinc-950/95 backdrop-blur-3xl border-l border-white/10 flex flex-col pt-28 pb-12 px-8 lg:hidden shadow-2xl overflow-y-auto"
              >
                <div className="flex flex-col gap-8 flex-grow">
                  {navLinks.map((link, i) => {
                    const isActive = activeSection === link.id || (activeSection === "" && link.id === "hero");
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                      >
                        <Link 
                          href={link.href} 
                          onClick={(e) => handleNavClick(e, link.href, link.id)}
                          className={`text-2xl sm:text-3xl font-black block transition-all ${isActive ? 'text-lime-400 drop-shadow-[0_0_15px_rgba(163,230,21,0.3)] translate-x-2' : 'text-white hover:text-lime-400'}`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Phone className="w-5 h-5 text-lime-400" />
                    <span className="font-bold">+91 7080815294</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Mail className="w-5 h-5 text-lime-400" />
                    <span className="font-bold">zaibapstar786@gmail.com</span>
                  </div>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openBookTruckModal();
                    }}
                    className="mt-4 flex items-center justify-center w-full py-5 rounded-full bg-lime-400 text-black font-extrabold text-lg transition-transform active:scale-95"
                  >
                    Book a Truck Now
                  </button>
                </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1">{children}</main>

        {/* Global Modals */}
        <BookTruckModal />
        <VehicleDetailsModal />

        {/* Floating Mobile CTA */}
        <MobileCTA />

        {/* Premium Footer */}
        <footer className="bg-zinc-950 pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
          {/* Subtle Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 px-6">
            
            <div className="lg:col-span-4 space-y-8">
              <Link href="/" className="flex items-center gap-3 group inline-flex">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-white/10 overflow-hidden">
                  <Truck className="h-6 w-6 text-lime-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-white leading-none">A P STAR</span>
                  <span className="text-[10px] font-bold text-zinc-400 tracking-[0.2em] mt-1">MOVERS</span>
                </div>
              </Link>
              <p className="text-sm text-zinc-400 mt-2 max-w-sm">
                Building a nationwide logistics network that empowers businesses to move their cargo anywhere in India with zero hassle. We don&apos;t just move goods, we deliver promises.
              </p>
              <div className="space-y-3 pt-4">
                <p className="text-sm text-zinc-400 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center"><Phone className="h-4 w-4 text-lime-400" /></span>
                  +91 7080815294
                </p>
                <p className="text-sm text-zinc-400 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center"><Mail className="h-4 w-4 text-lime-400" /></span>
                  zaibapstar786@gmail.com
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-4 text-sm font-medium text-zinc-400">
                <li><Link href="/#about" onClick={(e) => handleNavClick(e, "/#about", "about")} className="hover:text-lime-400 transition-colors inline-flex items-center gap-2 group cursor-pointer"><ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> About Us</Link></li>
                <li><Link href="/#services" onClick={(e) => handleNavClick(e, "/#services", "services")} className="hover:text-lime-400 transition-colors inline-flex items-center gap-2 group cursor-pointer"><ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Services</Link></li>
                <li><Link href="/#fleet" onClick={(e) => handleNavClick(e, "/#fleet", "fleet")} className="hover:text-lime-400 transition-colors inline-flex items-center gap-2 group cursor-pointer"><ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Fleet</Link></li>
                <li><Link href="/#why-us" onClick={(e) => handleNavClick(e, "/#why-us", "why-us")} className="hover:text-lime-400 transition-colors inline-flex items-center gap-2 group cursor-pointer"><ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Why Us</Link></li>
                <li><button onClick={() => openBookTruckModal()} className="hover:text-lime-400 transition-colors inline-flex items-center gap-2 group cursor-pointer"><ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /> Book Truck</button></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Top Services</h4>
              <ul className="space-y-4 text-sm font-medium text-zinc-400">
                <li><Link href="/#services" className="hover:text-lime-400 transition-colors">Transportation Services</Link></li>
                <li><Link href="/#services" className="hover:text-lime-400 transition-colors">Logistics Services</Link></li>
                <li><Link href="/#services" className="hover:text-lime-400 transition-colors">Full Truck Load (FTL)</Link></li>
                <li><Link href="/#services" className="hover:text-lime-400 transition-colors">Cold Chain Logistics</Link></li>
                <li><Link href="/#services" className="hover:text-lime-400 transition-colors">Supply Chain Management</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Corporate Info</h4>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-colors">
                <MapPin className="absolute -right-4 -bottom-4 h-24 w-24 text-white/5 group-hover:scale-110 transition-transform duration-500" />
                <address className="not-italic text-sm text-zinc-300 leading-relaxed relative z-10">
                  <strong className="text-white block mb-2">A P Star Movers Pvt Ltd</strong>
                  452/5, Neem Sarai,<br/>
                  Near Banney Miya Ka Bagh,<br/>
                  Dhoomanganj, Prayagraj,<br/>
                  Uttar Pradesh - 211011<br/>
                  <span className="block mt-4 text-xs text-lime-400 font-bold">CIN: U60200UP2014PTC063248</span>
                  <span className="block mt-1 text-xs text-lime-400 font-bold">GST: 09AAMCA5859Q1ZM</span>
                  <div className="flex gap-4 mt-3 pt-3 border-t border-white/10">
                    <div>
                      <span className="block text-[10px] text-zinc-500 uppercase tracking-widest">Auth Capital</span>
                      <span className="text-xs text-white font-bold">₹10,00,000</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-500 uppercase tracking-widest">Paid Capital</span>
                      <span className="text-xs text-white font-bold">₹6,00,000</span>
                    </div>
                  </div>
                </address>
              </div>
            </div>

          </div>
          
          <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
            <p className="text-sm font-medium text-zinc-500">
              © {new Date().getFullYear()} A P Star Movers Private Limited. All Rights Reserved.
            </p>
            <button onClick={scrollToTop} className="group flex items-center gap-3 text-sm font-bold text-zinc-400 hover:text-white transition-colors">
              Back to top 
              <span className="h-10 w-10 rounded-full bg-white/5 group-hover:bg-lime-400 group-hover:text-black flex items-center justify-center transition-colors">
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
