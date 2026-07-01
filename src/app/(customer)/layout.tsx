"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, LayoutDashboard, MapPin, FileText, Settings, Bell, LifeBuoy, Receipt, Plus, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "My Bookings", icon: FileText },
  { href: "/dashboard/tracking", label: "Tracking", icon: MapPin },
  { href: "/dashboard/invoices", label: "Invoices", icon: Receipt },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 font-bold">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <span className="hidden sm:block text-sm tracking-tight">A P Star Movers</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
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

        <div className="ml-auto flex items-center gap-3">
          {/* Book Truck CTA */}
          <Link
            href="/dashboard/book-truck"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Book Truck
          </Link>

          {/* Notifications */}
          <button className="relative rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">2</span>
          </button>

          {/* Avatar */}
          <Avatar className="h-8 w-8 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">MK</AvatarFallback>
          </Avatar>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden rounded-lg bg-muted p-2 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-16 z-30 bg-background border-b shadow-lg p-4"
          >
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <Link
                href="/dashboard/book-truck"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground mt-2"
              >
                <Plus className="h-5 w-5" />
                Book Truck
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur border-t px-2 py-1.5 flex items-center justify-around">
        {[navItems[0], navItems[1], navItems[2], navItems[4]].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label.replace("My ", "")}</span>
          </Link>
        ))}
        <Link
          href="/dashboard/book-truck"
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-primary text-xs font-medium"
        >
          <div className="p-2 bg-primary rounded-full text-primary-foreground -mt-4 shadow-lg">
            <Plus className="h-5 w-5" />
          </div>
          <span>Book</span>
        </Link>
      </nav>
    </div>
  );
}
