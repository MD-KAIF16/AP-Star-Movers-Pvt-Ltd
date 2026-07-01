"use client";

import { Truck, Search, Plus, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockVehicles } from "@/lib/mock-data";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  AVAILABLE: "bg-green-500/10 text-green-500",
  IN_TRANSIT: "bg-primary/10 text-primary",
  MAINTENANCE: "bg-amber-500/10 text-amber-500",
  OUT_OF_SERVICE: "bg-red-500/10 text-red-500",
};

export default function FleetPage() {
  const statusCounts = {
    Available: mockVehicles.filter((v) => v.status === "AVAILABLE").length,
    "In Transit": mockVehicles.filter((v) => v.status === "IN_TRANSIT").length,
    Maintenance: mockVehicles.filter((v) => v.status === "MAINTENANCE").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Fleet Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all vehicles in your fleet.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" /> Add Vehicle
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(statusCounts).map(([status, count], index) => (
          <motion.div key={status} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground mt-1">{status}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by registration, type, make..." className="pl-10 h-11 rounded-xl bg-muted/50 border-border/50" />
      </div>

      {/* Vehicle Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockVehicles.map((vehicle, index) => (
          <motion.div key={vehicle.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-muted rounded-xl">
                    <Truck className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <Badge className={statusColors[vehicle.status]}>
                    {vehicle.status.replace(/_/g, " ")}
                  </Badge>
                </div>
                <h3 className="font-bold text-sm">{vehicle.registration_no}</h3>
                <p className="text-xs text-muted-foreground mt-1">{vehicle.make} {vehicle.model} • {vehicle.year}</p>
                <div className="mt-4 pt-3 border-t border-border/50 space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Type</span>
                    <span className="text-foreground font-medium">{vehicle.vehicle_type?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance Expiry</span>
                    <span className="text-foreground font-medium">{new Date(vehicle.insurance_expiry).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fitness Expiry</span>
                    <span className="text-foreground font-medium">{new Date(vehicle.fitness_expiry).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
