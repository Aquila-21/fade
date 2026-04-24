"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StepIndicator from "@/components/onboarding/StepIndicator";
import { useOnboarding } from "@/lib/onboarding/context";
import type { Asset, AssetType } from "@/lib/types/onboarding";

const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  real_estate: "부동산",
  bank_account: "은행 계좌",
  stock: "주식/증권",
  insurance: "보험",
  vehicle: "차량",
  other: "기타",
};

const schema = z.object({
  type: z.enum(["real_estate", "bank_account", "stock", "insurance", "vehicle", "other"]),
  description: z.string().min(1, "설명을 입력해주세요"),
  estimatedValue: z.coerce.number().min(0, "0 이상의 숫자를 입력해주세요"),
});

type FormData = z.infer<typeof schema>;

export default function Step3Page() {
  const router = useRouter();
  const { state, dispatch } = useOnboarding();
  const [assets, setAssets] = useState<Asset[]>(state.assets);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<FormData, any, FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { type: "real_estate", estimatedValue: 0 },
  });

  function addAsset(data: FormData) {
    const asset: Asset = {
      id: crypto.randomUUID(),
      type: data.type,
      description: data.description,
      estimatedValue: data.estimatedValue,
    };
    setAssets((prev) => [...prev, asset]);
    dispatch({ type: "ADD_ASSET", payload: asset });
    reset({ type: "real_estate", estimatedValue: 0 });
  }

  function removeAsset(id: string) {
    setAssets((prev) => prev.filter((a) => a.id !== id));
    dispatch({ type: "REMOVE_ASSET", payload: id });
  }

  function goComplete() {
    router.push("/dashboard");
  }

  const totalValue = assets.reduce((sum, a) => sum + a.estimatedValue, 0);

  return (
    <div className="w-full max-w-lg">
      <StepIndicator currentStep={3} />
      <div className="bg-white rounded-2xl border border-[#E0E0E0] p-8">
        <h1 className="text-xl font-bold text-[#2D2D2D] mb-2">자산 현황을 입력해주세요</h1>
        <p className="text-sm text-[#4A4A4A] mb-6">
          알고 있는 자산을 추가해주세요. 정확하지 않아도 괜찮습니다.
        </p>

        {/* Asset list */}
        {assets.length > 0 && (
          <div className="mb-4 flex flex-col gap-2">
            {assets.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between bg-[#F9F8F6] rounded-lg px-4 py-2 border border-[#E0E0E0]"
              >
                <div>
                  <span className="text-sm text-[#2D2D2D]">
                    {ASSET_TYPE_LABELS[a.type]} — {a.description}
                  </span>
                  <span className="block text-xs text-[#4A4A4A]">
                    약 {a.estimatedValue.toLocaleString("ko-KR")}원
                  </span>
                </div>
                <button
                  onClick={() => removeAsset(a.id)}
                  className="text-xs text-[#4A4A4A] hover:text-red-500 transition-colors"
                >
                  삭제
                </button>
              </div>
            ))}
            <p className="text-sm font-semibold text-[#2D2D2D] text-right">
              합계: {totalValue.toLocaleString("ko-KR")}원
            </p>
          </div>
        )}

        {/* Add form */}
        <form onSubmit={handleSubmit(addAsset)} className="flex flex-col gap-3 mb-6">
          <select
            {...register("type")}
            className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-[#F9F9F9] text-[#2D2D2D] focus:outline-none focus:border-[#8B8378] transition-colors"
          >
            {(Object.entries(ASSET_TYPE_LABELS) as [AssetType, string][]).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="자산 설명 (예: 서울시 강남구 아파트)"
            {...register("description")}
            className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-[#F9F9F9] text-[#2D2D2D] focus:outline-none focus:border-[#8B8378] transition-colors"
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

          <input
            type="number"
            placeholder="예상 가액 (원)"
            {...register("estimatedValue")}
            className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-[#F9F9F9] text-[#2D2D2D] focus:outline-none focus:border-[#8B8378] transition-colors"
          />
          {errors.estimatedValue && <p className="text-sm text-red-500">{errors.estimatedValue.message}</p>}

          <button
            type="submit"
            className="border border-[#8B8378] text-[#8B8378] hover:bg-[#F2EFE9] font-medium py-2 rounded-lg transition-colors"
          >
            + 자산 추가
          </button>
        </form>

        <button
          onClick={goComplete}
          className="w-full bg-[#8B8378] hover:bg-[#7a7268] text-white font-medium py-3 rounded-lg transition-colors"
        >
          완료 — 대시보드로 이동
        </button>
      </div>
    </div>
  );
}
