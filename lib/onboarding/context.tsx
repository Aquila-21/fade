"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { OnboardingData, FamilyMember, Asset } from "@/lib/types/onboarding";

type Action =
  | { type: "SET_DEATH_DATE"; payload: string }
  | { type: "ADD_FAMILY_MEMBER"; payload: FamilyMember }
  | { type: "REMOVE_FAMILY_MEMBER"; payload: string }
  | { type: "ADD_ASSET"; payload: Asset }
  | { type: "REMOVE_ASSET"; payload: string }
  | { type: "RESET" };

const initialState: OnboardingData = {
  deathDate: null,
  familyMembers: [],
  assets: [],
};

function reducer(state: OnboardingData, action: Action): OnboardingData {
  switch (action.type) {
    case "SET_DEATH_DATE":
      return { ...state, deathDate: action.payload };
    case "ADD_FAMILY_MEMBER":
      return { ...state, familyMembers: [...state.familyMembers, action.payload] };
    case "REMOVE_FAMILY_MEMBER":
      return {
        ...state,
        familyMembers: state.familyMembers.filter((m) => m.id !== action.payload),
      };
    case "ADD_ASSET":
      return { ...state, assets: [...state.assets, action.payload] };
    case "REMOVE_ASSET":
      return {
        ...state,
        assets: state.assets.filter((a) => a.id !== action.payload),
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface OnboardingContextValue {
  state: OnboardingData;
  dispatch: React.Dispatch<Action>;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return ctx;
}
