import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IPermissionsState {
  Permissions: TPermissionsState;
  setPermissions: (PermissionsState: TPermissionsState) => void;
}

// 권한 별 표시를 위한 store 설정
export const PermissionsStore = create<IPermissionsState>()(
  persist(
    (set) => ({
      Permissions: "ADMIN",
      setPermissions: (PermissionsState: TPermissionsState) =>
        set(() => ({ Permissions: PermissionsState })),
    }),
    {
      name: "pers-storage", // name of the item in the storage (must be unique)
    }
  )
);
