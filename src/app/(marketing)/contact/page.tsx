"use client";

import { AnimatedSection, AnimatedStagger, AnimatedItem } from "@/components/marketing/animated-section";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 bg-muted/30 border-b">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">Contact Us</h1>
            <p className="text-muted-foreground text-lg">We are here to answer any questions about our logistics services.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Contact Info */}
            <AnimatedStagger className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Our support team is available 24/7 to ensure your cargo moves without interruption.
                </p>
              </div>
              
              <div className="grid gap-6">
                <AnimatedItem className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-muted-foreground">+91 1800-123-4567</p>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p className="text-muted-foreground">support@apstarmovers.com</p>
                  </div>
                </AnimatedItem>
                
                <AnimatedItem className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Corporate Office</p>
                    <p className="text-muted-foreground">Civil Lines, Prayagraj, UP 211001, India</p>
                  </div>
                </AnimatedItem>
              </div>
            </AnimatedStagger>

            {/* Contact Form */}
            <AnimatedSection className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Send us a Message
              </h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea 
                    id="message" 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button type="submit" className="w-full inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90">
                  Send Message
                </button>
              </form>
            </AnimatedSection>
            
          </div>
        </div>
      </section>
    </div>
  );
}
