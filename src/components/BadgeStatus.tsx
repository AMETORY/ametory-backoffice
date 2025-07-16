import type { FC } from "react";

interface BadgeStatusProps {
  status?: string;
}
const BadgeStatus: FC<BadgeStatusProps> = ({ status }) => {
  let className =
    "inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs leading-none font-bold ";

  switch (status) {
    case "DONE":
      className += "bg-green-100 text-green-700";
      break;
    case "SUBMITTED":
    case "PENDING":
      className += "bg-red-100 text-red-700";
      break;
    case "REVIEWED":
      className += "bg-red-100 text-red-700";
      break;
    case "REQUESTED":
      className += "bg-red-100 text-red-700";
      break;
    case "ACTIVE":
      className += "bg-blue-100 text-blue-700";
      break;
    case "APPROVED":
      className += "bg-green-100 text-green-700";
      break;
    default:
      className += "bg-gray-100 text-gray-700";
  }

  return <span className={className}>{status}</span>;
};

export default BadgeStatus;
