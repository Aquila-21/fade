"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-[#E0E0E0]">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[#8B8378] tracking-widest">
          FADE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/calculator" className="text-sm text-[#4A4A4A] hover:text-[#8B8378] transition-colors">
            상속계산기
          </Link>
          <Link href="/simulator" className="text-sm text-[#4A4A4A] hover:text-[#8B8378] transition-colors">
            절세 시뮬레이터
          </Link>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/onboarding/step-1"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden md:inline-flex bg-[#8B8378] hover:bg-[#A8A196] text-white rounded-lg"
            )}
          >
            무료로 시작하기
          </Link>
          <button
            className="md:hidden p-2 text-[#4A4A4A]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E0E0E0] px-4 py-4 flex flex-col gap-4">
          <Link href="/calculator" className="text-sm text-[#4A4A4A]" onClick={() => setMobileOpen(false)}>
            상속계산기
          </Link>
          <Link href="/simulator" className="text-sm text-[#4A4A4A]" onClick={() => setMobileOpen(false)}>
            절세 시뮬레이터
          </Link>
          <Link
            href="/onboarding/step-1"
            onClick={() => setMobileOpen(false)}
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-[#8B8378] hover:bg-[#A8A196] text-white rounded-lg w-full justify-center"
            )}
          >
            무료로 시작하기
          </Link>
        </div>
      )}
    </header>
  );
}
