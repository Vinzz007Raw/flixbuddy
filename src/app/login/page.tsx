"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Button, Input } from "@/components/ui";
import { useApp } from "@/lib/store";
import { Film, ShieldCheck } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const { login, currentUser } = useApp();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) router.replace(next);
  }, [currentUser, next, router]);

  if (currentUser) {
    return (
      <p className="p-8 text-center text-muted text-sm">Redirecting…</p>
    );
  }

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!name.trim()) {
      setError("Enter your name so others know who you are.");
      return;
    }
    setStep("otp");
  }

  function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    // Demo OTP: accept 123456 or any 6 digits
    if (otp.replace(/\D/g, "").length !== 6) {
      setError("Enter the 6-digit OTP (demo: 123456).");
      return;
    }
    const formatted = phone.startsWith("+")
      ? phone
      : `+91 ${phone.replace(/\D/g, "").slice(-10).replace(/(\d{5})(\d{5})/, "$1 $2")}`;
    login(name.trim(), formatted);
    router.replace(next);
  }

  return (
    <div className="pb-safe">
      <TopBar title="Login" showBack backHref="/" />

      <main className="px-4 pt-8 space-y-6 max-w-sm mx-auto">
        <div className="text-center space-y-2">
          <div className="h-14 w-14 mx-auto rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/30">
            <Film className="h-7 w-7" />
          </div>
          <h1 className="font-display text-2xl font-extrabold">
            Welcome to FlixBuddy
          </h1>
          <p className="text-sm text-muted">
            Phone OTP keeps Hyderabad movie buddies real and trusted.
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">
                Your name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Reddy"
                autoComplete="name"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">
                Mobile number
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit number"
                inputMode="tel"
                autoComplete="tel"
              />
            </div>
            {error && (
              <p className="text-sm text-accent bg-accent/10 rounded-xl px-3 py-2">
                {error}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full">
              Send OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-sm text-muted text-center">
              Demo mode — enter any 6 digits or{" "}
              <span className="text-foreground font-semibold">123456</span>
            </p>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase">
                OTP
              </label>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                inputMode="numeric"
                maxLength={6}
                className="text-center text-lg tracking-[0.4em] font-semibold"
              />
            </div>
            {error && (
              <p className="text-sm text-accent bg-accent/10 rounded-xl px-3 py-2">
                {error}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full">
              Verify & continue
            </Button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-xs text-muted hover:text-foreground"
            >
              Change number
            </button>
          </form>
        )}

        <div className="flex items-start gap-2 text-[11px] text-dim bg-soft rounded-xl p-3 border border-border">
          <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
          <p>
            MVP demo auth is stored locally. Production will use Supabase Phone
            OTP. We never share your number until you choose to in chat.
          </p>
        </div>

        <p className="text-center text-xs text-dim">
          <Link href="/" className="text-accent font-medium">
            Continue as guest
          </Link>
        </p>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted text-sm">Loading…</div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
