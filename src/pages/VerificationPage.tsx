import { useEffect, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router";
import { verifyEmail } from "../services/api/authApi";

interface VerificationPageProps {}

const VerificationPage: FC<VerificationPageProps> = ({}) => {
  const { token } = useParams();
  const [error, setError] = useState("");
  const [succeed, setSucceed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {};
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (token) {
      const verifyToken = async () => {
        try {
          await verifyEmail(token);
          setSucceed(true);
        } catch (error) {
          setError(`${error}`);
          // alert(error);
        }
      };
      verifyToken();
    }
  }, [mounted, token]);
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f8fa] px-4 text-center">
      <img src="/icon-512.png" alt="" className="w-32" />
      <h2 className="mb-2 text-2xl font-semibold text-slate-700">
        Verifikasi Akun
      </h2>
      <div className="p-8">
        {error && <p className="mb-6 text-red-500">{error}</p>}
        {succeed && (
          <p className="mb-6 text-slate-500">
            Anda telah berhasil mengaktifkan akun.
          </p>
        )}
      </div>
      <button
        onClick={() => navigate("/login")}
        className="rounded-full bg-slate-600 px-6 py-3 text-white shadow-lg transition hover:bg-slate-700"
      >
        Back to Login
      </button>
      <footer className="absolute bottom-4 text-sm text-slate-400">
        © {import.meta.env.VITE_APP_TITLE}. All rights reserved.
      </footer>
    </div>
  );
};
export default VerificationPage;
