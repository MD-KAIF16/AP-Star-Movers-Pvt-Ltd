"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, LayoutDashboard, FileText, Users, Settings, Bell, Search, LifeBuoy, Receipt, Menu, X, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: FileText },
  { href: "/admin/fleet", label: "Fleet", icon: Truck },
  { href: "/admin/drivers", label: "Drivers", icon: Users },
  { href: "/admin/customers", label: "Customers", icon: UserCircle },
  { href: "/admin/invoices", label: "Invoices", icon: Receipt },
  { href: "/admin/support", label: "Support", icon: LifeBuoy },
];

const sidebarBottomItems = [
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/50 bg-card fixed inset-y-0 left-0 z-30">
        <div className="flex h-16 items-center gap-2.5 border-b border-border/50 px-6">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight">A P Star Movers</p>
            <p className="text-[10px] text-muted-foreground">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border/50 p-4 space-y-1">
          {sidebarBottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-card border-r"
            >
              <div className="flex h-16 items-center justify-between border-b px-5">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <p className="font-bold text-sm">Admin Panel</p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg bg-muted"><X className="h-4 w-4" /></button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                      pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border/50 bg-background/95 backdrop-blur px-4 md:px-6">
          <button className="md:hidden p-2 rounded-lg bg-muted" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:flex flex-1">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bookings, vehicles, drivers..." className="pl-10 h-10 rounded-xl bg-muted/50 border-border/50" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">3</span>
            </button>
            <Avatar className="h-8 w-8 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
