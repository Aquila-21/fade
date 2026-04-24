export type ChecklistCategory =
  | "burial"        // 장례
  | "finance"       // 금융
  | "government"    // 행정
  | "real_estate"   // 부동산
  | "tax"           // 세금
  | "legal";        // 법률

export type ChecklistStatus = "pending" | "in_progress" | "done";

export interface ChecklistItem {
  id: string;
  category: ChecklistCategory;
  title: string;
  description: string;
  dueDays: number | null;    // days after death date; null = no deadline
  isUrgent: boolean;
  status: ChecklistStatus;
  guideUrl: string | null;
}
