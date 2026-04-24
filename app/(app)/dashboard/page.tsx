import { dummyChecklist } from "@/lib/dummy/checklist";
import type { ChecklistItem, ChecklistCategory } from "@/lib/types/checklist";

const CATEGORY_LABELS: Record<ChecklistCategory, string> = {
  burial: "장례",
  finance: "금융",
  government: "행정",
  real_estate: "부동산",
  tax: "세금",
  legal: "법률",
};

const STATUS_LABELS = {
  pending: "시작 전",
  in_progress: "진행 중",
  done: "완료",
};

function ChecklistCard({ item }: { item: ChecklistItem }) {
  const isUrgent = item.isUrgent && item.status !== "done";

  return (
    <div
      className={`rounded-xl border p-5 flex flex-col gap-2 ${
        isUrgent
          ? "bg-[#FAED7D] border-[#F0D800]"
          : "bg-white border-[#E0E0E0]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-medium text-[#4A4A4A] bg-[#F2EFE9] px-2 py-0.5 rounded-full">
            {CATEGORY_LABELS[item.category]}
          </span>
          {isUrgent && (
            <span className="ml-2 text-xs font-semibold text-[#7a5c00]">
              ⚠ 기한 주의
            </span>
          )}
        </div>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            item.status === "done"
              ? "bg-[#8B8378] text-white"
              : item.status === "in_progress"
              ? "bg-[#A8A196] text-white"
              : "bg-[#E0E0E0] text-[#4A4A4A]"
          }`}
        >
          {STATUS_LABELS[item.status]}
        </span>
      </div>
      <h3 className="font-semibold text-[#2D2D2D] text-sm">{item.title}</h3>
      <p className="text-xs text-[#4A4A4A] leading-relaxed">{item.description}</p>
      {item.dueDays !== null && (
        <p className="text-xs text-[#7a5c00] font-medium">
          사망일로부터 {item.dueDays}일 이내
        </p>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const total = dummyChecklist.length;
  const done = dummyChecklist.filter((i) => i.status === "done").length;
  const progressPct = Math.round((done / total) * 100);
  const urgentPending = dummyChecklist.filter(
    (i) => i.isUrgent && i.status !== "done"
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Progress Summary */}
      <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6 mb-8">
        <h1 className="text-xl font-bold text-[#2D2D2D] mb-1">상속 행정 현황</h1>
        <p className="text-sm text-[#4A4A4A] mb-4">
          전체 {total}개 항목 중 {done}개 완료
        </p>
        {/* Progress bar */}
        <div className="w-full h-3 bg-[#E0E0E0] rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-[#8B8378] rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-right text-sm font-semibold text-[#8B8378]">{progressPct}%</p>
      </div>

      {/* Urgent items */}
      {urgentPending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-[#2D2D2D] mb-3">
            ⚠ 기한이 있는 항목 ({urgentPending.length}개)
          </h2>
          <div className="flex flex-col gap-3">
            {urgentPending.map((item) => (
              <ChecklistCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* All items */}
      <div>
        <h2 className="text-base font-bold text-[#2D2D2D] mb-3">
          전체 체크리스트
        </h2>
        <div className="flex flex-col gap-3">
          {dummyChecklist.map((item) => (
            <ChecklistCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
