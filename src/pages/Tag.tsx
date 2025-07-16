import { Label, Textarea, TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState, type FC } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import TableLayout from "../components/TableLayout";
import { LoadingContext } from "../contexts/LoadingContext";
import { PermissionContext } from "../contexts/ProfileContext";
import { SearchContext } from "../contexts/SearchContext";
import { TagModel } from "../models/tag";
import { PaginationResponse } from "../objects/pagination";
import {
  createTag,
  deleteTag,
  getTags,
  updateTag,
} from "../services/api/tagApi";
import { getPagination } from "../utils/helper";
interface TagPageProps {}

const TagPage: FC<TagPageProps> = ({}) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const { permissions } = useContext(PermissionContext);
  const [categories, setCategories] = useState<TagModel[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse>();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { search, setSearch } = useContext(SearchContext);
  const [modalCat, setModalCat] = useState(false);
  const [selected, setSelected] = useState<TagModel>();
  const timeout = useRef<number | null>(null);
  useEffect(() => {
    getAllCategories();
    setLoading(true);
    return () => {};
  }, [page, size]);

  const getAllCategories = (s: string = "") => {
    getTags({ page: search ? 1 : page, size, search: s })
      .then((resp: any) => {
        setCategories(resp.data.items);
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
        await updateTag(selected.id!, selected);
      } else {
        await createTag(selected!);
      }
      getAllCategories();
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
      permission="content:tag:read"
      permissionCreate="content:tag:create"
      breadcrumb={[
        { label: "Master Data", link: "" },
        { label: "Tag", link: "/tag" },
      ]}
      title="Tag"
      buttonTitle="+ Tag"
      modalTitle="Tag"
      onSearch={(val) => {
        setSearch(val);
        if (timeout.current) {
          window.clearTimeout(timeout.current);
        }
        timeout.current = window.setTimeout(() => {
          getAllCategories(val);
        }, 300);
      }}
      // onShowFilter={() => {
      //   alert("show filter");
      // }}
      page={page}
      size={size}
      pagination={pagination}
      setPage={setPage}
      setSize={setSize}
      tableHeader={["Tag"]}
      tableBody={categories.map((item) => [
        <div
          className="w-32 rounded-lg px-4 py-2 text-center"
          style={{ backgroundColor: item.color }}
        >
          <span
            style={{
              color: item.color_text,
            }}
          >
            {item.name}
          </span>
        </div>,
      ])}
      setShowModal={setModalCat}
      showModal={modalCat}
      onSaveModal={save}
      onAddClick={() => {
        setSelected({
          name: "",
          color: "#DEDEDE",
          color_text: "#000000",
        });
        setModalCat(true);
      }}
      tableData={categories}
      tableAction={(val) => {
        return (
          <>
            {permissions.includes("content:tag:update") && (
              <AiOutlineEdit
                className="icon-edit"
                onClick={() => {
                  setSelected(val);
                  setModalCat(true);
                }}
              />
            )}
            {permissions.includes("content:tag:delete") && (
              <BsTrash
                className="icon-delete"
                onClick={() => {
                  if (
                    window.confirm(
                      "Anda yakin ingin menghapus kategori " + val.name + "?",
                    )
                  ) {
                    deleteTag(val.id!)
                      .then(() => {
                        toast.success("Tag berhasil dihapus.");
                        getAllCategories();
                      })
                      .catch((error: any) => toast.error(`${error}`));
                  }
                }}
              />
            )}
          </>
        );
      }}
      modalContent={
        <>
          <div>
            <Label>Tag</Label>
            <TextInput
              className="input"
              type="text"
              value={selected?.name}
              onChange={(e) =>
                setSelected({ ...selected!, name: e.target.value })
              }
              placeholder="Input Tag"
            />
          </div>

          <div>
            <Label>Warna Teks</Label>
            <input
              className="h-10 w-10"
              type="color"
              value={selected?.color_text}
              onChange={(e) =>
                setSelected({ ...selected!, color_text: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Warna</Label>
            <input
              className="h-10 w-10"
              type="color"
              value={selected?.color}
              onChange={(e) =>
                setSelected({ ...selected!, color: e.target.value })
              }
            />
          </div>
        </>
      }
    />
  );
};
export default TagPage;
