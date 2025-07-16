import type { FC } from "react";
import type { UserModel } from "../models/user";

interface AvatarProps {
  user?: UserModel | null;
  size?: number;
  fontSize?: number;
  onClick?: () => void;
  roundedClass?: string;
}

const Avatar: FC<AvatarProps> = ({
  user,
  size,
  fontSize,
  onClick,
  roundedClass = "rounded-full",
}) => {
  return (
    <div
      className={`flex aspect-square h-8 w-8 cursor-pointer items-center justify-center overflow-hidden ${roundedClass} bg-gray-200`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {user?.profile_picture ? (
        <img
          className="h-full w-full object-cover"
          src={user.profile_picture?.url}
          alt={user.full_name}
        />
      ) : (
        <span
          className="text-sm font-semibold text-gray-800"
          style={{
            fontSize: fontSize,
          }}
        >
          {user?.full_name
            ?.split(" ")
            .slice(0, 2)
            .map((name) => name[0].toUpperCase())
            .join("")}
        </span>
      )}
    </div>
  );
};
export default Avatar;
