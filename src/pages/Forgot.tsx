import { Button, TextInput } from "flowbite-react";
import { useState, type FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { processForgot } from "../services/api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface ForgotProps {}

const Forgot: FC<ForgotProps> = ({}) => {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");

  const sendForgot = async () => {
    try {
      const resp: any = await processForgot({ email });
      toast.success(resp.message);
      setTimeout(() => {
        nav("/login");
      }, 500);
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* Left side (branding) */}
      <div className="relative flex w-1/2 items-center justify-center bg-gradient-to-tl from-[#72CAEE] to-[#0D92F4] text-white">
        <div className="text-center">
          <div className="mb-4 text-4xl font-bold">
            <img src="/icon-512.png" alt="" />
          </div>
        </div>
        <div
          className="absolute rotate-[30deg]"
          style={{
            bottom: -80,
            left: -100,
            opacity: 0.3,
          }}
        >
          <img src="/icon-512.png" className="w-[300px] text-white" alt="" />
        </div>
      </div>

      {/* Right side (form) */}
      <div className="flex w-1/2 items-center justify-center">
        <div className="w-full max-w-md px-8">
          <div className="mb-6 text-2xl font-semibold">Masukan Email anda</div>
          <form>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <TextInput
                type="email"
                placeholder="Your Email"
                className=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              color={"primary"}
              onClick={() => {
                sendForgot();
              }}
            >
              Kirim
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Forgot;
