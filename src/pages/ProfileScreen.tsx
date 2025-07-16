import {
  Button,
  FileInput,
  TabItem,
  Tabs,
  TabsRef,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useContext, useRef, useState, type FC } from "react";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";
import { GoLock } from "react-icons/go";
import DashboardLayout from "../components/DashboardLayout";
import { LoadingContext } from "../contexts/LoadingContext";
import { ProfileContext } from "../contexts/ProfileContext";
import type { FileModel } from "../models/file";
import { changePassword, updateProfile } from "../services/api/authApi";
import { uploadFile } from "../services/api/commonApi";
import { useProfile } from "../contexts/ProfileProvider";
interface ProfileScreenProps {}

const ProfileScreen: FC<ProfileScreenProps> = ({}) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<FileModel>();
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { profile, setProfile } = useProfile();
  const renderInfo = () => (
    <div className="flex h-[calc(100vh-220px)] flex-col gap-4 overflow-y-auto">
      <h3 className="mt-0 font-bold">Edit Profile</h3>
      <div className="rounded-lg bg-white p-4">
        <div className="flex flex-col gap-2 space-y-4">
          {profile?.profile_picture && (
            <div className="flex items-center justify-center py-4">
              <img
                className="aspect-square h-64 w-64 rounded-full object-cover"
                src={profile?.profile_picture?.url}
                alt="profile"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Profile Picture</label>
            <FileInput
              accept="image/*"
              id="file-upload"
              onChange={(el) => {
                if (el.target.files) {
                  let f = el.target.files[0];
                  if (!f) return;
                  uploadFile(f, {}, (val) => {
                    console.log(val);
                  }).then((v: any) => {
                    setFile(v.data);
                    setProfile({
                      ...profile!,
                      profile_picture: v.data,
                    });
                  });
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name</label>
            <TextInput
              type="text"
              value={profile?.full_name}
              onChange={(e) =>
                setProfile({ ...profile!, full_name: e.target.value })
              }
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Address</label>
            <Textarea
              value={profile?.address}
              onChange={(e) =>
                setProfile({ ...profile!, address: e.target.value })
              }
              placeholder="Enter your address"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <TextInput
              readOnly
              type="email"
              value={profile?.email}
              onChange={(e) =>
                setProfile({ ...profile!, email: e.target.value })
              }
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Button
              type="submit"
              className="mt-8 w-32"
              onClick={async () => {
                try {
                  setLoading(true);
                  await updateProfile(profile!);
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
      </div>
    </div>
  );
  const renderSecurity = () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Old Password</label>
        <TextInput
          type="password"
          name="old_password"
          placeholder="Input your old password"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">New Password</label>
        <TextInput
          type="password"
          name="new_password"
          placeholder="Input your new password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Confirm Password</label>
        <TextInput
          type="password"
          name="confirm_password"
          placeholder="Input your confirm password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <Button
          className="mt-8"
          onClick={async () => {
            try {
              setLoading(true);

              if (newPassword !== confirmPassword) {
                toast.error("Password and confirm password does not match");
                return;
              }
              await changePassword({
                old_password: oldPassword,
                new_password: newPassword,
              });
              toast.success("Password changed successfully");
            } catch (error) {
              toast.error(`${error}`);
            } finally {
              setLoading(false);
            }
          }}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
  return (
    <DashboardLayout>
      <div className="flex h-full w-full flex-col gap-4 px-4">
        <Tabs
          aria-label="Tabs with underline"
          variant="underline"
          ref={tabsRef}
          onActiveTabChange={(tab) => {
            setActiveTab(tab);
            // console.log(tab);
          }}
          className="tabs"
        >
          <TabItem
            active={activeTab === 0}
            title="Info Dasar"
            icon={BsInfoCircle}
          >
            {renderInfo()}
          </TabItem>
          <TabItem active={activeTab === 1} title="Keamanan" icon={GoLock}>
            {renderSecurity()}
          </TabItem>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};
export default ProfileScreen;
