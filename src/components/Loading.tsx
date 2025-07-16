import type { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(255,255,255,0.8)]">
      <img src="/loading.gif" alt="" className="w-32 opacity-50" />
    </div>
  );
};
export default Loading;
