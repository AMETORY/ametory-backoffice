import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState, type FC } from "react";
import SearchInput from "./SearchInput";
import { getUser, getUsers } from "../services/api/userApi";
import type { UserModel } from "../models/user";
import Avatar from "./Avatar";

interface ModalUserProps {
  show: boolean;
  onClose: () => void;
  onInvite: () => void;
  onSelect: (user: UserModel) => void;
}

const ModalUser: FC<ModalUserProps> = ({
  show,
  onClose,
  onSelect,
  onInvite,
}) => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [search, setSearch] = useState("");
  return (
    <Modal className="modal" show={show} onClose={onClose}>
      <ModalHeader className="modal-header">Search User</ModalHeader>
      <ModalBody className="modal-body">
        <SearchInput
          search={search}
          setSearch={setSearch}
          onSearch={(val) => {
            getUsers({ page: 1, size: 10, search: val }).then((resp: any) => {
              setUsers(resp.data.items);
            });
          }}
        />
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="flex cursor-pointer flex-row gap-2 rounded-lg p-4 hover:bg-gray-100"
              onClick={() => onSelect(user)}
            >
              <Avatar user={user} />
              <div>
                <div className="flex-1">{user.full_name}</div>
                <small>{user.email}</small>
              </div>
            </li>
          ))}
        </ul>
      </ModalBody>
      <ModalFooter className="modal-footer">
        <Button color={"primary"} className="!w-32" onClick={onInvite}>
          Invite User
        </Button>
        <Button color={"gray"} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ModalUser;
