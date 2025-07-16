import { createContext, useState } from "react";
import { UserModel } from "../models/user";
import type { CountApproval } from "../models/common";

export const ProfileContext = createContext<{
  profile: UserModel | null;
  setProfile: (profile: UserModel | null) => void;
}>({
  profile: null,
  setProfile: () => {},
});
export const CountApprovalContext = createContext<{
  count: CountApproval | null;
  setCount: (profile: CountApproval | null) => void;
}>({
  count: null,
  setCount: () => {},
});

export const PermissionContext = createContext<{
  permissions: string[];
  setPermissions: (permission: string[]) => void;
}>({
  permissions: [],
  setPermissions: () => {},
});
