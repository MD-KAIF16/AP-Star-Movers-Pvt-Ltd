"use client";

import { User, Search, Plus, Phone, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockDrivers } from "@/lib/mock-data";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  AVAILABLE: "bg-green-500/10 text-green-500",
  ON_TRIP: "bg-primary/10 text-primary",
  OFF_DUTY: "bg-muted text-muted-foreground",
  INACTIVE: "bg-red-500/10 text-red-500",
};

export default function DriversPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Driver Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and monitor all drivers.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" /> Add Driver
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name, phone, license..." className="pl-10 h-11 rounded-xl bg-muted/50 border-border/50" />
      </div>

      {/* Driver Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockDrivers.map((driver, index) => (
          <motion.div key={driver.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{driver.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {driver.phone}
                      </p>
                    </div>
                  </div>
                  <Badge className={statusColors[driver.status]}>
                    {driver.status.replace(/_/g, " ")}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/50 text-xs">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span className="font-semibold">{driver.rating}</span>
                  </div>
                  <div className="text-muted-foreground">{driver.total_trips} trips</div>
                  <div className="ml-auto">
                    {driver.is_verified && <Badge className="bg-green-500/10 text-green-500 text-[10px]">Verified</Badge>}
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  <span>License: {driver.license_no}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
