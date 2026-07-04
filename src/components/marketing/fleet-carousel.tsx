"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { useUIStore } from '@/lib/store/ui-store';
import { FleetVehicle } from '@/lib/fleet-data';

interface FleetCarouselProps {
  vehicles: FleetVehicle[];
}

export function FleetCarousel({ vehicles }: FleetCarouselProps) {
  const { openBookTruckModal, openVehicleDetailsModal } = useUIStore();
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', dragFree: true },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden group">
      
      {/* Embla Viewport */}
      <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex touch-pan-y pt-8 pb-16">
          {vehicles.map((v, i) => (
            <div 
              key={i} 
              className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4 md:pl-6"
            >
              {/* Premium Card */}
              <motion.div 
                whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
                onClick={() => openVehicleDetailsModal(v)}
                className="relative cursor-pointer bg-zinc-950 border border-white/10 rounded-[32px] md:rounded-[40px] overflow-hidden h-full flex flex-col hover:border-orange-500/50 hover:shadow-[0_20px_60px_-15px_rgba(163,230,21,0.2)] transition-all duration-500"
              >
                {/* Glowing border effect on hover via pseudo-elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />
                
                {/* Image Section */}
                <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
                  <img /* eslint-disable-next-line @next/next/no-img-element */   
                    src={v.img} 
                    alt={v.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-110 opacity-80" 
                  />
                  {/* Capacity Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-400" />
                    <span className="text-white font-bold text-xs tracking-widest uppercase">{v.capacity}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 bg-zinc-950">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">{v.name}</h3>
                  <p className="text-sm md:text-base text-zinc-400 font-medium mb-8 leading-relaxed flex-grow">{v.desc}</p>
                  
                  {/* Quick Features */}
                  <ul className="space-y-2 mb-8 border-t border-white/5 pt-6">
                    <li className="flex items-center gap-3 text-xs md:text-sm text-zinc-300 font-medium">
                      <Zap className="w-4 h-4 text-orange-400" /> GPS Tracked
                    </li>
                    <li className="flex items-center gap-3 text-xs md:text-sm text-zinc-300 font-medium">
                      <ShieldCheck className="w-4 h-4 text-orange-400" /> Insured Transit
                    </li>
                  </ul>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openBookTruckModal(v.name);
                    }}
                    className="group/btn relative flex items-center justify-center w-full py-4 md:py-5 rounded-full bg-white/5 border border-white/10 text-white text-sm md:text-base font-bold overflow-hidden transition-all duration-300 hover:border-orange-400"
                  >
                    <div className="absolute inset-0 bg-orange-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                      Book {v.name}
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (Hidden on mobile for pure swipe, visible on md+) */}
      <div className="hidden md:flex items-center justify-center gap-4 mt-4 relative z-20 pointer-events-none">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="pointer-events-auto h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-orange-400 hover:text-black hover:border-orange-400 disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white disabled:hover:border-white/10 transition-all duration-300 backdrop-blur-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="pointer-events-auto h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-orange-400 hover:text-black hover:border-orange-400 disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-white disabled:hover:border-white/10 transition-all duration-300 backdrop-blur-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
    </div>
  );
}
