import type { FileModel } from "./file";
import type { RoleModel } from "./role";

export interface UserModel {
  id?: string;
  full_name?: string;
  username?: string;
  code?: string | null;
  email?: string;
  phone_number?: string | null;
  address?: string;
  password?: string;
  roles?: RoleModel[];
  role?: RoleModel;
  profile_picture?: FileModel | null;
  role_id?: string | null;
  birth_date?: string | null;
  latitude?: number;
  longitude?: number;
  province_id?: string | null;
  regency_id?: string | null;
  district_id?: string | null;
  village_id?: string | null;
  identity_number?: string;
  identity_type?: string;
  is_verified?: boolean;
  verified_at?: Date | null;
}
