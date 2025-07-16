import { useContext, useEffect, useRef, useState, type FC } from "react";
import { useNavigate } from "react-router";
import TableLayout from "../components/TableLayout";
import { LoadingContext } from "../contexts/LoadingContext";
import { PermissionContext } from "../contexts/ProfileContext";
import { SearchContext } from "../contexts/SearchContext";
import type { RoleModel } from "../models/role";
import type { PaginationResponse } from "../objects/pagination";
import {
  createRole,
  deleteRole,
  getPermissions,
  getRoles,
  updateRole,
} from "../services/api/roleApi";
import { getPagination } from "../utils/helper";
import { Label, Textarea, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import { AiFillCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { BsKey, BsTrash, type BsCheckCircle } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";
import ModalPermissions from "../components/ModalPermissions";
import type { PermissionModel } from "../models/permission";

interface RolePageProps {}

const RolePage: FC<RolePageProps> = ({}) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const { permissions } = useContext(PermissionContext);
  const [rolees, setRoles] = useState<RoleModel[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse>();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { search, setSearch } = useContext(SearchContext);
  const [modalCat, setModalCat] = useState(false);
  const [selected, setSelected] = useState<RoleModel>();
  const [modalImport, setModalImport] = useState(false);
  const timeout = useRef<number | null>(null);
  const [modalRole, setModalRole] = useState(false);
  const nav = useNavigate();
  const [allPermissions, setAllPermissions] = useState<PermissionModel[]>([]);
  const [modalPermissions, setModalPermissions] = useState(false);
  useEffect(() => {
    getAllRoles();
    setLoading(true);
    return () => {};
  }, [page, size]);

  const getAllRoles = (s: string = "") => {
    getRoles({ page: search ? 1 : page, size, search: s })
      .then((resp: any) => {
        setRoles(resp.data.items);
        setPagination(getPagination(resp.data));
      })
      .finally(() => setLoading(false));
    // getPermissions().then((res: any) => {
    //   setAllPermissions(res.data);
    // });
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
  }, [search]);

  const renderModal = () => {
    return (
      <div className="flex flex-col space-y-4">
        <div>
          <Label>Nama Hak Akses</Label>
          <TextInput
            className="input"
            type="text"
            value={selected?.name}
            onChange={(e) =>
              setSelected({ ...selected!, name: e.target.value })
            }
            placeholder="Input Nama"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <TableLayout
        title="Hak Akses"
        buttonTitle="+ Hak Akses"
        buttonWidth={120}
        permission="rbac:role:read"
        permissionCreate="rbac:role:create"
        onSearch={(val: string) => {
          setSearch(val);
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }
          timeout.current = window.setTimeout(() => {
            getAllRoles(val);
          }, 500);
        }}
        onAddClick={() => {
          setSelected({
            name: "",
          });
          setModalRole(true);
        }}
        page={page}
        setPage={setPage}
        size={size}
        setSize={setSize}
        pagination={pagination}
        tableHeader={["Nama", "Super Admin"]}
        tableBody={rolees.map((val) => [
          val.name,

          val.is_super_admin ? (
            <AiFillCheckCircle className="text-green-500" />
          ) : (
            <HiXMark className="text-red-500" />
          ),
        ])}
        tableData={rolees}
        showModal={modalRole}
        setShowModal={setModalRole}
        modalContent={renderModal()}
        tableAction={(val: RoleModel) => {
          return (
            <>
              {permissions.includes("rbac:role:update") &&
                !val.is_super_admin && (
                  <BsKey
                    className="icon-publish"
                    onClick={() => {
                      setSelected(val);
                      setModalPermissions(true);
                    }}
                  />
                )}
              {permissions.includes("rbac:role:update") && (
                <AiOutlineEdit
                  className="icon-edit"
                  onClick={() => {
                    setSelected(val);
                    setModalRole(true);
                  }}
                />
              )}
              {!val.is_super_admin && (
                <BsTrash
                  className="icon-delete"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Anda yakin ingin menghapus `" + val.name + "`?",
                      )
                    ) {
                      deleteRole(val.id!)
                        .then(() => {
                          toast.success("Hak Akses berhasil dihapus.");
                          getAllRoles();
                        })
                        .catch((error: any) => toast.error(`${error}`));
                    }
                  }}
                />
              )}
            </>
          );
        }}
        onSaveModal={async () => {
          try {
            if (selected) {
              setLoading(true);
              setModalRole(false);
              if (selected.id) {
                await updateRole(selected.id, selected);
              } else {
                await createRole(selected);
              }
              getAllRoles();
            }
          } catch (error) {
            toast.error(`${error}`);
          } finally {
            setLoading(false);
          }
        }}
      />
      {selected && (
        <ModalPermissions
          showModal={modalPermissions}
          setShowModal={setModalPermissions}
          role={selected}
          title={`Edit Hak Akses ${selected.name}`}
          permissions={allPermissions}
          setSelectedRole={setSelected}
          onSave={(val: any) => {
            setLoading(true);
            updateRole(selected.id!, val)
              .then(() => {
                toast.success("Hak Akses berhasil diubah.");
                getAllRoles();
                setModalPermissions(false);
                setSelected(undefined);
              })
              .catch((error: any) => toast.error(`${error}`))
              .finally(() => setLoading(false));
          }}
        />
      )}
    </div>
  );
};
export default RolePage;
