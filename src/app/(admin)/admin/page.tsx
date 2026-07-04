"use client";

import { TrendingUp, TrendingDown, Truck, Users, FileText, IndianRupee, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDashboardStats, mockBookings } from "@/lib/mock-data";
import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-500",
  CONFIRMED: "bg-blue-500/10 text-blue-500",
  IN_TRANSIT: "bg-primary/10 text-primary",
  DELIVERED: "bg-green-500/10 text-green-500",
  QUOTED: "bg-violet-500/10 text-violet-500",
  CANCELLED: "bg-red-500/10 text-red-500",
};

export default function AdminDashboard() {
  const stats = mockDashboardStats;

  const statCards = [
    { title: "Today's Bookings", value: stats.todaysBookings, icon: FileText, color: "text-primary", bg: "bg-primary/10", change: "+12%", up: true },
    { title: "Revenue Today", value: `₹${stats.revenueToday.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-green-500", bg: "bg-green-500/10", change: "+16%", up: true },
    { title: "Pending Orders", value: stats.pendingOrders, icon: Truck, color: "text-amber-500", bg: "bg-amber-500/10", change: "-5%", up: false },
    { title: "Completed", value: stats.completedOrders, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", change: "+8%", up: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-semibold flex items-center gap-1 ${stat.up ? "text-green-500" : "text-red-500"}`}>
                    {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  <TrendingUp className="h-3 w-3 mr-1" /> {stats.revenueGrowth}% vs last month
                </Badge>
              </div>
              <p className="text-3xl font-bold mt-2">₹{(1872430).toLocaleString("en-IN")}</p>
              <p className="text-xs text-muted-foreground">Total Revenue • This Month</p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.monthlyRevenue}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#84CC16" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#84CC16" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#112240", border: "1px solid #1E293B", borderRadius: "12px", color: "#F8FAFC" }}
                      formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Revenue"]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#84CC16" strokeWidth={2} fill="url(#revenueGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bookings by Status */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Bookings by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.bookingsByStatus} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                    <XAxis type="number" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="status" type="category" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} width={80} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#112240", border: "1px solid #1E293B", borderRadius: "12px", color: "#F8FAFC" }}
                    />
                    <Bar dataKey="count" fill="#84CC16" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Bookings</CardTitle>
              <Link href="/admin/bookings" className="text-sm text-primary hover:underline flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Tracking ID</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">Customer</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Route</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Vehicle</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                    <th className="text-right py-3 px-4 text-muted-foreground font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer">
                      <td className="py-3 px-4 font-mono font-bold text-xs">{booking.tracking_id}</td>
                      <td className="py-3 px-4 hidden sm:table-cell">{booking.customer?.full_name}</td>
                      <td className="py-3 px-4 text-xs">{booking.pickup_city} → {booking.dropoff_city}</td>
                      <td className="py-3 px-4 hidden md:table-cell text-xs text-muted-foreground">{booking.vehicle_type?.name}</td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[booking.status] || "bg-muted text-muted-foreground"}>
                          {booking.status.replace(/_/g, " ")}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">₹{booking.total_amount.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
