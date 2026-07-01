"use client";

import { LifeBuoy, Plus, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockSupportTickets, mockCurrentUser } from "@/lib/mock-data";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  OPEN: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  RESOLVED: "bg-green-500/10 text-green-500 border-green-500/20",
  CLOSED: "bg-muted text-muted-foreground",
};

const priorityColors: Record<string, string> = {
  LOW: "bg-muted text-muted-foreground",
  MEDIUM: "bg-amber-500/10 text-amber-500",
  HIGH: "bg-red-500/10 text-red-500",
  CRITICAL: "bg-red-600/10 text-red-600",
};

export default function SupportPage() {
  const myTickets = mockSupportTickets.filter((t) => t.customer_id === mockCurrentUser.id);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Support</h1>
          <p className="text-sm text-muted-foreground mt-1">Raise and track your support tickets.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
          <Plus className="h-4 w-4" /> New Ticket
        </button>
      </div>

      {myTickets.length === 0 ? (
        <div className="text-center py-20">
          <LifeBuoy className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-semibold text-lg">No support tickets</h3>
          <p className="text-sm text-muted-foreground mt-1">You haven&apos;t raised any support tickets yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myTickets.map((ticket, index) => (
            <motion.div key={ticket.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className="hover:bg-muted/30 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{ticket.ticket_number}</span>
                      <Badge className={statusColors[ticket.status]}>{ticket.status.replace(/_/g, " ")}</Badge>
                      <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm">{ticket.subject}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ticket.description}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                    <span>{new Date(ticket.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {ticket.category}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
