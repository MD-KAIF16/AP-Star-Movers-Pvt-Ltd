"use client";

import Link from "next/link";
import { Truck, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockBookings, mockCurrentUser } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useState } from "react";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  CONFIRMED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  IN_TRANSIT: "bg-primary/10 text-primary border-primary/20",
  DELIVERED: "bg-green-500/10 text-green-500 border-green-500/20",
  COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
  QUOTED: "bg-violet-500/10 text-violet-500 border-violet-500/20",
};

const statusFilters = ["All", "Pending", "In Transit", "Delivered", "Cancelled"];

export default function BookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const myBookings = mockBookings.filter((b) => b.customer_id === mockCurrentUser.id);

  const filteredBookings = myBookings.filter((b) => {
    if (activeFilter !== "All" && b.status.replace(/_/g, " ").toLowerCase() !== activeFilter.toLowerCase()) return false;
    if (search && !b.tracking_id.toLowerCase().includes(search.toLowerCase()) && !b.pickup_city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-sm text-muted-foreground mt-1">Track and manage all your shipments.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by tracking ID or city..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-11 pl-10 rounded-xl bg-muted/50 border-border/50" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {statusFilters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${activeFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-20">
            <Truck className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">No bookings found</h3>
            <p className="text-sm text-muted-foreground mt-1">Try changing your filters or search query.</p>
          </div>
        ) : (
          filteredBookings.map((booking, index) => (
            <motion.div key={booking.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Link href={`/dashboard/tracking/${booking.id}`}>
                <Card className="hover:bg-muted/30 transition-all cursor-pointer hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="font-mono text-sm font-bold">{booking.tracking_id}</span>
                        <Badge className={`ml-2 text-[10px] ${statusColors[booking.status] || "bg-muted text-muted-foreground"}`}>
                          {booking.status.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      <span className="text-sm font-bold">₹{booking.total_amount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{booking.pickup_city}</span>
                      <span>→</span>
                      <span>{booking.dropoff_city}</span>
                      <span className="ml-auto">{booking.vehicle_type?.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(booking.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
