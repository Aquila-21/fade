import { OnboardingProvider } from "@/lib/onboarding/context";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-[#F9F8F6] flex flex-col">
        {/* Simple top bar with logo only */}
        <div className="h-16 flex items-center px-6 border-b border-[#E0E0E0] bg-white">
          <span className="text-xl font-bold text-[#8B8378] tracking-widest">FADE</span>
        </div>
        <main className="flex-1 flex flex-col items-center justify-start px-4 py-12">
          {children}
        </main>
      </div>
    </OnboardingProvider>
  );
}
