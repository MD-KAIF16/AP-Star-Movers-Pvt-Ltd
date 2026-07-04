"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Phone, MessageCircle, Info, ChevronDown, ChevronUp, Maximize2, Map, PackageCheck, Route, Truck, ShieldCheck, Box } from "lucide-react";
import { useUIStore } from "@/lib/store/ui-store";
import { useState } from "react";

export function VehicleDetailsModal() {
  const { isVehicleDetailsModalOpen, closeVehicleDetailsModal, selectedVehicle, openBookTruckModal } = useUIStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!selectedVehicle) return null;

  const handleWhatsApp = () => {
    const text = `Hello A P Star Movers, I am interested in booking the ${selectedVehicle.name} (${selectedVehicle.capacity}). Please provide more details and quotation.`;
    window.open(`https://wa.me/917080815294?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isVehicleDetailsModalOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end md:justify-center p-0 md:p-6 lg:p-10 pointer-events-none">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl pointer-events-auto"
            onClick={closeVehicleDetailsModal}
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: "100%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full h-[95vh] md:h-full max-h-[100vh] bg-black md:bg-zinc-950 md:border md:border-white/10 md:rounded-[40px] rounded-t-[40px] overflow-hidden shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto"
          >
            {/* Mobile Drag Handle */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/20 rounded-full mt-4 md:hidden z-50" />

            {/* Close Button */}
            <button 
              onClick={closeVehicleDetailsModal}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-12 h-12 bg-black/50 hover:bg-black/80 hover:scale-110 border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all backdrop-blur-md shadow-2xl"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-32">
              
              {/* Hero Banner */}
              <div className="relative w-full h-[40vh] md:h-[60vh] shrink-0 bg-zinc-900 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 hidden md:block" />
                <img /* eslint-disable-next-line @next/next/no-img-element */   
                  src={selectedVehicle.img} 
                  alt={selectedVehicle.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                />
                
                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 p-6 md:p-12 z-20 w-full max-w-4xl">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-500/20 border border-lime-500/30 text-lime-400 font-bold text-xs uppercase tracking-widest mb-4 backdrop-blur-md">
                      {selectedVehicle.capacity}
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 tracking-tighter">
                      {selectedVehicle.name}
                    </h1>
                    <p className="text-lg md:text-2xl text-zinc-300 font-medium max-w-2xl text-balance">
                      {selectedVehicle.desc}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="p-6 md:p-12 lg:px-20 max-w-7xl mx-auto space-y-24">
                
                {/* 1. Overview & Best For */}
                <section className="grid lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-white tracking-tight">Overview</h3>
                    <p className="text-xl text-zinc-400 leading-relaxed font-medium">
                      {selectedVehicle.overview}
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-lime-500/30 transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-lime-500/10 flex items-center justify-center">
                          <PackageCheck className="w-6 h-6 text-lime-400" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Best Use Cases</h4>
                      </div>
                      <p className="text-zinc-300 leading-relaxed">{selectedVehicle.bestFor}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-zinc-950 border border-white/5 rounded-3xl p-6 text-center hover:bg-zinc-900 transition-colors group">
                      <Maximize2 className="w-8 h-8 text-zinc-500 mx-auto mb-4 group-hover:text-lime-400 transition-colors" />
                      <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Dimensions</div>
                      <div className="text-white font-bold text-sm md:text-base">{selectedVehicle.approxDimensions}</div>
                    </div>
                    <div className="bg-zinc-950 border border-white/5 rounded-3xl p-6 text-center hover:bg-zinc-900 transition-colors group">
                      <Route className="w-8 h-8 text-zinc-500 mx-auto mb-4 group-hover:text-lime-400 transition-colors" />
                      <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Ideal Routes</div>
                      <div className="text-white font-bold text-sm md:text-base">{selectedVehicle.idealRoutes}</div>
                    </div>
                    <div className="col-span-2 bg-zinc-950 border border-white/5 rounded-3xl p-6 text-center hover:bg-zinc-900 transition-colors group">
                      <Box className="w-8 h-8 text-zinc-500 mx-auto mb-4 group-hover:text-lime-400 transition-colors" />
                      <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Suitable Goods</div>
                      <div className="text-white font-bold text-sm md:text-base px-4">{selectedVehicle.suitableGoods}</div>
                    </div>
                  </div>
                </section>

                {/* 2. Specifications & Features */}
                <section className="grid lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-5 space-y-8">
                    <h3 className="text-3xl font-bold text-white tracking-tight">Specifications</h3>
                    <div className="space-y-4">
                      {selectedVehicle.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between items-center py-4 border-b border-white/10 last:border-0">
                          <span className="text-zinc-400 font-medium">{spec.label}</span>
                          <span className="text-white font-bold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-lime-500/10 border border-lime-500/20 rounded-2xl p-6 flex items-start gap-4">
                      <ShieldCheck className="w-6 h-6 text-lime-400 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-bold mb-1">Insurance & Safety</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">{selectedVehicle.insuranceCoverage}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-8">
                    <h3 className="text-3xl font-bold text-white tracking-tight">Key Advantages</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedVehicle.features.map((feature, i) => (
                        <div key={i} className="bg-zinc-950 border border-white/5 p-6 rounded-3xl hover:border-lime-500/30 transition-all flex items-start gap-4 group">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-lime-400/20 transition-colors">
                            <Zap className="w-5 h-5 text-zinc-400 group-hover:text-lime-400 transition-colors" />
                          </div>
                          <p className="text-zinc-300 font-medium text-sm leading-relaxed pt-1">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 3. Deep Dive Info Cards */}
                <section className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black border border-white/10 rounded-[32px] p-8">
                    <Map className="w-8 h-8 text-lime-400 mb-6" />
                    <h4 className="text-white font-bold text-lg mb-3">GPS Tracking</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{selectedVehicle.gpsTracking}</p>
                  </div>
                  <div className="bg-black border border-white/10 rounded-[32px] p-8">
                    <Truck className="w-8 h-8 text-lime-400 mb-6" />
                    <h4 className="text-white font-bold text-lg mb-3">Availability</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{selectedVehicle.availability}</p>
                  </div>
                  <div className="bg-black border border-white/10 rounded-[32px] p-8">
                    <Info className="w-8 h-8 text-lime-400 mb-6" />
                    <h4 className="text-white font-bold text-lg mb-3">Loading Support</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{selectedVehicle.loadingSupport}</p>
                  </div>
                </section>

                {/* 4. FAQs */}
                <section className="max-w-4xl mx-auto space-y-8">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-white tracking-tight mb-4">Frequently Asked Questions</h3>
                    <p className="text-zinc-400">Everything you need to know about the {selectedVehicle.name}.</p>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedVehicle.faqs.map((faq, i) => (
                      <div key={i} className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
                        <button 
                          onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <span className={`font-bold text-lg transition-colors ${activeFaq === i ? 'text-lime-400' : 'text-white'}`}>{faq.q}</span>
                          {activeFaq === i ? <ChevronUp className="w-5 h-5 text-lime-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />}
                        </button>
                        <AnimatePresence>
                          {activeFaq === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                              <div className="px-6 pb-6 text-zinc-400 leading-relaxed font-medium">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. Image Gallery */}
                {selectedVehicle.gallery && selectedVehicle.gallery.length > 0 && (
                  <section>
                    <h3 className="text-3xl font-bold text-white tracking-tight mb-8">Gallery</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {selectedVehicle.gallery.map((img, i) => (
                        <div key={i} className="aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/10">
                          <img /* eslint-disable-next-line @next/next/no-img-element */   src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            </div>

            {/* Sticky Action Bar */}
            <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-2xl border-t border-white/10 p-4 md:p-6 z-30">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Price/Availability info (desktop) */}
                <div className="hidden lg:block">
                  <div className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1">Status</div>
                  <div className="text-white font-bold flex items-center gap-2">
                    <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span></span>
                    Available for Booking
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
                  <a href="tel:+917080815294" className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-colors shrink-0">
                    <Phone className="w-5 h-5" /> <span className="hidden sm:block">Call Now</span>
                  </a>
                  
                  <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#25D366] font-bold transition-colors shrink-0">
                    <MessageCircle className="w-5 h-5" /> <span className="hidden sm:block">WhatsApp</span>
                  </button>
                  
                  <button onClick={() => { closeVehicleDetailsModal(); openBookTruckModal(selectedVehicle.name); }} className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition-colors shrink-0 flex-grow md:flex-grow-0">
                    Get Quote
                  </button>

                  <button onClick={() => { closeVehicleDetailsModal(); openBookTruckModal(selectedVehicle.name); }} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-lime-400 text-black font-extrabold hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,21,0.3)] transition-all shrink-0 w-full sm:w-auto">
                    Book This Vehicle
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
