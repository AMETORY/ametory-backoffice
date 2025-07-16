import { createContext } from "react";

export const CollapsedContext = createContext<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}>({
  collapsed: false,
  setCollapsed: () => {},
});
