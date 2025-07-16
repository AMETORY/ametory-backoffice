import type { FileModel } from "./file";
import type { RoleModel } from "./role";

export interface AdminModel {
  id?: string;
  full_name?: string;
  username?: string;
  email?: string;
  phone_number?: string | null;
  address?: string;
  roles?: RoleModel[];
  role?: RoleModel;
  profile_picture?: FileModel | null;
  role_id?: string | null;
}
