"use client";

import Link from "next/link";
import { Truck, MapPin, ArrowRight, Clock, Package, IndianRupee, Star, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCurrentUser, mockBookings, mockNotifications } from "@/lib/mock-data";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  CONFIRMED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  IN_TRANSIT: "bg-primary/10 text-primary border-primary/20",
  DELIVERED: "bg-green-500/10 text-green-500 border-green-500/20",
  COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function CustomerDashboard() {
  const user = mockCurrentUser;
  const myBookings = mockBookings.filter((b) => b.customer_id === user.id);
  const activeBooking = myBookings.find((b) => b.status === "IN_TRANSIT");

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome Back, <span className="text-primary">{user.full_name.split(" ")[0]}</span> 👋
        </h1>
        <p className="text-muted-foreground mt-1">Let&apos;s move your business forward.</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        <Link href="/dashboard/book-truck" className="group">
          <Card className="border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer hover:shadow-md hover:border-primary/50">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold">Book Truck</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/bookings" className="group">
          <Card className="hover:bg-muted/50 transition-all cursor-pointer hover:shadow-md">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-muted rounded-2xl text-muted-foreground group-hover:text-foreground transition-colors">
                <Package className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold">My Bookings</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/tracking" className="group">
          <Card className="hover:bg-muted/50 transition-all cursor-pointer hover:shadow-md">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-muted rounded-2xl text-muted-foreground group-hover:text-foreground transition-colors">
                <MapPin className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold">Tracking</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/invoices" className="group">
          <Card className="hover:bg-muted/50 transition-all cursor-pointer hover:shadow-md">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-muted rounded-2xl text-muted-foreground group-hover:text-foreground transition-colors">
                <IndianRupee className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold">Invoices</span>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Active Booking Card */}
      {activeBooking && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Current Booking</CardTitle>
                <Badge className={statusColors[activeBooking.status]}>
                  {activeBooking.status.replace(/_/g, " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-mono text-primary font-bold">{activeBooking.tracking_id}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{activeBooking.vehicle_type?.name}</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <div className="h-8 w-px bg-border" />
                  <div className="h-2.5 w-2.5 rounded-full border-2 border-primary" />
                </div>
                <div className="space-y-3 flex-1 min-w-0">
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="text-sm font-medium truncate">{activeBooking.pickup_city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="text-sm font-medium truncate">{activeBooking.dropoff_city}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 inline mr-1" />
                  Estimated: 13 May, 6:00 PM
                </div>
                <Link
                  href={`/dashboard/tracking/${activeBooking.id}`}
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                >
                  Track <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Bookings</h2>
          <Link href="/dashboard/bookings" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {myBookings.slice(0, 3).map((booking) => (
            <Link key={booking.id} href={`/dashboard/tracking/${booking.id}`}>
              <Card className="hover:bg-muted/30 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="hidden sm:flex p-3 bg-muted rounded-xl">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-bold">{booking.tracking_id}</span>
                      <Badge className={cn("text-[10px]", statusColors[booking.status])}>
                        {booking.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {booking.pickup_city} → {booking.dropoff_city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">₹{booking.total_amount.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-muted-foreground">{booking.vehicle_type?.name}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Need Heavy Transport CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-primary to-orange-600 text-primary-foreground border-0">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Need Heavy Transport?</h3>
              <p className="text-sm text-primary-foreground/80 mt-1">Get instant quote for your freight in just 2 minutes.</p>
            </div>
            <Link
              href="/dashboard/book-truck"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow hover:bg-white/90 transition-all whitespace-nowrap"
            >
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
