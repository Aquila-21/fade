"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StepIndicator from "@/components/onboarding/StepIndicator";
import { useOnboarding } from "@/lib/onboarding/context";
import type { FamilyMember, FamilyRelation } from "@/lib/types/onboarding";

const RELATION_LABELS: Record<FamilyRelation, string> = {
  spouse: "배우자",
  child: "자녀",
  parent: "부모",
  sibling: "형제/자매",
  other: "기타",
};

const schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  relation: z.enum(["spouse", "child", "parent", "sibling", "other"]),
  isHeir: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function Step2Page() {
  const router = useRouter();
  const { state, dispatch } = useOnboarding();
  const [members, setMembers] = useState<FamilyMember[]>(state.familyMembers);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { isHeir: true, relation: "child" },
  });

  function addMember(data: FormData) {
    const member: FamilyMember = {
      id: crypto.randomUUID(),
      name: data.name,
      relation: data.relation,
      isHeir: data.isHeir,
    };
    setMembers((prev) => [...prev, member]);
    dispatch({ type: "ADD_FAMILY_MEMBER", payload: member });
    reset({ isHeir: true, relation: "child" });
  }

  function removeMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    dispatch({ type: "REMOVE_FAMILY_MEMBER", payload: id });
  }

  function goNext() {
    router.push("/onboarding/step-3");
  }

  return (
    <div className="w-full max-w-lg">
      <StepIndicator currentStep={2} />
      <div className="bg-white rounded-2xl border border-[#E0E0E0] p-8">
        <h1 className="text-xl font-bold text-[#2D2D2D] mb-2">가족 구성원을 입력해주세요</h1>
        <p className="text-sm text-[#4A4A4A] mb-6">
          상속인이 될 가족을 추가해주세요. 나중에 수정할 수 있습니다.
        </p>

        {/* Member list */}
        {members.length > 0 && (
          <div className="mb-4 flex flex-col gap-2">
            {members.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between bg-[#F9F8F6] rounded-lg px-4 py-2 border border-[#E0E0E0]"
              >
                <span className="text-sm text-[#2D2D2D]">
                  {m.name} ({RELATION_LABELS[m.relation]})
                  {m.isHeir && <span className="ml-2 text-xs text-[#8B8378]">상속인</span>}
                </span>
                <button
                  onClick={() => removeMember(m.id)}
                  className="text-xs text-[#4A4A4A] hover:text-red-500 transition-colors"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add form */}
        <form onSubmit={handleSubmit(addMember)} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="이름"
            {...register("name")}
            className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-[#F9F9F9] text-[#2D2D2D] focus:outline-none focus:border-[#8B8378] transition-colors"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

          <select
            {...register("relation")}
            className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] bg-[#F9F9F9] text-[#2D2D2D] focus:outline-none focus:border-[#8B8378] transition-colors"
          >
            {(Object.entries(RELATION_LABELS) as [FamilyRelation, string][]).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm text-[#4A4A4A]">
            <input type="checkbox" {...register("isHeir")} className="accent-[#8B8378]" />
            상속인으로 지정
          </label>

          <button
            type="submit"
            className="border border-[#8B8378] text-[#8B8378] hover:bg-[#F2EFE9] font-medium py-2 rounded-lg transition-colors"
          >
            + 가족 추가
          </button>
        </form>

        <button
          onClick={goNext}
          className="w-full bg-[#8B8378] hover:bg-[#7a7268] text-white font-medium py-3 rounded-lg transition-colors"
        >
          다음 단계
        </button>
      </div>
    </div>
  );
}
