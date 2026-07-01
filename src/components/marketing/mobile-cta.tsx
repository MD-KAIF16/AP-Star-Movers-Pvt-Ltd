"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUIStore } from "@/lib/store/ui-store";

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { openBookTruckModal } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show when scrolling up or at the very top, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-4 right-4 z-50 md:hidden pointer-events-auto"
        >
          <div className="flex items-center gap-2 p-2 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl shadow-black/50">
            <button 
              onClick={() => openBookTruckModal()}
              className="flex-1 flex items-center justify-center gap-2 h-14 bg-lime-400 text-black rounded-[24px] font-bold text-sm"
            >
              Book Truck <ArrowRight className="w-4 h-4" />
            </button>
            
            <a 
              href="https://wa.me/918048615828"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-14 w-14 shrink-0 bg-white/10 rounded-[24px] border border-white/5 text-white"
            >
              <MessageCircle className="w-5 h-5 text-lime-400" />
            </a>
            
            <a 
              href="tel:+918048615828"
              className="flex items-center justify-center h-14 w-14 shrink-0 bg-white/10 rounded-[24px] border border-white/5 text-white"
            >
              <Phone className="w-5 h-5 text-lime-400" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
