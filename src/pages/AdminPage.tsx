import { Label, Textarea, TextInput, Tooltip } from "flowbite-react";
import { useContext, useEffect, useRef, useState, type FC } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { BsCheckCircle, BsTrash } from "react-icons/bs";
import TableLayout from "../components/TableLayout";
import { LoadingContext } from "../contexts/LoadingContext";
import { PermissionContext } from "../contexts/ProfileContext";
import { SearchContext } from "../contexts/SearchContext";
import { AdminModel } from "../models/admin";
import { PaginationResponse } from "../objects/pagination";
import { getAdmins, inviteAdmin, updateAdmin } from "../services/api/adminApi";
import { getPagination } from "../utils/helper";
import Avatar from "../components/Avatar";
import { PiUserCircle } from "react-icons/pi";
import type { RoleModel } from "../models/role";
import { getRoles } from "../services/api/roleApi";
import ReactSelect from "react-select";

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = ({}) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const { permissions } = useContext(PermissionContext);
  const [admins, setAdmins] = useState<AdminModel[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse>();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { search, setSearch } = useContext(SearchContext);
  const [modalCat, setModalCat] = useState(false);
  const [selected, setSelected] = useState<AdminModel>();
  const timeout = useRef<number | null>(null);
  const [roles, setRoles] = useState<RoleModel[]>([]);
  useEffect(() => {
    getAllAdmins();
    setLoading(true);

    return () => {};
  }, [page, size]);

  const getAllAdmins = (s: string = "") => {
    getAdmins({ page: search ? 1 : page, size, search: s })
      .then((resp: any) => {
        setAdmins(resp.data.items);
        setPagination(getPagination(resp.data));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
  }, [search]);

  const save = async () => {
    try {
      setLoading(true);
      if (selected?.id) {
        await updateAdmin(selected.id!, selected);
      } else {
        await inviteAdmin(selected!);
      }
      getAllAdmins();
      setModalCat(false);
      setSelected(undefined);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TableLayout
      permission="auth:user:read"
      permissionCreate="auth:user:create"
      breadcrumb={[{ label: "Admin", link: "/admin" }]}
      title="Admin"
      buttonTitle="+ Admin"
      modalTitle="Tambah Admin"
      onSearch={(val) => {
        setSearch(val);
        if (timeout.current) {
          window.clearTimeout(timeout.current);
        }
        timeout.current = window.setTimeout(() => {
          getAllAdmins(val);
        }, 300);
      }}
      // onShowFilter={() => {
      //   alert("show filter");
      // }}
      buttonWidth={160}
      page={page}
      size={size}
      pagination={pagination}
      setPage={setPage}
      setSize={setSize}
      tableHeader={["Nama", "Email"]}
      tableBody={admins.map((item) => [
        <span className="flex flex-row items-center gap-2" style={{}}>
          {<Avatar user={item} size={30} />}
          {item.full_name}
        </span>,
        item.email,
      ])}
      setShowModal={setModalCat}
      showModal={modalCat}
      onSaveModal={save}
      onAddClick={() => {
        setSelected({
          full_name: "",
        });
        setModalCat(true);
      }}
      tableData={admins}
      tableAction={(val) => {
        return (
          <>
            {permissions.includes("auth:user:update") && (
              <AiOutlineEdit
                className="icon-edit"
                onClick={() => {
                  setSelected(val);
                  setModalCat(true);
                }}
              />
            )}
          </>
        );
      }}
      modalContent={
        <>
          <div>
            <Label>Nama Lengkap</Label>
            <TextInput
              className="input"
              type="text"
              value={selected?.full_name}
              onChange={(e) =>
                setSelected({ ...selected!, full_name: e.target.value })
              }
              placeholder="Input Lengkap"
            />
          </div>
          <div>
            <Label>Email</Label>
            <TextInput
              className="input"
              type="email"
              value={selected?.email}
              onChange={(e) =>
                setSelected({ ...selected!, email: e.target.value })
              }
              placeholder="Input Email"
            />
          </div>
          {/* <div>
            <Label>Hak Akses</Label>
            <ReactSelect
              value={
                selected?.role
                  ? { value: selected.role.id, label: selected.role.name }
                  : null
              }
              onChange={(e) =>
                setSelected({
                  ...selected!,
                  role_id: e!.value,
                  role: { id: e!.value, name: e!.label },
                })
              }
              options={roles.map((r) => ({ value: r.id, label: r.name }))}
              placeholder="Pilih Hak Akses"
            />
          </div> */}
          <div className="flex h-[100px] flex-col gap-2"></div>
        </>
      }
    />
  );
};
export default AdminPage;
