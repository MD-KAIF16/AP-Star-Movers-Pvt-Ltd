"use client";

import { User, Mail, Phone, MapPin, Building, Shield, Bell, Key, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockCurrentUser } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border/50">
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "company", label: "Company", icon: Building },
          { id: "security", label: "Security", icon: Shield },
          { id: "notifications", label: "Notifications", icon: Bell },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold border-2 border-primary/20">
                    {mockCurrentUser.full_name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <button className="px-4 py-2 rounded-lg bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">Change Avatar</button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={mockCurrentUser.full_name} className="pl-10 h-11 bg-muted/50 border-border/50 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={mockCurrentUser.phone} className="pl-10 h-11 bg-muted/50 border-border/50 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={mockCurrentUser.email} type="email" className="pl-10 h-11 bg-muted/50 border-border/50 rounded-xl" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">Save Changes</button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "company" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={mockCurrentUser.company_name} className="pl-10 h-11 bg-muted/50 border-border/50 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>GST Number</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={mockCurrentUser.gst_number} className="pl-10 h-11 bg-muted/50 border-border/50 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Billing Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <textarea defaultValue={""} className="w-full min-h-[100px] pl-10 pr-3 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">Save Details</button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" className="pl-10 h-11 bg-muted/50 border-border/50 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" className="pl-10 h-11 bg-muted/50 border-border/50 rounded-xl" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">Update Password</button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
