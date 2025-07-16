import { useContext, useEffect, useState, type FC } from "react";
import TableLayout from "../components/TableLayout";
import { LoadingContext } from "../contexts/LoadingContext";
import { PermissionContext } from "../contexts/ProfileContext";
import { SearchContext } from "../contexts/SearchContext";
import type { PaginationResponse } from "../objects/pagination";
import type { AgentModel } from "../models/agent";
import Moment from "react-moment";
import {
  createAgent,
  deleteAgent,
  getAgents,
  updateAgent,
} from "../services/api/agentApi";
import { getPagination } from "../utils/helper";
import { Label, Textarea, TextInput, ToggleSwitch } from "flowbite-react";
import { BsCheckCircleFill, BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import toast from "react-hot-toast";

interface AgentPageProps {}

const AgentPage: FC<AgentPageProps> = ({}) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const { permissions } = useContext(PermissionContext);
  const [agents, setAgents] = useState<AgentModel[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse>();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { search, setSearch } = useContext(SearchContext);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<AgentModel>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      getAllAgents();
    }
  }, [page, size, search, mounted]);

  const getAllAgents = () => {
    setLoading(true);
    getAgents({ page: search ? 1 : page, size, search: search })
      .then((resp: any) => {
        setAgents(resp.data.items);
        setPagination(getPagination(resp.data));
      })
      .finally(() => setLoading(false));
  };

  return (
    <TableLayout
      permission="sample:sample:read"
      permissionCreate="sample:sample:create"
      breadcrumb={[{ label: "Agent", link: "" }]}
      title="Agent"
      onSearch={setSearch}
      page={page}
      setPage={setPage}
      size={size}
      setSize={setSize}
      tableHeader={["Agent", "Status"]}
      tableBody={agents.map((val) => [
        val.name,

        val.active ? <BsCheckCircleFill className="text-green-500" /> : "",
      ])}
      tableData={agents}
      onAddClick={() => {
        setSelected({
          name: "",
        });
        setShowModal(true);
      }}
      showModal={showModal}
      setShowModal={setShowModal}
      modalSize="7xl"
      onSaveModal={async () => {
        try {
          setLoading(true);
          if (selected?.id) {
            await updateAgent(selected.id!, selected);
          } else {
            await createAgent(selected!);
          }
          getAllAgents();
          setShowModal(false);
          setSelected(undefined);
        } catch (error) {
          toast.error(`${error}`);
        } finally {
          setLoading(false);
        }
      }}
      tableAction={(val) => (
        <>
          <AiOutlineEdit
            className="icon-edit"
            onClick={() => {
              setShowModal(true);
              setSelected(val);
            }}
          />
          <BsTrash
            className="icon-delete"
            onClick={async () => {
              if (
                window.confirm(
                  "Apakah Anda yakin ingin menghapus agent " + val.name + "?",
                )
              ) {
                try {
                  setLoading(true);
                  await deleteAgent(val.id!);
                  toast.success("Jenis Perizinan berhasil dihapus");
                  getAllAgents();
                } catch (error) {
                  toast.error(`${error}`);
                } finally {
                  setLoading(false);
                }
              }
            }}
          />
        </>
      )}
      modalContent={
        <div className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="name">Nama Agent</Label>
            <TextInput
              id="name"
              type="text"
              value={selected?.name}
              placeholder="Device ID"
              required
              onChange={(e) =>
                setSelected({ ...selected!, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="Instruksi">Instruksi</Label>
            <Textarea
              id="system_instruction"
              value={selected?.system_instruction}
              placeholder="Instruksi"
              required
              rows={20}
              onChange={(e) =>
                setSelected({
                  ...selected!,
                  system_instruction: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="Instruksi">Aktif</Label>
            <ToggleSwitch
              id="active"
              checked={selected?.active ?? false}
              onChange={(e) => setSelected({ ...selected!, active: e })}
            />
          </div>
        </div>
      }
    />
  );
};
export default AgentPage;
