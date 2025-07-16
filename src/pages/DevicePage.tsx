import { useContext, useEffect, useState, type FC } from "react";
import TableLayout from "../components/TableLayout";
import { LoadingContext } from "../contexts/LoadingContext";
import { PermissionContext } from "../contexts/ProfileContext";
import { SearchContext } from "../contexts/SearchContext";
import type { PaginationResponse } from "../objects/pagination";
import type { DeviceModel } from "../models/device";
import Moment from "react-moment";
import {
  createDevice,
  createQRDevice,
  getDevices,
  getQrImage,
  sendGeminiChat,
  updateDevice,
} from "../services/api/deviceApi";
import { getPagination } from "../utils/helper";
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
  TextInput,
} from "flowbite-react";
import {
  BsChat,
  BsCheck,
  BsCheckCircle,
  BsCheckCircleFill,
  BsQrCode,
} from "react-icons/bs";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import BadgeStatus from "../components/BadgeStatus";
import { AiOutlineEdit } from "react-icons/ai";
import type { AgentModel } from "../models/agent";
import { getAgents } from "../services/api/agentApi";
import ReactSelect from "react-select";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface DevicePageProps {}

const DevicePage: FC<DevicePageProps> = ({}) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const { permissions } = useContext(PermissionContext);
  const [device, setDevices] = useState<DeviceModel[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse>();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { search, setSearch } = useContext(SearchContext);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<DeviceModel>();
  const [showQr, setShowQr] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [agents, setAgents] = useState<AgentModel[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [chat, setChat] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      getAllDevices();
    }
  }, [page, size, search, mounted]);
  useEffect(() => {
    if (mounted) {
      getAgents({ page: search ? 1 : page, size, search: search })
        .then((resp: any) => {
          setAgents(resp.data.items);
        })
        .finally(() => setLoading(false));
    }
  }, [mounted]);

  const getAllDevices = () => {
    setLoading(true);
    getDevices({ page: search ? 1 : page, size, search: search })
      .then((resp: any) => {
        setDevices(resp.data);
        setPagination(getPagination(resp.data));
      })
      .finally(() => setLoading(false));
  };

  const sendChat = () => {
    toast.success("Chat sent successfully");
    setLoading(true);

    sendGeminiChat(selected?.id!, { text: chat })
      .then((res: any) => {
        setChatResponse(res.data);
        setChat("");
      })
      .finally(() => setLoading(false));
    // setShowChat(false);
  };

  return (
    <>
      <TableLayout
        breadcrumb={[{ label: "Device", link: "" }]}
        title="Device"
        onSearch={setSearch}
        page={page}
        setPage={setPage}
        size={size}
        setSize={setSize}
        tableHeader={["Device ID", "Agent", "Status", "Connected"]}
        tableBody={device.map((val) => [
          val.device_id,
          val.agent?.name,
          <BadgeStatus status={val.status} />,
          val.is_connected ? (
            <BsCheckCircleFill className="text-green-500" />
          ) : (
            ""
          ),
        ])}
        tableData={device}
        showModal={showModal}
        setShowModal={setShowModal}
        onAddClick={() => {
          setShowModal(true);
          setSelected({});
        }}
        onSaveModal={async () => {
          try {
            setLoading(true);
            if (selected?.id) {
              await updateDevice(selected.id!, selected);
            } else {
              await createDevice(selected);
            }
            getAllDevices();
            setShowModal(false);
            setSelected(undefined);
          } catch (error) {
            toast.error(`Failed to create device: ${error}`);
          } finally {
            setLoading(false);
          }
        }}
        tableAction={(val) => (
          <div className="flex space-x-2">
            {val.status !== "ACTIVE" && (
              <BsQrCode
                className="cursor-pointer"
                onClick={() => {
                  setSelected(val);
                  createQRDevice(val.id)
                    .then(() => {
                      getAllDevices();
                      setShowModal(false);
                    })
                    .catch((err) => {
                      toast.error(`Failed to create QR Code`);
                      setQrCode("");
                      setShowQr(false);
                    });

                  setTimeout(() => {
                    getQrImage(val.id).then((resp: any) => {
                      setShowQr(true);
                      setQrCode(resp.data);
                    });
                  }, 3000);
                }}
              />
            )}
            <AiOutlineEdit
              className="icon-edit"
              onClick={() => {
                setShowModal(true);
                setSelected(val);
              }}
            />
            {val.agent && (
              <BsChat
                className="icon-publish"
                onClick={() => {
                  setShowChat(true);
                  setSelected(val);
                }}
              />
            )}
          </div>
        )}
        modalContent={
          <div className="flex min-h-[400px] flex-col space-y-4">
            <div>
              <label
                htmlFor="device_id"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Device Number
              </label>
              <TextInput
                id="device_id"
                type="text"
                value={selected?.device_id}
                placeholder="Device ID"
                required
                onChange={(e) =>
                  setSelected({ ...selected!, device_id: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="device_id"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Agent
              </label>
              <ReactSelect
                options={agents.map((v) => ({
                  value: v.id!,
                  label: v.name!,
                }))}
                value={
                  selected?.agent_id
                    ? {
                        label: agents.find((v) => v.id === selected?.agent_id)
                          ?.name,
                        value: selected?.agent_id,
                      }
                    : null
                }
                onChange={(e) =>
                  setSelected({ ...selected!, agent_id: e?.value })
                }
              />
            </div>
          </div>
        }
      />
      <Modal
        className="modal"
        show={showQr}
        onClose={() => setShowQr(false)}
        dismissible
      >
        <ModalHeader className="modal-header">QR Code</ModalHeader>
        <ModalBody className="modal-body">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrCode}
            viewBox={`0 0 256 256`}
          />
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button onClick={() => setShowQr(false)}>Close</Button>
        </ModalFooter>
      </Modal>
      <Modal
        className="modal"
        show={showChat}
        onClose={() => setShowChat(false)}
        dismissible
      >
        <ModalHeader className="modal-header">Test Agent</ModalHeader>
        <ModalBody className="modal-body">
          <div className="flex flex-col space-y-4">
            {chatResponse && (
              <div className="min-h-[100px] rounded-lg border border-gray-300 p-2">
                <ReactMarkdown
                  children={chatResponse}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
            )}
            <Textarea
              disabled={loading}
              id="message"
              rows={4}
              placeholder="Your message..."
              required
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button color="cancel" onClick={() => setShowChat(false)}>
            Close
          </Button>
          <Button onClick={() => sendChat()}>Kirim</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default DevicePage;
//
