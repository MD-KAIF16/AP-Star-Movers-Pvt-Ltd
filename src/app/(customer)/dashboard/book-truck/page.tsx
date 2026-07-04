"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Truck, Package, User, CheckCircle2, Calendar, Clock, Weight, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { mockVehicleTypes } from "@/lib/mock-data";
import type { BookingWizardState } from "@/types";

const steps = [
  { id: 1, title: "Route", icon: MapPin },
  { id: 2, title: "Vehicle", icon: Truck },
  { id: 3, title: "Cargo", icon: Package },
  { id: 4, title: "Details", icon: User },
  { id: 5, title: "Confirm", icon: CheckCircle2 },
];

const initialState: BookingWizardState = {
  pickup_address: "", pickup_city: "", pickup_state: "",
  dropoff_address: "", dropoff_city: "", dropoff_state: "",
  scheduled_date: "", scheduled_time: "",
  vehicle_type_id: "",
  material_type: "", weight_kg: 0, packages_count: 1,
  is_fragile: false, is_hazardous: false,
  requires_loading: false, requires_unloading: false,
  insurance_required: false, cargo_notes: "",
  contact_name: "", contact_phone: "", contact_email: "",
  company_name: "", gst_number: "", special_instructions: "",
};

export default function BookTruckPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingWizardState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const update = (field: keyof BookingWizardState, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 2000);
  };

  const selectedVehicle = mockVehicleTypes.find((v) => v.id === form.vehicle_type_id);
  const estimatedDistance = 620;
  const baseAmount = selectedVehicle ? Math.round(estimatedDistance * selectedVehicle.base_rate_per_km) : 0;
  const gstAmount = Math.round(baseAmount * 0.18);
  const totalAmount = baseAmount + gstAmount;

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
          <div className="p-6 bg-green-500/10 rounded-full">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-3xl font-bold">Booking Confirmed! 🎉</h1>
          <p className="text-muted-foreground mt-2">Your tracking ID is <span className="font-mono text-primary font-bold">BKG-2024-0160</span></p>
          <p className="text-sm text-muted-foreground mt-1">We will assign a vehicle and driver shortly.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex gap-3 mt-4">
          <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">Dashboard</Link>
          <Link href="/dashboard/tracking/bk-001" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">Track Shipment</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => window.history.back()} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Book New Truck</h1>
          <p className="text-xs text-muted-foreground">Step {step} of 5</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1 mb-8">
        {steps.map((s) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold transition-all ${step >= s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
            </div>
            {s.id < 5 && (
              <div className={`flex-1 h-1 mx-1 rounded-full transition-all ${step > s.id ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Step 1: Route */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />Pickup Location</Label>
                <Input placeholder="Prayagraj, Uttar Pradesh" value={form.pickup_city} onChange={(e) => update("pickup_city", e.target.value)} className="h-12 rounded-xl bg-muted/50 border-border/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2"><MapPin className="h-4 w-4 text-green-500" />Drop-off Location</Label>
                <Input placeholder="Lucknow, Uttar Pradesh" value={form.dropoff_city} onChange={(e) => update("dropoff_city", e.target.value)} className="h-12 rounded-xl bg-muted/50 border-border/50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2"><Calendar className="h-4 w-4" />Pickup Date</Label>
                  <Input type="date" value={form.scheduled_date} onChange={(e) => update("scheduled_date", e.target.value)} className="h-12 rounded-xl bg-muted/50 border-border/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2"><Clock className="h-4 w-4" />Pickup Time</Label>
                  <Input type="time" value={form.scheduled_time} onChange={(e) => update("scheduled_time", e.target.value)} className="h-12 rounded-xl bg-muted/50 border-border/50" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Vehicle Selection */}
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">Select a vehicle type for your shipment.</p>
              {mockVehicleTypes.filter((v) => v.is_active).map((vt) => (
                <Card
                  key={vt.id}
                  onClick={() => update("vehicle_type_id", vt.id)}
                  className={`cursor-pointer transition-all hover:shadow-md ${form.vehicle_type_id === vt.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-muted-foreground/30"}`}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${form.vehicle_type_id === vt.id ? "bg-primary/10" : "bg-muted"}`}>
                      <Truck className={`h-6 w-6 ${form.vehicle_type_id === vt.id ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{vt.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{vt.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">₹{vt.base_rate_per_km}/km</p>
                      <p className="text-xs text-muted-foreground">{(vt.capacity_weight_kg / 1000).toFixed(0)} Ton</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 3: Cargo */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Material Type</Label>
                <Input placeholder="e.g., Electronics, Furniture, Steel" value={form.material_type} onChange={(e) => update("material_type", e.target.value)} className="h-12 rounded-xl bg-muted/50 border-border/50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2"><Weight className="h-4 w-4" />Weight (kg)</Label>
                  <Input type="number" placeholder="5000" value={form.weight_kg || ""} onChange={(e) => update("weight_kg", Number(e.target.value))} className="h-12 rounded-xl bg-muted/50 border-border/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Packages</Label>
                  <Input type="number" placeholder="1" value={form.packages_count || ""} onChange={(e) => update("packages_count", Number(e.target.value))} className="h-12 rounded-xl bg-muted/50 border-border/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "is_fragile" as const, label: "Fragile", icon: "🔻" },
                  { key: "is_hazardous" as const, label: "Hazardous", icon: "⚠️" },
                  { key: "requires_loading" as const, label: "Loading Help", icon: "📦" },
                  { key: "requires_unloading" as const, label: "Unloading Help", icon: "📤" },
                  { key: "insurance_required" as const, label: "Insurance", icon: "🛡️" },
                ].map((opt) => (
                  <button key={opt.key} type="button" onClick={() => update(opt.key, !form[opt.key])}
                    className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${form[opt.key] ? "border-primary bg-primary/5 text-primary" : "bg-muted/30 hover:bg-muted/50 text-muted-foreground"}`}
                  >
                    <span className="mr-2">{opt.icon}</span> {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Contact Details */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Full Name</Label>
                <Input placeholder="Mohammad Kaif" value={form.contact_name} onChange={(e) => update("contact_name", e.target.value)} className="h-12 rounded-xl bg-muted/50 border-border/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Phone Number</Label>
                <Input type="tel" placeholder="+91 7080815294" value={form.contact_phone} onChange={(e) => update("contact_phone", e.target.value)} className="h-12 rounded-xl bg-muted/50 border-border/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input type="email" placeholder="kaif@company.com" value={form.contact_email} onChange={(e) => update("contact_email", e.target.value)} className="h-12 rounded-xl bg-muted/50 border-border/50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Company Name</Label>
                  <Input placeholder="Star Logistics" value={form.company_name} onChange={(e) => update("company_name", e.target.value)} className="h-12 rounded-xl bg-muted/50 border-border/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">GST Number</Label>
                  <Input placeholder="09AAACR5055K1Z5" value={form.gst_number} onChange={(e) => update("gst_number", e.target.value)} className="h-12 rounded-xl bg-muted/50 border-border/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Special Instructions</Label>
                <textarea placeholder="e.g., Call before pickup, fragile items on top..." value={form.special_instructions} onChange={(e) => update("special_instructions", e.target.value)} className="flex min-h-[80px] w-full rounded-xl border border-border/50 bg-muted/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="space-y-4">
              <Card className="border-primary/20">
                <CardContent className="p-5 space-y-4">
                  <h3 className="font-bold text-lg">Booking Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span className="font-medium">{form.pickup_city || "Prayagraj"} → {form.dropoff_city || "Lucknow"}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Vehicle</span><span className="font-medium">{selectedVehicle?.name || "—"}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Material</span><span className="font-medium">{form.material_type || "—"}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Weight</span><span className="font-medium">{form.weight_kg || 0} kg</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{form.scheduled_date || "—"}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Distance (est.)</span><span className="font-medium">{estimatedDistance} km</span></div>
                  </div>
                  <div className="border-t pt-3 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Base Amount</span><span>₹{baseAmount.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>₹{gstAmount.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span className="text-primary">₹{totalAmount.toLocaleString("en-IN")}</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button onClick={back} className="flex-1 h-12 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
            Back
          </button>
        )}
        {step < 5 ? (
          <button onClick={next} className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Confirming...</> : <>Confirm Booking <CheckCircle2 className="h-4 w-4" /></>}
          </button>
        )}
      </div>
    </div>
  );
}
