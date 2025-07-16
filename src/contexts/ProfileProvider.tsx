// context/ProfileContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import type { UserModel } from "../models/user";
import type { SubDistrict } from "../models/region";
import type { RoleModel } from "../models/role";

interface ProfileContextType {
  profile: UserModel | null;
  setProfile: (attendance: UserModel | null) => void;
  subDistrict: SubDistrict | null;
  setSubDistrict: (subDistrict: SubDistrict | null) => void;
  role: RoleModel | null;
  setRole: (role: RoleModel | null) => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserModel | null>(null);
  const [subDistrict, setSubDistrict] = useState<SubDistrict | null>(null);
  const [role, setRole] = useState<RoleModel | null>(null);

  const clearProfile = () => {
    setProfile(null);
    setSubDistrict(null);
    setRole(null);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        clearProfile,
        subDistrict,
        setSubDistrict,
        role,
        setRole,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
