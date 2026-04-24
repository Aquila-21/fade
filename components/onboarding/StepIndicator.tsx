interface StepIndicatorProps {
  currentStep: number;  // 1, 2, or 3
  totalSteps?: number;
}

const STEP_LABELS = ["사망일 입력", "가족 구성", "자산 현황"];

export default function StepIndicator({
  currentStep,
  totalSteps = 3,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={step} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isCompleted || isActive
                    ? "bg-[#8B8378] text-white"
                    : "bg-[#E0E0E0] text-[#4A4A4A]"
                }`}
              >
                {isCompleted ? "✓" : step}
              </div>
              <span
                className={`text-xs mt-1 ${
                  isActive ? "text-[#8B8378] font-medium" : "text-[#4A4A4A]"
                }`}
              >
                {STEP_LABELS[i]}
              </span>
            </div>
            {/* Connector line (not after last step) */}
            {step < totalSteps && (
              <div
                className={`w-16 h-0.5 mx-2 mb-4 ${
                  isCompleted ? "bg-[#8B8378]" : "bg-[#E0E0E0]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
