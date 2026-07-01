"use client";

import Link from "next/link";
import { login } from "@/actions/auth";
import { Truck, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-1/4 -left-32 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Truck className="h-8 w-8 text-primary" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your A P Star Movers account</p>
        </div>

        {/* Card */}
        <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg p-3 text-center">
              {decodeURIComponent(error)}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg p-3 text-center">
              {message}
            </div>
          )}

          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                className="h-12 bg-muted/50 border-border/50 rounded-xl focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="h-12 bg-muted/50 border-border/50 rounded-xl focus:border-primary focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              formAction={login}
              className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-xl shadow hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
