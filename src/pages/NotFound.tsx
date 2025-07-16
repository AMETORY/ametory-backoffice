import type { FC } from "react";
import { useNavigate } from "react-router";

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f8fa] px-4 text-center">
      <img src="/icon-512.png" alt="" className="w-32" />
      <h1 className="mb-4 text-[100px] font-bold text-slate-700">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-slate-700">
        Page Not Found.
      </h2>
      <p className="mb-6 text-slate-500">
        Sorry, we can’t find the page you’re looking for.
      </p>
      <button
        onClick={() => navigate("/")}
        className="rounded-full bg-slate-600 px-6 py-3 text-white shadow-lg transition hover:bg-slate-700"
      >
        Back to Home
      </button>
      <footer className="absolute bottom-4 text-sm text-slate-400">
        © {import.meta.env.VITE_APP_TITLE}. All rights reserved.
      </footer>
    </div>
  );
};
export default NotFound;
