"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X, Truck } from "lucide-react";
import { useUIStore } from "@/lib/store/ui-store";

export function BookTruckModal() {
  const { isBookTruckModalOpen, closeBookTruckModal, prefilledVehicleName } = useUIStore();

  const handleWhatsAppBooking = () => {
    const today = new Date().toLocaleDateString();
    const vehicle = prefilledVehicleName || "[Vehicle Name]";
    
    const message = `Hello A P Star Movers,
    
I want to book a truck.
    
Vehicle : ${vehicle}
Current Page : ${window.location.href}
Pickup : [Pickup Location]
Destination : [Delivery Location]
Preferred Date : [Travel Date]

Please contact me.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917080815294?text=${encodedMessage}`;
    
    // Try to open WhatsApp, if blocked by popup blocker, fallback is standard link behavior
    window.open(whatsappUrl, '_blank');
    closeBookTruckModal();
  };

  const handleCallNow = () => {
    window.location.href = "tel:+917080815294";
    closeBookTruckModal();
  };

  return (
    <AnimatePresence>
      {isBookTruckModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={closeBookTruckModal}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-[32px] p-8 overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <button 
              onClick={closeBookTruckModal}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6">
              <Truck className="w-8 h-8 text-orange-400" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2">Book Your Truck</h3>
            <p className="text-zinc-400 text-sm font-medium mb-8">
              How would you like to connect with us? We usually respond instantly.
            </p>

            <div className="space-y-4 relative z-10">
              <button 
                onClick={handleWhatsAppBooking}
                className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div className="text-left flex-grow">
                  <span className="block text-white font-bold text-lg">WhatsApp</span>
                  <span className="block text-zinc-500 text-sm">Chat on WhatsApp</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#25D366] group-hover:bg-[#25D366] transition-colors">
                  <ArrowRight className="w-4 h-4 text-white group-hover:text-black" />
                </div>
              </button>

              <button 
                onClick={handleCallNow}
                className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-orange-400" />
                </div>
                <div className="text-left flex-grow">
                  <span className="block text-white font-bold text-lg">Call Now</span>
                  <span className="block text-zinc-500 text-sm">+91 7080815294</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-orange-400 group-hover:bg-orange-400 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white group-hover:text-black" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// A simple local ArrowRight since it was missing in imports
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
