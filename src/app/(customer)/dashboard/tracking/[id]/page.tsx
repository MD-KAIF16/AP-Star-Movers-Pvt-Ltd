"use client";

import { ArrowLeft, Truck, MapPin, Phone, CheckCircle2, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockBookings, mockTrackingEvents, mockDrivers } from "@/lib/mock-data";
import { motion } from "framer-motion";
import Link from "next/link";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  CONFIRMED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  VEHICLE_ASSIGNED: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  DISPATCHED: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  PICKUP_STARTED: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  GOODS_LOADED: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  IN_TRANSIT: "bg-primary/10 text-primary border-primary/20",
  REACHED_DESTINATION: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  DELIVERED: "bg-green-500/10 text-green-500 border-green-500/20",
  COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
};

export default function TrackingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Use mock data for the first booking
  const booking = mockBookings[0];
  const events = mockTrackingEvents;
  const driver = mockDrivers[0];

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-0 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Tracking Details</h1>
          <p className="text-xs text-muted-foreground">{booking.tracking_id}</p>
        </div>
        <Badge className={`ml-auto ${statusColors[booking.status]}`}>
          {booking.status.replace(/_/g, " ")}
        </Badge>
      </div>

      {/* Route Summary */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <span className="font-mono font-bold text-foreground">{booking.tracking_id}</span>
              <span>•</span>
              <span>{booking.vehicle_type?.name}</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1 pt-1">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <div className="h-10 w-px bg-border" />
                <div className="h-3 w-3 rounded-full border-2 border-green-500 bg-green-500/20" />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-xs text-muted-foreground">Pickup</p>
                  <p className="text-sm font-medium">{booking.pickup_address}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Destination</p>
                  <p className="text-sm font-medium">{booking.dropoff_address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Driver Details */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Driver</p>
              <p className="font-semibold text-sm">{driver.name}</p>
              <p className="text-xs text-muted-foreground">{driver.phone}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                ⭐ {driver.rating}
              </div>
              <p className="text-xs text-muted-foreground">{driver.total_trips} trips</p>
            </div>
            <a href={`tel:${driver.phone}`} className="p-3 bg-green-500/10 rounded-xl text-green-500 hover:bg-green-500/20 transition-colors">
              <Phone className="h-5 w-5" />
            </a>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tracking Timeline */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <h2 className="text-lg font-bold mb-4">Shipment Timeline</h2>
        <div className="space-y-0">
          {events.map((event, index) => {
            const isLast = index === events.length - 1;
            const isCompleted = index < events.length - 1;
            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`h-4 w-4 rounded-full flex-shrink-0 ${isLast ? "bg-primary ring-4 ring-primary/20" : isCompleted ? "bg-green-500" : "bg-muted"}`}>
                    {isCompleted && <CheckCircle2 className="h-4 w-4 text-green-50" />}
                  </div>
                  {index < events.length - 1 && (
                    <div className={`w-px flex-1 min-h-[48px] ${isCompleted ? "bg-green-500/50" : "bg-border"}`} />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-semibold text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(event.timestamp).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                    {event.location_description && (
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location_description}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Payment Summary */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-bold text-sm mb-3">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Amount</span><span className="font-semibold">₹{booking.total_amount.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Advance Paid</span><span className="text-green-500 font-semibold">- ₹{booking.advance_amount.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between border-t pt-2 font-bold"><span>Remaining</span><span className="text-primary">₹{(booking.total_amount - booking.advance_amount).toLocaleString("en-IN")}</span></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
