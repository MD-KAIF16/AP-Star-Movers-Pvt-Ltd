"use client";

import { Receipt, Search, Download, Eye, MoreHorizontal, UserCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockInvoices, mockCustomers } from "@/lib/mock-data";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  DRAFT: "bg-muted text-muted-foreground",
  ISSUED: "bg-amber-500/10 text-amber-500",
  PAID: "bg-green-500/10 text-green-500",
  OVERDUE: "bg-red-500/10 text-red-500",
};

export default function AdminInvoicesPage() {
  const invoicesWithCustomers = mockInvoices.map(inv => ({
    ...inv,
    customer: mockCustomers.find(c => c.id === inv.customer_id)
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Invoices & Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage all customer invoices and payments.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">₹{(1200000).toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Revenue (MTD)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-500">₹{(450000).toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground mt-1">Outstanding</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-500">₹{(125000).toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground mt-1">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{mockInvoices.filter(i => i.status === "PAID").length}</p>
            <p className="text-xs text-muted-foreground mt-1">Paid Invoices</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by invoice number or customer..." className="pl-10 h-11 rounded-xl bg-muted/50 border-border/50" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["All", "Paid", "Issued", "Overdue"].map((f) => (
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
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Invoice No</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">Customer</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Dates</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoicesWithCustomers.map((invoice, index) => (
                  <motion.tr key={invoice.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-xs">{invoice.invoice_number}</td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs">{invoice.customer?.full_name || "Unknown"}</span>
                        <span className="text-[10px] text-muted-foreground">{invoice.customer?.company_name || ""}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-xs">₹{invoice.total_amount.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="flex flex-col text-[10px]">
                        <span className="text-muted-foreground">Issued: {new Date(invoice.created_at).toLocaleDateString("en-IN")}</span>
                        <span className={new Date(invoice.due_date) < new Date() && invoice.status !== "PAID" ? "text-red-500 font-medium" : "text-muted-foreground"}>
                          Due: {new Date(invoice.due_date).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[invoice.status]}>{invoice.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors" title="View">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors" title="Download">
                          <Download className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
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
