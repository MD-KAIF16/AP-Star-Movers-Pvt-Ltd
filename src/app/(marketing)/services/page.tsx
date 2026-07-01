import { AnimatedSection, AnimatedStagger, AnimatedItem } from "@/components/marketing/animated-section";
import { Truck, Package, Factory, HeartHandshake, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Our Services | A P Star Movers",
  description: "Enterprise transport services offered by A P Star Movers.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 bg-muted/30 border-b">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">Our Logistics Services</h1>
            <p className="text-muted-foreground text-lg">Comprehensive transport solutions designed for modern enterprise requirements.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <AnimatedStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Full Truckload (FTL)", icon: Truck, desc: "Dedicated vehicles for your large shipments ensuring faster transit times and zero transshipment." },
              { title: "Part Truckload (PTL)", icon: Package, desc: "Cost-effective shared transport for smaller shipments without compromising on delivery speed." },
              { title: "Container Transport", icon: ShieldCheck, desc: "Secure 20ft and 32ft containerized transport for high-value and sensitive goods." },
              { title: "Industrial Logistics", icon: Factory, desc: "Heavy machinery and raw material transport tailored for manufacturing units." },
              { title: "Express Delivery", icon: Zap, desc: "Time-critical delivery services with dual-driver operations for non-stop transit." },
              { title: "Contract Logistics", icon: HeartHandshake, desc: "Long-term transport partnerships with dedicated fleet allocation for your business." }
            ].map((service, index) => (
              <AnimatedItem key={index} className="flex flex-col p-8 bg-card rounded-2xl border shadow-sm transition-all hover:shadow-md hover:border-primary/50 group">
                <div className="p-4 bg-primary/10 w-fit rounded-2xl text-primary mb-6 transition-transform group-hover:scale-110">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        </div>
      </section>
    </div>
  );
}
