"use client";

import { Search, Filter, Eye, MoreHorizontal, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockBookings } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useState } from "react";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-500",
  CONFIRMED: "bg-blue-500/10 text-blue-500",
  IN_TRANSIT: "bg-primary/10 text-primary",
  DELIVERED: "bg-green-500/10 text-green-500",
  QUOTED: "bg-violet-500/10 text-violet-500",
  CANCELLED: "bg-red-500/10 text-red-500",
  VEHICLE_ASSIGNED: "bg-cyan-500/10 text-cyan-500",
};

const filters = ["All", "Pending", "Confirmed", "In Transit", "Delivered", "Cancelled"];

export default function AdminBookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredBookings = mockBookings.filter((b) => {
    if (activeFilter !== "All" && b.status.replace(/_/g, " ").toLowerCase() !== activeFilter.toLowerCase()) return false;
    if (search && !b.tracking_id.toLowerCase().includes(search.toLowerCase()) && !b.customer?.full_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bookings Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage all bookings across the platform.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by ID, customer, city..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11 rounded-xl bg-muted/50 border-border/50" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${activeFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Tracking ID</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Route</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden lg:table-cell">Vehicle</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden lg:table-cell">Driver</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Amount</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <motion.tr key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-xs text-primary">{booking.tracking_id}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-xs">{booking.customer?.full_name}</p>
                      <p className="text-[10px] text-muted-foreground">{booking.contact_phone}</p>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-xs">{booking.pickup_city} → {booking.dropoff_city}</td>
                    <td className="py-3 px-4 hidden lg:table-cell text-xs text-muted-foreground">{booking.vehicle_type?.name}</td>
                    <td className="py-3 px-4 hidden lg:table-cell text-xs">{booking.assigned_driver?.name || <span className="text-muted-foreground">Unassigned</span>}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[booking.status] || "bg-muted text-muted-foreground"}>
                        {booking.status.replace(/_/g, " ")}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-xs">₹{booking.total_amount.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
