import type { FC, ReactNode } from "react";
import { GoChecklist } from "react-icons/go";
import { LuMap, LuTimerOff, LuTimerReset } from "react-icons/lu";
import { MdMoreTime } from "react-icons/md";
import { TbActivity } from "react-icons/tb";

interface BadgeActivityProps {
  type?: string;
}

const BadgeActivity: FC<BadgeActivityProps> = ({ type }) => {
  let className =
    "inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs leading-none font-bold gap-1 ";

  let icon: ReactNode;

  switch (type) {
    case "VISIT":
      className += "bg-green-100 text-green-700";
      icon = <LuMap />;
      break;
    case "TASK":
      className += "bg-purple-100 text-purple-700";
      icon = <GoChecklist />;
      break;
    case "OVERTIME":
      className += "bg-blue-100 text-blue-700";
      icon = <MdMoreTime />;
      break;
    case "BREAK_START":
      className += "bg-green-100 text-green-700";
      icon = <LuTimerOff />;
      break;
    case "BREAK_END":
      className += "bg-lime-100 text-lime-700";
      icon = <LuTimerReset />;
      break;
    default:
      className += "bg-gray-100 text-gray-700";
      icon = <TbActivity />;
  }

  return (
    <span className={className}>
      {icon}
      {type}
    </span>
  );
};
export default BadgeActivity;
