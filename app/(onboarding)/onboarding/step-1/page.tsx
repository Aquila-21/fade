"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StepIndicator from "@/components/onboarding/StepIndicator";
import { useOnboarding } from "@/lib/onboarding/context";

const schema = z.object({
  deathDate: z.string().min(1, "날짜를 입력해주세요"),
});

type FormData = z.infer<typeof schema>;

export default function Step1Page() {
  const router = useRouter();
  const { dispatch } = useOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    dispatch({ type: "SET_DEATH_DATE", payload: data.deathDate });
    router.push("/onboarding/step-2");
  }

  return (
    <div className="w-full max-w-lg">
      <StepIndicator currentStep={1} />
      <div className="bg-white rounded-2xl border border-[#E0E0E0] p-8">
        <h1 className="text-xl font-bold text-[#2D2D2D] mb-2">고인의 사망일을 입력해주세요</h1>
        <p className="text-sm text-[#4A4A4A] mb-6">
          법적 기한 계산에 사용됩니다. 정확한 날짜를 입력해주세요.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="date"
              {...register("deathDate")}
              className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-[#F9F9F9] text-[#2D2D2D] focus:outline-none focus:border-[#8B8378] transition-colors"
            />
            {errors.deathDate && (
              <p className="text-sm text-red-500 mt-1">{errors.deathDate.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#8B8378] hover:bg-[#7a7268] text-white font-medium py-3 rounded-lg transition-colors"
          >
            다음 단계
          </button>
        </form>
      </div>
    </div>
  );
}
