import { create } from "zustand";

interface IErrorState {
  Error: boolean;
  setError: (ErrorState: boolean) => void;
}

// 에러 상태 설정
export const ErrorStore = create<IErrorState>((set) => ({
  Error: false,
  setError: (ErrorState: boolean) => set(() => ({ Error: ErrorState })),
}));
