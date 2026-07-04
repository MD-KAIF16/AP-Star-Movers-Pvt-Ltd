"use client";

import { Search, MoreHorizontal, UserCircle, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockSupportTickets, mockCustomers } from "@/lib/mock-data";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  OPEN: "bg-amber-500/10 text-amber-500",
  IN_PROGRESS: "bg-blue-500/10 text-blue-500",
  RESOLVED: "bg-green-500/10 text-green-500",
  CLOSED: "bg-muted text-muted-foreground",
};

const priorityColors: Record<string, string> = {
  LOW: "bg-muted text-muted-foreground",
  MEDIUM: "bg-amber-500/10 text-amber-500",
  HIGH: "bg-red-500/10 text-red-500",
  CRITICAL: "bg-red-600/10 text-red-600",
};

export default function AdminSupportPage() {
  const ticketsWithCustomers = mockSupportTickets.map(ticket => ({
    ...ticket,
    customer: mockCustomers.find(c => c.id === ticket.customer_id)
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Support Desk</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage customer inquiries and support tickets.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by ticket ID, subject, or customer..." className="pl-10 h-11 rounded-xl bg-muted/50 border-border/50" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["All", "Open", "In Progress", "Resolved"].map((f) => (
            <button key={f} className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${f === "All" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Ticket Details</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">Customer</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Priority</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ticketsWithCustomers.map((ticket, index) => (
                  <motion.tr key={ticket.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs mb-1">{ticket.subject}</span>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span className="font-mono">{ticket.ticket_number}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {ticket.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-muted rounded-full"><UserCircle className="h-4 w-4 text-muted-foreground" /></div>
                        <span className="text-xs">{ticket.customer?.full_name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[ticket.status]}>{ticket.status.replace(/_/g, " ")}</Badge>
                    </td>
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
