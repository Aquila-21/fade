export type FamilyRelation =
  | "spouse"
  | "child"
  | "parent"
  | "sibling"
  | "other";

export type AssetType =
  | "real_estate"
  | "bank_account"
  | "stock"
  | "insurance"
  | "vehicle"
  | "other";

export interface FamilyMember {
  id: string;
  name: string;
  relation: FamilyRelation;
  isHeir: boolean;
}

export interface Asset {
  id: string;
  type: AssetType;
  description: string;
  estimatedValue: number;
}

export interface OnboardingData {
  deathDate: string | null;        // ISO date string "YYYY-MM-DD"
  familyMembers: FamilyMember[];
  assets: Asset[];
}
