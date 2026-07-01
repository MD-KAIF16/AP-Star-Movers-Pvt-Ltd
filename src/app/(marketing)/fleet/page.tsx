import { AnimatedSection, AnimatedStagger, AnimatedItem } from "@/components/marketing/animated-section";
import { Truck } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Our Fleet | A P Star Movers",
  description: "Explore the extensive fleet of transport vehicles available at A P Star Movers.",
};

const fleetData = [
  { name: "Mini Truck / Tata Ace", capacity: "1 - 2 Ton", length: "7 - 8 ft", use: "Local & Inter-city small goods", imagePlaceholder: "bg-blue-950" },
  { name: "Pickup / Bolero", capacity: "2 - 3 Ton", length: "8 - 9 ft", use: "Fast delivery of FMCG goods", imagePlaceholder: "bg-blue-900" },
  { name: "14 Feet Truck", capacity: "3 - 5 Ton", length: "14 ft", use: "Mid-sized industrial cargo", imagePlaceholder: "bg-indigo-950" },
  { name: "17 Feet Truck", capacity: "5 - 7 Ton", length: "17 ft", use: "Voluminous goods & machinery", imagePlaceholder: "bg-indigo-900" },
  { name: "20 Feet Container", capacity: "7 - 10 Ton", length: "20 ft", use: "Secure electronics & apparel", imagePlaceholder: "bg-violet-950" },
  { name: "32 Feet Container", capacity: "15 - 22 Ton", length: "32 ft", use: "Large industrial & retail shipments", imagePlaceholder: "bg-violet-900" },
];

export default function FleetPage() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 bg-muted/30 border-b">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">Our Vehicle Fleet</h1>
            <p className="text-muted-foreground text-lg">A diverse and well-maintained fleet to handle cargo of any size.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <AnimatedStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {fleetData.map((vehicle, index) => (
              <AnimatedItem key={index} className="flex flex-col bg-card rounded-2xl border shadow-sm overflow-hidden group">
                <div className={`h-48 w-full ${vehicle.imagePlaceholder} flex items-center justify-center relative`}>
                   {/* In a real scenario, an actual truck image would be placed here using next/image */}
                   <Truck className="h-20 w-20 text-white/20 absolute" />
                   <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                      {vehicle.capacity}
                   </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{vehicle.name}</h3>
                  <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span>Max Payload</span>
                      <span className="font-semibold text-foreground">{vehicle.capacity}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span>Load Body Length</span>
                      <span className="font-semibold text-foreground">{vehicle.length}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span>Best Suited For</span>
                      <span className="font-semibold text-foreground text-right w-1/2">{vehicle.use}</span>
                    </div>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        </div>
      </section>
    </div>
  );
}
