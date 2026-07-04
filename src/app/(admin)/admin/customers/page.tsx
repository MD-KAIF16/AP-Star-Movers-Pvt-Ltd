"use client";

import { UserCircle, Search, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockCustomers } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <p className="text-sm text-muted-foreground mt-1">View and manage all registered customers.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name, phone, company..." className="pl-10 h-11 rounded-xl bg-muted/50 border-border/50" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">Company</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Contact</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden lg:table-cell">GST</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCustomers.map((customer, index) => (
                  <motion.tr key={customer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                          <UserCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-xs">{customer.full_name}</p>
                          <p className="text-[10px] text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell text-xs">{customer.company_name || "—"}</td>
                    <td className="py-3 px-4 hidden md:table-cell text-xs text-muted-foreground">{customer.phone}</td>
                    <td className="py-3 px-4 hidden lg:table-cell text-xs font-mono text-muted-foreground">{customer.gst_number || "—"}</td>
                    <td className="py-3 px-4">
                      <Badge className={customer.is_active ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}>
                        {customer.is_active ? "Active" : "Inactive"}
                      </Badge>
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
