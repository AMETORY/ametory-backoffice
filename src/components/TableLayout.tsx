import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  type ModalSizes,
} from "flowbite-react";
import type { DynamicStringEnumKeysOf } from "flowbite-react/types";
import { useContext, useRef, type FC, type ReactNode } from "react";
import { TbFilter } from "react-icons/tb";
import { PermissionContext } from "../contexts/ProfileContext";
import { SearchContext } from "../contexts/SearchContext";
import type { PaginationResponse } from "../objects/pagination";
import DashboardLayout from "./DashboardLayout";
import SearchInput from "./SearchInput";
interface TableLayoutProps {
  tableOnly?: boolean;
  title?: string;
  buttonTitle?: string;
  modalTitle?: string;
  onSearch: (search: string) => void;
  onAddClick?: () => void;
  pagination?: PaginationResponse;
  page: number;
  setPage: (page: number) => void;
  size: number;
  setSize: (size: number) => void;
  showModal?: boolean;
  setShowModal?: (show: boolean) => void;
  tableHeader: ReactNode[];
  tableHeaderSize?: number[];
  tableHeaderClass?: string[];
  tableBody: ReactNode[][];
  tableAction?: (val: any) => ReactNode;
  tableData?: any[];
  modalContent: ReactNode;
  onSaveModal?: () => void;
  breadcrumb?: { label: string; link: string }[];
  onShowFilter?: () => void;
  filter?: ReactNode;
  permission?: string;
  permissionCreate?: string;
  buttonWidth?: number;
  wrapperClassName?: string;
  modalSize?: DynamicStringEnumKeysOf<ModalSizes> | undefined;
  hideCreate?: boolean;
  modalBodyStyle?: React.CSSProperties;
  customButton?: ReactNode;
  headerTool?: ReactNode;
  headerButton?: ReactNode;
}

const TableLayout: FC<TableLayoutProps> = ({
  tableOnly,
  title,
  buttonTitle,
  modalTitle,
  onSearch,
  onAddClick,
  pagination,
  page,
  size,
  setPage,
  setSize,
  showModal,
  setShowModal,
  tableHeader,
  tableHeaderSize,
  tableHeaderClass,
  buttonWidth = 100,
  tableBody,
  tableData,
  tableAction,
  modalContent,
  onSaveModal,
  breadcrumb,
  onShowFilter,
  filter,
  permission,
  permissionCreate,
  wrapperClassName = "min-h-[calc(100vh-280px)]",
  modalSize,
  hideCreate,
  customButton,
  modalBodyStyle,
  headerTool,
  headerButton,
}) => {
  const { permissions } = useContext(PermissionContext);
  const { search, setSearch } = useContext(SearchContext);
  const timeout = useRef<number | null>(null);

  const TableView = () => (
    <div className="overflow-x-auto">
      <div className={wrapperClassName}>
        <Table className="table" striped>
          <TableHead>
            <TableRow>
              <TableHeadCell style={{ width: 20 }}>No</TableHeadCell>
              {tableHeader.map((header, index) => (
                <TableHeadCell
                  key={index}
                  className={tableHeaderClass?.[index]}
                  style={{ width: tableHeaderSize?.[index] }}
                >
                  {header}
                </TableHeadCell>
              ))}
              <TableHeadCell style={{ width: 60 }}></TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBody.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={tableHeader.length + 1}
                  className="text-center"
                >
                  Data Kosong
                </TableCell>
              </TableRow>
            )}
            {tableBody.map((body, index) => (
              <TableRow key={index}>
                <TableCell key={index} valign="top">
                  {(page - 1) * size + (index + 1)}
                </TableCell>
                {body.map((item, index) => (
                  <TableCell key={index} valign="top">
                    {item}
                  </TableCell>
                ))}
                <TableCell className="action" valign="top">
                  {tableData?.[index]
                    ? tableAction?.(tableData?.[index])
                    : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="h-10">
        {pagination?.total_pages && pagination.total_pages > 1 ? (
          <>
            <Pagination
              className="pagination"
              currentPage={page}
              totalPages={pagination?.total_pages ?? 0}
              onPageChange={setPage}
              previousLabel="<"
              nextLabel=">"
            />
          </>
        ) : null}
      </div>
      {pagination?.total && pagination.total > 0 ? (
        <small className="text-gray-600">
          Total Record: {pagination?.total ?? 0}
        </small>
      ) : null}
    </div>
  );

  if (tableOnly) {
    return <TableView />;
  }

  return (
    <DashboardLayout
      breadcrumb={breadcrumb}
      headerButton={headerButton}
      permission={permission}
    >
      <div className="flex justify-between">
        <div className="title-page flex w-full items-center justify-between">
          <h3 className="">{title}</h3>
          <div className="flex items-center gap-2">
            <SearchInput
              search={search}
              setSearch={setSearch}
              onSearch={onSearch}
            />

            {!hideCreate && (
              <Button
                style={{ width: buttonWidth }}
                color={"primary"}
                className="w-32"
                onClick={onAddClick}
              >
                {buttonTitle ?? title}
              </Button>
            )}
            {customButton}
            {onShowFilter && (
              <Button
                className="w-12 border border-gray-200 bg-white p-4 hover:bg-gray-200"
                onClick={onShowFilter}
              >
                <TbFilter className="w-8 text-gray-800" />
              </Button>
            )}
            {filter}
          </div>
        </div>
      </div>
      <TableView />
      <Modal
        size={modalSize}
        className="modal"
        dismissible
        show={showModal}
        onClose={() => setShowModal?.(false)}
      >
        <ModalHeader className="modal-header">
          <div className="flex w-full flex-row items-center justify-between">
            {modalTitle ?? title}
            {headerTool}
          </div>
        </ModalHeader>
        <ModalBody className="modal-body" style={modalBodyStyle}>
          {modalContent}
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button color={"cancel"} onClick={() => setShowModal?.(false)}>
            Batal
          </Button>
          <Button color={"primary"} onClick={onSaveModal}>
            Simpan
          </Button>
        </ModalFooter>
      </Modal>
    </DashboardLayout>
  );
};
export default TableLayout;
