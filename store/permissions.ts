import { create } from "zustand";

// PermissionsStore interface 
interface IPermissionsState {
  Permissions: TPermissionsState
  setPermissions: (PermissionsState: TPermissionsState) => void
}

// 권한 별 표시를 위한 store 설정
export const PermissionsStore = create<IPermissionsState>((set) => ({
    Permissions: "ADMIN",
    setPermissions: (PermissionsState:TPermissionsState) => set(() => ({ Permissions: PermissionsState}))
}));