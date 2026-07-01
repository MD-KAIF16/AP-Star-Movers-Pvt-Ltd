"use client";

import { Receipt, Download, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockInvoices, mockPayments } from "@/lib/mock-data";
import { motion } from "framer-motion";

const invoiceStatusColors: Record<string, string> = {
  DRAFT: "bg-muted text-muted-foreground",
  ISSUED: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  PAID: "bg-green-500/10 text-green-500 border-green-500/20",
  OVERDUE: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function InvoicesPage() {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold">Invoices & Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">View and download your GST invoices.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">₹{(85615 + 32922).toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Billed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-500">₹{95615 .toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Paid</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 sm:col-span-1">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-500">₹{22922 .toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground mt-1">Outstanding</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <div>
        <h2 className="text-lg font-bold mb-4">All Invoices</h2>
        <div className="space-y-3">
          {mockInvoices.map((invoice, index) => (
            <motion.div key={invoice.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className="hover:bg-muted/30 transition-colors">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 bg-muted rounded-xl hidden sm:flex">
                    <Receipt className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-bold">{invoice.invoice_number}</span>
                      <Badge className={invoiceStatusColors[invoice.status]}>{invoice.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(invoice.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">₹{invoice.total_amount.toLocaleString("en-IN")}</p>
                    <div className="flex gap-2 mt-1">
                      <button className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors" title="View">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors" title="Download PDF">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div>
        <h2 className="text-lg font-bold mb-4">Payment History</h2>
        <div className="space-y-3">
          {mockPayments.map((payment, index) => (
            <motion.div key={payment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${payment.status === "COMPLETED" ? "bg-green-500/10" : "bg-amber-500/10"}`}>
                    <span className="text-lg">{payment.method === "UPI" ? "📱" : payment.method === "NET_BANKING" ? "🏦" : "💳"}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">₹{payment.amount.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-muted-foreground">{payment.method.replace(/_/g, " ")} • {payment.transaction_reference}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={payment.status === "COMPLETED" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}>
                      {payment.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(payment.created_at).toLocaleDateString("en-IN")}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
