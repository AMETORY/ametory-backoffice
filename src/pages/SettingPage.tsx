import { useContext, useEffect, useRef, useState, type FC } from "react";
import TableLayout from "../components/TableLayout";
import { LoadingContext } from "../contexts/LoadingContext";
import { PermissionContext } from "../contexts/ProfileContext";
import { SearchContext } from "../contexts/SearchContext";
import type { PaginationResponse } from "../objects/pagination";
import type { SettingModel } from "../models/setting";
import Moment from "react-moment";
import { getSetting, updateSetting } from "../services/api/commonApi";
import { getPagination } from "../utils/helper";
import DashboardLayout from "../components/DashboardLayout";
import { Button, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import Editor from "@monaco-editor/react";
interface SettingPageProps {}

const SettingPage: FC<SettingPageProps> = ({}) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const { permissions } = useContext(PermissionContext);
  const [setting, setSetting] = useState<SettingModel>();
  const [pagination, setPagination] = useState<PaginationResponse>();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { search, setSearch } = useContext(SearchContext);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      getAllSamples();
    }
  }, [page, size, search, mounted]);

  const getAllSamples = () => {
    setLoading(true);
    getSetting()
      .then((resp: any) => {
        setSetting(resp.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Name</label>
          <TextInput
            type="text"
            value={setting?.app_name ?? ""}
            onChange={(e) =>
              setSetting({ ...setting!, app_name: e.target.value })
            }
            placeholder="Enter your name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Auto Responder</label>

          <Editor
            height={isFullscreen ? "calc(100vh - 220px)" : "65vh"}
            defaultLanguage="json"
            theme="vs-dark"
            options={{
              minimap: {
                enabled: false,
              },
              automaticLayout: true,
              autoIndent: true,
              formatOnPaste: true,
              formatOnType: true,
            }}
            value={
              setting?.auto_responder
                ? JSON.stringify(setting?.auto_responder, null, 8)
                : "{}"
            }
            defaultValue={setting?.auto_responder}
            onMount={(ed) => {
              editorRef.current = ed;
            }}
          />
        </div>
        <div>
          <Button
            type="submit"
            className="mt-8 w-32"
            onClick={async () => {
              try {
                setLoading(true);
                await updateSetting({
                  ...setting,
                  auto_responder: (editorRef.current as any).getValue()
                    ? JSON.parse((editorRef.current as any).getValue())
                    : null,
                });
                toast.success("Profile updated successfully");
              } catch (error) {
                toast.error(`${error}`);
              } finally {
                setLoading(false);
              }
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default SettingPage;
