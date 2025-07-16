import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import type { FC } from "react";
import type { RoleModel } from "../models/role";
import { groupPermissions } from "../utils/helper";
import type { PermissionModel } from "../models/permission";

interface ModalPermissionsProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  title: string;
  role: RoleModel;
  permissions: PermissionModel[];
  setSelectedRole: (val: RoleModel) => void;
  onSave: (val: any) => void;
}

const ModalPermissions: FC<ModalPermissionsProps> = ({
  showModal,
  setShowModal,
  role,
  permissions,
  setSelectedRole,
  title,
  onSave,
}) => {
  return (
    <Modal
      className="modal"
      size="7xl"
      show={showModal}
      onClose={() => setShowModal(false)}
    >
      <ModalHeader className="modal-header">
        <div>{title}</div>
        <small>{role.permissions?.length} permissions</small>
      </ModalHeader>
      <ModalBody className="modal-body">
        {Object.keys(groupPermissions(permissions)).map((group, i) => {
          let groups: any = groupPermissions(permissions);
          let items = groups[group];
          return (
            <div key={i} className="mb-4 rounded-lg bg-gray-50 p-4">
              <h3 className="text-lg font-semibold">
                {group
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h3>
              <div className="flex flex-col gap-2">
                {Object.keys(items).map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 border-b border-gray-200 py-2 last:border-b-0"
                  >
                    <div className="flex justify-between">
                      <h4 className="text-sm font-semibold">
                        {item
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ")}
                      </h4>
                      {!role.is_owner && (
                        <div className="flex gap-2">
                          <small
                            className="cursor-pointer text-blue-500"
                            onClick={() => {
                              if (role) {
                                let selectedPermissions = permissions.filter(
                                  (permission) =>
                                    permission.name.startsWith(
                                      `${group}:${item}:`,
                                    ),
                                );

                                setSelectedRole({
                                  ...role,
                                  permissions: [
                                    ...(role.permissions ?? []),
                                    ...selectedPermissions.filter(
                                      (permission) =>
                                        !(role.permissions ?? []).some(
                                          (p) => p.id === permission.id,
                                        ),
                                    ),
                                  ],
                                });
                              }
                            }}
                          >
                            Pilih Semua
                          </small>
                          <small
                            className="cursor-pointer text-red-500"
                            onClick={() => {
                              if (role) {
                                const selectedPermissions = permissions.filter(
                                  (permission) =>
                                    permission.name.startsWith(
                                      `${group}:${item}:`,
                                    ),
                                );

                                setSelectedRole({
                                  ...role,
                                  permissions: (role.permissions ?? []).filter(
                                    (permission) =>
                                      !selectedPermissions.some(
                                        (p) => p.id === permission.id,
                                      ),
                                  ),
                                });
                              }
                            }}
                          >
                            Bersihkan
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {items[item].actions.map(
                        (action: PermissionModel, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <Checkbox
                              id={action.name}
                              readOnly={role.is_owner}
                              checked={
                                role.is_owner ||
                                (role.permissions ?? [])
                                  .map((p) => p.name)
                                  .includes(`${group}:${item}:${action.name}`)
                              }
                              onChange={(e) => {
                                if (role) {
                                  if (e.target.checked) {
                                    (role.permissions ?? []).push({
                                      ...action,
                                      name: `${group}:${item}:${action.name}`,
                                    });
                                  } else {
                                    role.permissions = (
                                      role.permissions ?? []
                                    ).filter(
                                      (p) =>
                                        p.name !==
                                        `${group}:${item}:${action.name}`,
                                    );
                                  }
                                  setSelectedRole({ ...role });
                                }
                              }}
                            />
                            {action.name
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </ModalBody>
      <ModalFooter className="modal-footer">
        <div className="flex w-full justify-end gap-2">
          <Button
            onClick={() => {
              let data = {
                ...role,
                permission_names: (role.permissions ?? []).map((p) => p.name),
              };
              onSave(data);
            }}
          >
            Simpan
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
export default ModalPermissions;
